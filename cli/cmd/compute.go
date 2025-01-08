package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// computeCmd represents the compute command
var computeCmd = &cobra.Command{
	Use:   "compute",
	Short: "Manage compute resources in HomeCloud",
	Long: `The compute command allows you to deploy, manage, and monitor
containerized applications in your self-hosted HomeCloud environment.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Placeholder for future compute management functionality
		fmt.Println("Compute management is under development!")
	},
}

func init() {
	// Add computeCmd to the root command
	rootCmd.AddCommand(computeCmd)
}
