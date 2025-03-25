package s3

import (
	"github.com/spf13/cobra"
)

// S3Cmd is the parent command for S3 operations
var S3Cmd = &cobra.Command{
	Use:   "s3",
	Short: "Manage S3-compatible storage",
	Long:  "Commands for managing S3-compatible object storage, including MinIO.",
}

func init() {
	S3Cmd.AddCommand(bucketCmd)
	S3Cmd.AddCommand(objectCmd)
}
