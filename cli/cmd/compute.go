package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var computeCmd = &cobra.Command{
	Use:   "compute",
	Short: "Manage compute resources in HomeCloud",
	Long: `The compute command allows you to deploy, manage, and monitor
containerized applications in your self-hosted HomeCloud environment.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Compute management is under development!")
	},
}

func init() {
	rootCmd.AddCommand(computeCmd)
}
