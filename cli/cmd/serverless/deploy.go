package serverless

import (
	"fmt"
	"os"

	"github.com/homecloudhq/homecloud/cli/cmd/serverless/runtime" // Ensure this matches your folder structure

	"github.com/spf13/cobra"
)

// DeployCmd deploys a serverless function
var DeployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy a new serverless function",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		file, _ := cmd.Flags().GetString("file")
		runtimeType, _ := cmd.Flags().GetString("runtime")

		// Check for required flags
		if name == "" || file == "" || runtimeType == "" {
			fmt.Println("Error: --name, --file, and --runtime are required")
			return
		}

		// Ensure the file exists
		if _, err := os.Stat(file); os.IsNotExist(err) {
			fmt.Printf("Error: File %s not found\n", file)
			return
		}

		fmt.Printf("🚀 Deploying function '%s' using runtime '%s'...\n", name, runtimeType)

		switch runtimeType {
		case "python3":
			err := runtime.DeployPythonFunction(name, file) // ✅ Calls the function from the runtime folder now
			if err != nil {
				fmt.Printf("❌ Failed to deploy function: %s\n", err)
			} else {
				fmt.Printf("✅ Function '%s' deployed successfully!\n", name)
			}
		default:
			fmt.Printf("❌ Runtime '%s' is not supported yet.\n", runtimeType)
		}
	},
}

func init() {
	DeployCmd.Flags().StringP("name", "n", "", "Name of the function")
	DeployCmd.Flags().StringP("file", "f", "", "Path to the function code file")
	DeployCmd.Flags().StringP("runtime", "r", "python3", "Runtime environment (default: python3)")
}
