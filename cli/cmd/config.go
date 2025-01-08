package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var configCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage CLI configurations for HomeCloud",
	Long: `The config command allows you to set or view configurations
used by the HomeCloud CLI, such as API endpoints or authentication tokens.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Use 'set' or 'get' subcommands to manage configuration.")
	},
}

func init() {
	rootCmd.AddCommand(configCmd)
}
