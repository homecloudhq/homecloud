package serverless

import (
	"fmt"
	"os/exec"

	"github.com/spf13/cobra"
)

// DeleteCmd removes a deployed serverless function
var deleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete a serverless function",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")

		if name == "" {
			fmt.Println("Error: --name is required")
			return
		}

		fmt.Printf("Deleting function '%s'...\n", name)

		err := exec.Command("docker", "rm", "-f", name).Run()

		if err != nil {
			fmt.Printf("Failed to delete function: %s\n", err)
		} else {
			fmt.Printf("Function '%s' deleted successfully!\n", name)
		}
	},
}

func init() {
	deleteCmd.Flags().StringP("name", "n", "", "Name of the function to delete")
}
