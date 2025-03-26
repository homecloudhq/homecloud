package serverless

import (
	"github.com/spf13/cobra"
)

// ServerlessCmd is the base command for serverless operations
var ServerlessCmd = &cobra.Command{
	Use:   "serverless",
	Short: "Manage serverless functions",
}

func init() {
	// Register this command to root
	ServerlessCmd.AddCommand(DeployCmd)
	ServerlessCmd.AddCommand(ListCmd)
	ServerlessCmd.AddCommand(InvokeCmd)
}
