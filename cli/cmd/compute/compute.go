package compute

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"os/signal"
	"os/user"
	"path/filepath"
	"strconv"
	"syscall"
	"time"

	"github.com/spf13/cobra"
	"golang.org/x/crypto/ssh/terminal"
	libvirt "libvirt.org/go/libvirt"
)

// vmStateFile is the path to the JSON state file
const vmStateFile = "compute_vm.json"

// Instance holds information about a VM
type Instance struct {
	ID          string `json:"id"`           // UUID from libvirt
	Name        string `json:"name"`         // Human-readable VM name
	CPU         int    `json:"cpu"`          // Number of vCPUs
	RAM         int    `json:"ram"`          // RAM in MB
	Storage     int    `json:"storage"`      // Storage size in GB
	BaseImage   string `json:"base_image"`   // Path to the base disk image
	Status      string `json:"status"`       // "running", "stopped", etc.
	CreatedAt   string `json:"created_at"`   // Creation timestamp in UTC
	CreatedBy   string `json:"created_by"`   // User who created the VM
	LastUpdated string `json:"last_updated"` // Last update timestamp in UTC
}

// instances holds all tracked VMs in memory
var instances = make(map[string]Instance)

// Flags for command-line inputs
var (
	name      string
	cpu       int
	ram       int
	storage   int
	baseImage string
)

