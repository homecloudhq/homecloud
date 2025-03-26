package serverless

import (
	"bytes"
	"fmt"
	"os/exec"

	"github.com/spf13/cobra"
)

// InvokeCmd calls a deployed serverless function
var InvokeCmd = &cobra.Command{
	Use:   "invoke",
	Short: "Invoke a deployed serverless function",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		payload, _ := cmd.Flags().GetString("payload")
		fmt.Printf("Payload: %s\n", payload) // Use the payload variable

		if name == "" {
			fmt.Println("Error: --name is required")
			return
		}

		fmt.Printf("Invoking function '%s'...\n", name)

		// Simulate running the function in a container
		out := &bytes.Buffer{}
		err := exec.Command("docker", "exec", name, "python3", "/app/main.py").Run()

		if err != nil {
			fmt.Printf("Failed to invoke function: %s\n", err)
		} else {
			fmt.Printf("Function output: %s\n", out.String())
		}
	},
}

func init() {
	InvokeCmd.Flags().StringP("name", "n", "", "Name of the function to invoke")
	InvokeCmd.Flags().StringP("payload", "p", "", "Payload to send to the function (optional)")
}
