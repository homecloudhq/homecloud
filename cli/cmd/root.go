package cmd

import (
    "fmt"

    "github.com/spf13/cobra"
	"github.com/drk1rd/homecloud/cli/cmd/compute"
)

// RootCmd is the base command for the CLI, exported for use in other modules.
var RootCmd = &cobra.Command{
    Use:   "homecloud",
    Short: "HomeCloud CLI for managing self-hosted cloud services",
    Long: `HomeCloud CLI provides tools to deploy, manage, and monitor 
self-hosted cloud infrastructure.`,
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("Welcome to HomeCloud CLI!")
    },
}

// Execute runs the root command, entry point for the CLI.
func Execute() {
    if err := RootCmd.Execute(); err != nil {
        fmt.Println(err)
    }
}

// Register all individual comments here.
func init() {
	RootCmd.AddCommand(compute.ComputeCmd)
}