// ComputeCmd is the root Cobra command for managing VMs
var ComputeCmd = &cobra.Command{
	Use:   "compute",
	Short: "Manage virtual machines (KVM/libvirt)",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

func init() {
	loadInstances()

	ComputeCmd.AddCommand(createCmd)
	ComputeCmd.AddCommand(listCmd)
	ComputeCmd.AddCommand(startCmd)
	ComputeCmd.AddCommand(enterCmd)
	ComputeCmd.AddCommand(stopCmd)
	ComputeCmd.AddCommand(deleteCmd)
}

func saveInstances() {
	data, err := json.MarshalIndent(instances, "", "  ")
	if err != nil {
		log.Printf("Error saving instances: %v\n", err)
		return
	}
	err = ioutil.WriteFile(vmStateFile, data, 0644)
	if err != nil {
		log.Printf("Error writing to state file: %v\n", err)
	}
}

func loadInstances() {
	if _, err := os.Stat(vmStateFile); os.IsNotExist(err) {
		return
	}
	data, err := ioutil.ReadFile(vmStateFile)
	if err != nil {
		log.Printf("Error reading state file: %v\n", err)
		return
	}
	err = json.Unmarshal(data, &instances)
	if err != nil {
		log.Printf("Error parsing state file: %v\n", err)
	}
}

var createCmd = &cobra.Command{
	Use:   "create",
	Short: "Create a new VM using libvirt",
	Run: func(cmd *cobra.Command, args []string) {
		// Get current working directory and user info
		currentDir, err := os.Getwd()
		if err != nil {
			log.Fatalf("Failed to get current directory: %v", err)
		}

		// Get libvirt user and group IDs
		libvirtUID, libvirtGID := getLibvirtIDs()

		// Check if base image exists in current directory
		sourceImagePath := filepath.Join(currentDir, baseImage)
		if _, err := os.Stat(sourceImagePath); os.IsNotExist(err) {
			log.Fatalf("Base image not found: %s", sourceImagePath)
		}

		// Connect to libvirt
		conn, err := libvirt.NewConnect("qemu:///system")
		if err != nil {
			log.Fatalf("Failed to connect to libvirt: %v\n", err)
		}
		defer conn.Close()

		// Create VM images directory if it doesn't exist
		vmImagesDir := "/var/lib/libvirt/images"
		// Ensure directory exists and has correct permissions
		if err := os.MkdirAll(vmImagesDir, 0755); err != nil {
			log.Fatalf("Failed to create VM images directory: %v", err)
		}

		// Create a copy of the base image for this VM
		vmImageName := fmt.Sprintf("%s.qcow2", name)
		vmImagePath := filepath.Join(vmImagesDir, vmImageName)

		// Copy base image to VM specific image
		cmdc := exec.Command("sudo", "cp", sourceImagePath, vmImagePath)
		if err := cmdc.Run(); err != nil {
			log.Fatalf("Failed to copy image: %v", err)
		}

		// Set correct ownership and permissions
		cmdc = exec.Command("sudo", "chown", fmt.Sprintf("%d:%d", libvirtUID, libvirtGID), vmImagePath)
		if err := cmdc.Run(); err != nil {
			log.Fatalf("Failed to set image ownership: %v", err)
		}

		cmdc = exec.Command("sudo", "chmod", "644", vmImagePath)
		if err := cmdc.Run(); err != nil {
			log.Fatalf("Failed to set image permissions: %v", err)
		}

		vmXML := fmt.Sprintf(`
<domain type='kvm'>
  <name>%s</name>
  <memory unit='MiB'>%d</memory>
  <vcpu>%d</vcpu>
  <os>
    <type arch='x86_64'>hvm</type>
  </os>
  <devices>
    <emulator>/usr/bin/qemu-kvm</emulator>
    <disk type='file' device='disk'>
      <driver name='qemu' type='qcow2'/>
      <source file='%s'/>
      <target dev='vda' bus='virtio'/>
    </disk>
    <interface type='network'>
      <source network='default'/>
      <model type='virtio'/>
    </interface>
    <console type='pty'>
      <target type='serial' port='0'/>
    </console>
    <graphics type='vnc' port='-1' listen='127.0.0.1'/>
  </devices>
</domain>
`, name, ram, cpu, vmImagePath)

		domain, err := conn.DomainDefineXML(vmXML)
		if err != nil {
			log.Fatalf("Error defining VM domain: %v\n", err)
		}
		defer domain.Free()

		err = domain.Create()
		if err != nil {
			log.Fatalf("Error starting VM domain: %v\n", err)
		}

		uuid, err := domain.GetUUIDString()
		if err != nil {
			log.Fatalf("Error getting VM UUID: %v\n", err)
		}

		now := time.Now().UTC().Format("2006-01-02 15:04:05")
		instance := Instance{
			ID:          uuid,
			Name:        name,
			CPU:         cpu,
			RAM:         ram,
			Storage:     storage,
			BaseImage:   vmImagePath,
			Status:      "running",
			CreatedAt:   now,
			CreatedBy:   os.Getenv("USER"),
			LastUpdated: now,
		}
		instances[uuid] = instance
		saveInstances()

		fmt.Printf("VM created and started:\n")
		fmt.Printf("Name: %s\nUUID: %s\nStatus: running\n", instance.Name, instance.ID)
	},
}

// Add this helper function to get libvirt user and group IDs
func getLibvirtIDs() (uid, gid int) {
	// Default values for libvirt-qemu user and group
	uid = 64055 // libvirt-qemu user
	gid = 107   // kvm group

	if u, err := user.Lookup("libvirt-qemu"); err == nil {
		if id, err := strconv.Atoi(u.Uid); err == nil {
			uid = id
		}
		if id, err := strconv.Atoi(u.Gid); err == nil {
			gid = id
		}
	}
	return uid, gid
}
func init() {
	createCmd.Flags().StringVarP(&name, "name", "n", "", "Name of the VM (required)")
	createCmd.Flags().IntVarP(&cpu, "cpu", "c", 1, "Number of virtual CPU cores")
	createCmd.Flags().IntVarP(&ram, "ram", "r", 256, "Amount of RAM in MB")
	createCmd.Flags().IntVarP(&storage, "storage", "s", 1, "Storage size in GB")
	createCmd.Flags().StringVarP(&baseImage, "image", "i", "cirros-0.6.1-x86_64-disk.img", "Path to QCOW2 image")
	_ = createCmd.MarkFlagRequired("name")
}

var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List all tracked VMs",
	Run: func(cmd *cobra.Command, args []string) {
		if len(instances) == 0 {
			fmt.Println("No VMs found.")
			return
		}

		conn, err := libvirt.NewConnect("qemu:///system")
		if err != nil {
			log.Printf("Unable to connect to libvirt for status checks: %v\n", err)
			for _, inst := range instances {
				fmt.Printf("ID: %s | Name: %s | CPU: %d | RAM: %dMB | Status: %s | Image: %s | Created: %s | By: %s\n",
					inst.ID, inst.Name, inst.CPU, inst.RAM, inst.Status, inst.BaseImage, inst.CreatedAt, inst.CreatedBy)
			}
			return
		}
		defer conn.Close()

		for _, inst := range instances {
			status := inst.Status
			domain, err := conn.LookupDomainByUUIDString(inst.ID)
			if err == nil {
				active, _ := domain.IsActive()
				if active {
					status = "running"
				} else {
					status = "stopped"
				}
				domain.Free()
			}
			fmt.Printf("ID: %s | Name: %s | CPU: %d | RAM: %dMB | Status: %s | Image: %s | Created: %s | By: %s\n",
				inst.ID, inst.Name, inst.CPU, inst.RAM, status, inst.BaseImage, inst.CreatedAt, inst.CreatedBy)
		}
	},
}

