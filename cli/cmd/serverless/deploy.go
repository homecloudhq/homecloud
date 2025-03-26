package serverless

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/spf13/cobra"
)

// DeployCmd deploys a new serverless function
var DeployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy a new serverless function",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		file, _ := cmd.Flags().GetString("file")
		runtime, _ := cmd.Flags().GetString("runtime")

		if name == "" || file == "" || runtime == "" {
			fmt.Println("Error: --name, --file, and --runtime are required")
			return
		}

		functionPath := filepath.Join("functions", name)
		os.MkdirAll(functionPath, os.ModePerm)

		err := exec.Command("cp", file, filepath.Join(functionPath, "handler.py")).Run()
		if err != nil {
			fmt.Println("Failed to copy file:", err)
			return
		}

		fmt.Printf("Function '%s' deployed successfully!\n", name)
	},
}

func init() {
	DeployCmd.Flags().StringP("name", "n", "", "Name of the function")
	DeployCmd.Flags().StringP("file", "f", "", "Path to the function file")
	DeployCmd.Flags().StringP("runtime", "r", "python3", "Runtime environment")
}
