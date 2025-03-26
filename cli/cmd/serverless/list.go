package serverless

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

// ListCmd lists all deployed functions
var ListCmd = &cobra.Command{
	Use:   "list",
	Short: "List all serverless functions",
	Run: func(cmd *cobra.Command, args []string) {
		files, err := os.ReadDir("functions/")
		if err != nil {
			fmt.Println("No functions deployed yet.")
			return
		}

		fmt.Println("Deployed Functions:")
		for _, file := range files {
			if file.IsDir() {
				fmt.Printf("- %s\n", file.Name())
			}
		}
	},
}

func init() {
	ServerlessCmd.AddCommand(ListCmd)
}