var startCmd = &cobra.Command{
	Use:   "start [VM UUID]",
	Short: "Start a stopped VM",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		vmUUID := args[0]
		instance, ok := instances[vmUUID]
		if !ok {
			fmt.Printf("Instance with UUID %s not found.\n", vmUUID)
			return
		}

		conn, err := libvirt.NewConnect("qemu:///system")
		if err != nil {
			log.Fatalf("Error connecting to libvirt: %v\n", err)
		}
		defer conn.Close()

		domain, err := conn.LookupDomainByUUIDString(vmUUID)
		if err != nil {
			log.Fatalf("Error looking up domain: %v\n", err)
		}
		defer domain.Free()

		active, err := domain.IsActive()
		if err != nil {
			log.Fatalf("Error checking domain status: %v\n", err)
		}
		if active {
			fmt.Printf("VM %s is already running.\n", instance.Name)
			return
		}

		err = domain.Create()
		if err != nil {
			log.Fatalf("Failed to start domain: %v\n", err)
		}

		instance.Status = "running"
		instance.LastUpdated = "2025-01-27 18:23:40"
		instances[vmUUID] = instance
		saveInstances()
		fmt.Printf("VM %s has been started.\n", instance.Name)
	},
}

var enterCmd = &cobra.Command{
	Use:   "enter [VM UUID]",
	Short: "Enter a running VM's console",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		vmUUID := args[0]
		instance, ok := instances[vmUUID]
		if !ok {
			fmt.Printf("VM with UUID %s not found.\n", vmUUID)
			return
		}

		conn, err := libvirt.NewConnect("qemu:///system")
		if err != nil {
			log.Fatalf("Error connecting to libvirt: %v\n", err)
		}
		defer conn.Close()

		domain, err := conn.LookupDomainByUUIDString(vmUUID)
		if err != nil {
			log.Fatalf("Error verifying domain: %v\n", err)
		}
		defer domain.Free()

		active, err := domain.IsActive()
		if err != nil {
			log.Fatalf("Failed to check domain state: %v\n", err)
		}
		if !active {
			fmt.Printf("VM %s is not running. Start it first with 'compute start'.\n", instance.Name)
			return
		}

		fmt.Printf("Connecting to VM %s console... (Press Ctrl+] to exit)\n", instance.Name)
		fmt.Println("Note: If console access fails, use 'virsh console " + instance.Name + "'")

		oldState, err := terminal.MakeRaw(int(os.Stdin.Fd()))
		if err != nil {
			log.Printf("Error making terminal raw: %v\n", err)
			return
		}
		defer terminal.Restore(int(os.Stdin.Fd()), oldState)

		sigChan := make(chan os.Signal, 1)
		signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
		go func() {
			<-sigChan
			terminal.Restore(int(os.Stdin.Fd()), oldState)
			os.Exit(0)
		}()

		stream, err := conn.NewStream(0)
		if err != nil {
			log.Fatalf("Failed to create stream: %v\n", err)
		}
		defer stream.Free()

		err = domain.OpenConsole("", stream, 0)
		if err != nil {
			fmt.Printf("Failed to open console: %v\n", err)
			fmt.Printf("Try using: virsh console %s\n", instance.Name)
			return
		}

		go func() {
			buf := make([]byte, 4096)
			for {
				n, err := stream.Recv(buf)
				if err != nil {
					if err == io.EOF {
						break
					}
					log.Printf("Error receiving from stream: %v\n", err)
					break
				}
				if n > 0 {
					os.Stdout.Write(buf[:n])
				}
			}
		}()

		writer := &streamWriter{stream: stream}
		_, err = io.Copy(writer, os.Stdin)
		if err != nil {
			log.Printf("Error copying stdin to stream: %v\n", err)
		}
	},
}

