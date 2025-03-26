package serverless

import (
	"fmt"

	"github.com/spf13/cobra"
)

// ListCmd lists all deployed serverless functions
var ListCmd = &cobra.Command{
	Use:   "list",
	Short: "List all deployed serverless functions",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Listing all deployed serverless functions...")

		// Placeholder (in the real setup, query running containers or a state file)
		fmt.Println("- hello (python3)")
		fmt.Println("- image-resizer (python3)")
	},
}
