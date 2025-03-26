package serverless

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var deleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete a deployed serverless function",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")

		if name == "" {
			fmt.Println("Error: --name is required")
			return
		}

		// Check if function exists
		functionPath := fmt.Sprintf("functions/%s", name)
		if _, err := os.Stat(functionPath); os.IsNotExist(err) {
			fmt.Printf("Error: Function '%s' not found\n", name)
			return
		}

		// Delete the function folder
		err := os.RemoveAll(functionPath)
		if err != nil {
			fmt.Printf("Error deleting function '%s': %s\n", name, err)
			return
		}

		fmt.Printf("Function '%s' deleted successfully!\n", name)
	},
}

func init() {
	deleteCmd.Flags().StringP("name", "n", "", "Name of the function to delete")
	ServerlessCmd.AddCommand(deleteCmd)
}