type streamWriter struct {
	stream *libvirt.Stream
}

func (w *streamWriter) Write(p []byte) (int, error) {
	_, err := w.stream.Send(p)
	if err != nil {
		return 0, err
	}
	return len(p), nil
}

var stopCmd = &cobra.Command{
	Use:   "stop [VM UUID]",
	Short: "Stop a running VM",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		vmUUID := args[0]
		instance, ok := instances[vmUUID]
		if !ok {
			fmt.Printf("Instance with UUID %s not found.\n", vmUUID)
			return
		}

		conn, err := libvirt.NewConnect("qemu:///system")
		if err != nil {
			log.Fatalf("Failed to connect to libvirt: %v\n", err)
		}
		defer conn.Close()

		domain, err := conn.LookupDomainByUUIDString(vmUUID)
		if err != nil {
			log.Fatalf("Domain not found: %v\n", err)
		}
		defer domain.Free()

		active, err := domain.IsActive()
		if err != nil {
			log.Fatalf("Error checking domain status: %v\n", err)
		}
		if !active {
			fmt.Printf("VM %s is already stopped.\n", instance.Name)
			return
		}

		err = domain.Destroy()
		if err != nil {
			log.Fatalf("Failed to stop VM domain: %v\n", err)
		}

		instance.Status = "stopped"
		instance.LastUpdated = "2025-01-27 18:23:40"
		instances[vmUUID] = instance
		saveInstances()
		fmt.Printf("VM %s has been stopped.\n", instance.Name)
	},
}

var deleteCmd = &cobra.Command{
	Use:   "delete [VM UUID]",
	Short: "Delete a VM",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		vmUUID := args[0]
		instance, ok := instances[vmUUID]
		if !ok {
			fmt.Printf("Instance with UUID %s not found.\n", vmUUID)
			return
		}

		conn, err := libvirt.NewConnect("qemu:///system")
		if err != nil {
			log.Fatalf("Failed to connect to libvirt: %v\n", err)
		}
		defer conn.Close()

		domain, err := conn.LookupDomainByUUIDString(vmUUID)
		if err != nil {
			log.Printf("Warning: domain not found in libvirt: %v\n", err)
		} else {
			defer domain.Free()

			active, _ := domain.IsActive()
			if active {
				if err := domain.Destroy(); err != nil {
					log.Fatalf("Failed to stop domain: %v\n", err)
				}
			}

			err = domain.Undefine()
			if err != nil {
				log.Fatalf("Failed to undefine domain: %v\n", err)
			}
		}

		// Clean up the image file
		if instance.BaseImage != "" {
			cmd := exec.Command("sudo", "rm", "-f", instance.BaseImage)
			if err := cmd.Run(); err != nil {
				log.Printf("Warning: failed to remove image file: %v\n", err)
			}
		}

		delete(instances, vmUUID)
		saveInstances()
		fmt.Printf("VM %s [%s] has been deleted.\n", instance.Name, vmUUID)
	},
}
