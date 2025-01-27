package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

var configFile string

// Config holds the configuration values
type Config struct {
	APIEndpoint string `json:"api_endpoint"`
}

// loadConfig reads the configuration from the config file
func loadConfig() (*Config, error) {
	file, err := os.Open(configFile)
	if os.IsNotExist(err) {
		// If the config file doesn't exist, return an empty config
		return &Config{}, nil
	} else if err != nil {
		// If there's another error opening the file, return it
		return nil, err
	}
	defer file.Close()

	var config Config
	// Decode the JSON config file into the Config struct
	err = json.NewDecoder(file).Decode(&config)
	if err != nil {
		return nil, err
	}
	return &config, nil
}

// saveConfig writes the configuration to the config file
func saveConfig(config *Config) error {
	file, err := os.Create(configFile)
	if err != nil {
		return err
	}
	defer file.Close()

	// Encode the Config struct as JSON and write it to the file
	return json.NewEncoder(file).Encode(config)
}

// setConfigCmd sets a configuration value
var setConfigCmd = &cobra.Command{
	Use:   "set [key] [value]",
	Short: "Set a configuration value",
	Args:  cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		key := args[0]
		value := args[1]

		config, err := loadConfig()
		if err != nil {
			fmt.Println("Error loading config:", err)
			return
		}

		// Update the config based on the key
		switch key {
		case "api_endpoint":
			config.APIEndpoint = value
		default:
			fmt.Println("Unknown configuration key:", key)
			return
		}

		// Save the updated config
		err = saveConfig(config)
		if err != nil {
			fmt.Println("Error saving config:", err)
			return
		}

		fmt.Println("Configuration updated successfully.")
	},
}

// getConfigCmd gets a configuration value
var getConfigCmd = &cobra.Command{
	Use:   "get [key]",
	Short: "Get a configuration value",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		key := args[0]

		config, err := loadConfig()
		if err != nil {
			fmt.Println("Error loading config:", err)
			return
		}

		// Print the config value based on the key
		switch key {
		case "api_endpoint":
			fmt.Println("API Endpoint:", config.APIEndpoint)
		default:
			fmt.Println("Unknown configuration key:", key)
		}
	},
}

// configCmd is the parent command for config management
var configCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage config",
}

func init() {
    home, err := os.UserHomeDir()
    if err != nil {
        panic(err)
    }
    // Set the path to the config file in the user's home directory
    configFile = filepath.Join(home, ".homecloud_config.json")

    // Add subcommands to the config command
    configCmd.AddCommand(setConfigCmd)
    configCmd.AddCommand(getConfigCmd)

    // Add the config command to the RootCmd
    RootCmd.AddCommand(configCmd) // Use RootCmd here
}
