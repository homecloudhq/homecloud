package compute

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	docker "github.com/fsouza/go-dockerclient"
	"github.com/spf13/cobra"
	
)

const stateFile = "compute.json"

func init() {
	// Load saved instances
	loadInstances()

	// Add subcommands to the compute command
	ComputeCmd.AddCommand(createCmd)
	ComputeCmd.AddCommand(listCmd)
	ComputeCmd.AddCommand(startCmd)
	ComputeCmd.AddCommand(enterCmd)
	ComputeCmd.AddCommand(stopCmd)
	ComputeCmd.AddCommand(deleteCmd)
}
// Instance represents a compute instance with its configuration and status
type Instance struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CPU       int    `json:"cpu"`
	RAM       int    `json:"ram"`
	Storage   int    `json:"storage"`
	BaseImage string `json:"base_image"`
	Status    string `json:"status"`
}

// Global map to store instances
var instances = make(map[string]Instance)

// Command-line flags
var (
	name      string
	cpu       int
	ram       int
	storage   int
	baseImage string = "python:3.10-alpine"
)

// Root command for compute operations
var ComputeCmd = &cobra.Command{
    Use:   "compute",
    Short: "Manage compute resources",
    Long:  "The compute command allows you to manage compute resources like VMs, containers, etc.",
    Run: func(cmd *cobra.Command, args []string) {
        cmd.Help()
    },
}


// saveInstances saves the current state of instances to a JSON file
func saveInstances() {
	data, err := json.MarshalIndent(instances, "", "  ")
	if err != nil {
		log.Printf("Error saving instances: %v\n", err)
		return
	}
	err = ioutil.WriteFile(stateFile, data, 0644)
	if err != nil {
		log.Printf("Error writing to state file: %v\n", err)
	}
}

// loadInstances loads the state of instances from a JSON file
func loadInstances() {
	if _, err := os.Stat(stateFile); os.IsNotExist(err) {
		return
	}
	data, err := ioutil.ReadFile(stateFile)
	if err != nil {
		log.Printf("Error reading state file: %v\n", err)
		return
	}
	err = json.Unmarshal(data, &instances)
	if err != nil {
		log.Printf("Error parsing state file: %v\n", err)
	}
}

// createCmd creates a new Docker container and registers it as an instance
var createCmd = &cobra.Command{
	Use:   "create",
	Short: "Create a new compute instance (Docker container)",
	Run: func(cmd *cobra.Command, args []string) {
		client, err := docker.NewClientFromEnv()
		if err != nil {
			log.Fatalf("Error creating Docker client: %v\n", err)
		}

		// Pull the base image if not available locally
		if _, err := client.InspectImage(baseImage); err != nil {
			fmt.Println("Image not found locally, pulling from Docker Hub...")
			err = client.PullImage(docker.PullImageOptions{
				Repository: baseImage,
			}, docker.AuthConfiguration{})
			if err != nil {
				log.Fatalf("Error pulling image %s: %v\n", baseImage, err)
			}
			fmt.Printf("Successfully pulled image %s\n", baseImage)
		}

		// Adjust CPU shares to Docker-compatible value (1024 is default, higher is more CPU weight)
		cpuShares := cpu * 1024 // Multiply logical CPUs to match Docker's CPU weight

		// Convert RAM from MB to bytes
		memoryBytes := int64(ram) * 1024 * 1024

		// Create and start the Docker container with resource limits
		container, err := client.CreateContainer(docker.CreateContainerOptions{
			Name: name,
			Config: &docker.Config{
				Image: baseImage,
				Cmd:   []string{"sh", "-c", "while true; do sleep 30; done"},
			},
			HostConfig: &docker.HostConfig{
				CPUShares: int64(cpuShares), // Set CPU shares
				Memory:    memoryBytes,      // Set RAM limit
			},
		})
		if err != nil {
			log.Fatalf("Error creating Docker container: %v\n", err)
		}
		fmt.Println("Docker container created:", container.Name)

		// Start the container
		err = client.StartContainer(container.ID, nil)
		if err != nil {
			log.Fatalf("Error starting Docker container: %v\n", err)
		}
		fmt.Println("Docker container started in detached mode:", container.Name)

		// Register the instance
		id := container.ID
		instance := Instance{
			ID:        id,
			Name:      name,
			CPU:       cpu,
			RAM:       ram,
			Storage:   storage,
			BaseImage: baseImage,
			Status:    "running",
		}
		instances[id] = instance
		saveInstances()
		fmt.Printf("Instance created: %+v\n", instance)
	},
}

func init() {
	// Define flags for the create command
	createCmd.Flags().StringVarP(&name, "name", "n", "", "Name of the container/instance (required)")
	createCmd.Flags().IntVarP(&cpu, "cpu", "c", 1, "Number of CPU cores")
	createCmd.Flags().IntVarP(&ram, "ram", "r", 512, "Amount of RAM in MB")
	createCmd.Flags().IntVarP(&storage, "storage", "s", 10, "Storage size in GB")
	createCmd.Flags().StringVarP(&baseImage, "image", "i", "python:3.10-alpine", "Base image for the container/instance")
	createCmd.MarkFlagRequired("name")
}

