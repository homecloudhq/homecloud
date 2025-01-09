package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/spf13/cobra"
)

const stateFile = "compute.json"

// Instance represents a compute instance with its configuration and status.
type Instance struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CPU       int    `json:"cpu"`
	RAM       int    `json:"ram"`
	Storage   int    `json:"storage"`
	BaseImage string `json:"base_image"`
	Status    string `json:"status"`
}

// instances holds the current state of all compute instances.
var instances = make(map[string]Instance)

// Command-line flags for creating a new instance.
var name string
var cpu int
var ram int
var storage int
var baseImage string

// computeCmd is the root command for managing compute resources.
var computeCmd = &cobra.Command{
	Use:   "compute",
	Short: "Manage compute resources in HomeCloud",
	Long: `The compute command allows you to deploy, manage, and monitor
containerized applications in your self-hosted HomeCloud environment.`,
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

func init() {
	// Register the compute command with the root command.
	rootCmd.AddCommand(computeCmd)

	// Load existing instances from the state file.
	loadInstances()

	// Add subcommands for compute management.
	computeCmd.AddCommand(createCmd)
	computeCmd.AddCommand(listCmd)
	computeCmd.AddCommand(startCmd)
	computeCmd.AddCommand(stopCmd)
	computeCmd.AddCommand(deleteCmd)
}

// saveInstances writes the current state of instances to the state file.
func saveInstances() {
	data, err := json.MarshalIndent(instances, "", "  ")
	if err != nil {
		fmt.Printf("Error saving instances: %v\n", err)
		return
	}
	err = ioutil.WriteFile(stateFile, data, 0644)
	if err != nil {
		fmt.Printf("Error writing to state file: %v\n", err)
	}
}

// loadInstances reads the state file and populates the instances map.
func loadInstances() {
	if _, err := os.Stat(stateFile); os.IsNotExist(err) {
		return // No state file, nothing to load
	}
	data, err := ioutil.ReadFile(stateFile)
	if err != nil {
		fmt.Printf("Error reading state file: %v\n", err)
		return
	}
	err = json.Unmarshal(data, &instances)
	if err != nil {
		fmt.Printf("Error parsing state file: %v\n", err)
	}
}

// createCmd creates a new compute instance with the specified configuration.
var createCmd = &cobra.Command{
	Use:   "create",
	Short: "Create a new compute instance",
	Run: func(cmd *cobra.Command, args []string) {
		id := fmt.Sprintf("instance-%d", time.Now().Unix())
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
	// Define flags for the create command.
	createCmd.Flags().StringVarP(&name, "name", "n", "", "Name of the instance (required)")
	createCmd.Flags().IntVarP(&cpu, "cpu", "c", 1, "Number of CPU cores")
	createCmd.Flags().IntVarP(&ram, "ram", "r", 512, "Amount of RAM in MB")
	createCmd.Flags().IntVarP(&storage, "storage", "s", 10, "Storage size in GB")
	createCmd.Flags().StringVarP(&baseImage, "image", "i", "ubuntu", "Base image for the instance")
	createCmd.MarkFlagRequired("name")
}

// listCmd lists all existing compute instances.
var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List all compute instances",
	Run: func(cmd *cobra.Command, args []string) {
		if len(instances) == 0 {
			fmt.Println("No instances found.")
			return
		}
		for _, instance := range instances {
			fmt.Printf("ID: %s, Name: %s, CPU: %d, RAM: %dMB, Storage: %dGB, Status: %s\n",
				instance.ID, instance.Name, instance.CPU, instance.RAM, instance.Storage, instance.Status)
		}
	},
}

// startCmd starts a specified compute instance.
var startCmd = &cobra.Command{
	Use:   "start [instance ID]",
	Short: "Start a compute instance",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
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

// stopCmd stops a specified compute instance.
var stopCmd = &cobra.Command{
	Use:   "stop [instance ID]",
	Short: "Stop a compute instance",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
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

// deleteCmd deletes a specified compute instance.
var deleteCmd = &cobra.Command{
	Use:   "delete [instance ID]",
	Short: "Delete a compute instance",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
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
