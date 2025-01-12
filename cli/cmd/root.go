package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "homecloud",
	Short: "HomeCloud CLI for managing self-hosted cloud services",
	Long: `HomeCloud CLI provides tools to deploy, manage, and monitor 
self-hosted cloud infrastructure.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Welcome to HomeCloud CLI!")
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
	}
}