// listCmd lists all Docker containers and registered instances
var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List all compute instances (Docker containers)",
	Run: func(cmd *cobra.Command, args []string) {
		client, err := docker.NewClientFromEnv()
		if err != nil {
			log.Fatal(err)
		}
		containers, err := client.ListContainers(docker.ListContainersOptions{All: true})
		if err != nil {
			log.Fatal(err)
		}
		for _, c := range containers {
			fmt.Printf("Docker Container ID: %s Image: %s Names: %v Status: %s\n", c.ID, c.Image, c.Names, c.Status)
		}

		if len(instances) == 0 {
			fmt.Println("No instances found.")
			return
		}
		for _, instance := range instances {
			fmt.Printf("Instance ID: %s, Name: %s, CPU: %d, RAM: %dMB, Storage: %dGB, Status: %s\n",
				instance.ID, instance.Name, instance.CPU, instance.RAM, instance.Storage, instance.Status)
		}
	},
}

// startCmd starts a stopped Docker container and updates its status
var startCmd = &cobra.Command{
	Use:   "start [container/instance ID]",
	Short: "Start a compute instance (Docker container)",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		client, err := docker.NewClientFromEnv()
		if err != nil {
			log.Fatal(err)
		}
		err = client.StartContainer(args[0], nil)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Docker container started:", args[0])

		id := args[0]
		instance, exists := instances[id]
		if !exists {
			fmt.Printf("Instance with ID %s not found.\n", id)
			return
		}
		if instance.Status == "running" {
			fmt.Printf("Instance %s is already running.\n", id)
			return
		}
		instance.Status = "running"
		instances[id] = instance
		saveInstances()
		fmt.Printf("Instance %s started.\n", id)
	},
}

// enterCmd allows entering a Docker container interactively
var enterCmd = &cobra.Command{
	Use:   "enter [container/instance ID]",
	Short: "Enter a compute instance (Docker container) interactively",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		containerID := args[0]

		// Check if the container exists
		client, err := docker.NewClientFromEnv()
		if err != nil {
			log.Fatal(err)
		}
		container, err := client.InspectContainer(containerID)
		if err != nil {
			log.Fatalf("Error inspecting container: %v\n", err)
		}

		// Check if the container is running
		if !container.State.Running {
			log.Fatalf("Container %s is not running. Start it first using 'start' command.\n", containerID)
		}

		// Run a shell session inside the container
		execOptions := docker.CreateExecOptions{
			Container:    containerID,
			Cmd:          []string{"sh"},
			AttachStdin:  true,
			AttachStdout: true,
			AttachStderr: true,
			Tty:          true,
		}
		exec, err := client.CreateExec(execOptions)
		if err != nil {
			log.Fatalf("Error creating exec instance: %v\n", err)
		}

		// Attach to the exec session
		err = client.StartExec(exec.ID, docker.StartExecOptions{
			Tty:          true,
			Detach:       false,
			InputStream:  os.Stdin,
			OutputStream: os.Stdout,
			ErrorStream:  os.Stderr,
			RawTerminal:  true,
		})
		if err != nil {
			log.Fatalf("Error starting exec session: %v\n", err)
		}
	},
}

// stopCmd stops a running Docker container and updates its status
var stopCmd = &cobra.Command{
	Use:   "stop [container/instance ID]",
	Short: "Stop a compute instance (Docker container)",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		client, err := docker.NewClientFromEnv()
		if err != nil {
			log.Fatal(err)
		}
		err = client.StopContainer(args[0], 5)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Docker container stopped:", args[0])

		id := args[0]
		instance, exists := instances[id]
		if !exists {
			fmt.Printf("Instance with ID %s not found.\n", id)
			return
		}
		if instance.Status == "stopped" {
			fmt.Printf("Instance %s is already stopped.\n", id)
			return
		}
		instance.Status = "stopped"
		instances[id] = instance
		saveInstances()
		fmt.Printf("Instance %s stopped.\n", id)
	},
}

// deleteCmd deletes a Docker container and removes its registration
var deleteCmd = &cobra.Command{
	Use:   "delete [container/instance ID]",
	Short: "Delete a compute instance (Docker container)",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		// Delete Docker container
		client, err := docker.NewClientFromEnv()
		if err != nil {
			log.Fatal(err)
		}
		removeOpts := docker.RemoveContainerOptions{
			ID:    args[0],
			Force: true,
		}
		if err := client.RemoveContainer(removeOpts); err != nil {
			log.Fatal(err)
		}
		fmt.Println("Docker container deleted:", args[0])

		id := args[0]
		_, exists := instances[id]
		if !exists {
			fmt.Printf("Instance with ID %s not found.\n", id)
			return
		}
		delete(instances, id)
		saveInstances()
		fmt.Printf("Instance %s deleted.\n", id)
	},
}
