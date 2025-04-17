package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var (
	Version = "0.0.1"
	Commit  = "dev"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of the HomeCloud CLI",
	Long:  `Displays the current version and Git commit of the HomeCloud CLI tool.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("HomeCloud CLI version %s (commit: %s)\n", Version, Commit)
	},
}

func init() {
	RootCmd.AddCommand(versionCmd)
}
