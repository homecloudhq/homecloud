package serverless

import (
	"fmt"
	"os/exec"

	"github.com/spf13/cobra"
)

// InvokeCmd runs the function locally
var InvokeCmd = &cobra.Command{
	Use:   "invoke",
	Short: "Invoke a serverless function",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		if name == "" {
			fmt.Println("Error: --name is required")
			return
		}

		functionPath := fmt.Sprintf("functions/%s/handler.py", name)
		out, err := exec.Command("python3", functionPath).Output()
		if err != nil {
			fmt.Println("Failed to run function:", err)
			return
		}

		fmt.Printf("Function Output:\n%s\n", string(out))
	},
}

func init() {
	InvokeCmd.Flags().StringP("name", "n", "", "Name of the function to invoke")
}
