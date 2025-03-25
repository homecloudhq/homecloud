package s3

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/minio/minio-go/v7"
	"github.com/spf13/cobra"
)

// Create the "object" command
var objectCmd = &cobra.Command{
	Use:   "object",
	Short: "Manage S3 objects",
}

// Upload file command
var uploadCmd = &cobra.Command{
	Use:   "upload",
	Short: "Upload a file to an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()

		bucket, _ := cmd.Flags().GetString("bucket")
		filePath, _ := cmd.Flags().GetString("file")

		file, err := os.Open(filePath)
		if err != nil {
			log.Fatalf("Failed to open file: %v", err)
		}
		defer file.Close()

		fileStat, _ := file.Stat()
		_, err = client.PutObject(context.Background(), bucket, filePath, file, fileStat.Size(), minio.PutObjectOptions{})
		if err != nil {
			log.Fatalf("Failed to upload file: %v", err)
		}

		fmt.Printf("✅ File '%s' uploaded to bucket '%s'!\n", filePath, bucket)
	},
}

// Download file command
var downloadCmd = &cobra.Command{
	Use:   "download",
	Short: "Download a file from an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()

		bucket, _ := cmd.Flags().GetString("bucket")
		file, _ := cmd.Flags().GetString("file")
		destination, _ := cmd.Flags().GetString("destination")

		if destination == "" {
			destination = file
		}

		err := client.FGetObject(context.Background(), bucket, file, destination, minio.GetObjectOptions{})
		if err != nil {
			log.Fatalf("❌ Failed to download file: %v", err)
		}

		fmt.Printf("✅ File '%s' downloaded from bucket '%s' to '%s'!\n", file, bucket, destination)
	},
}

// List objects command
var listObjectsCmd = &cobra.Command{
	Use:   "list",
	Short: "List all objects in a bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()
		bucket, _ := cmd.Flags().GetString("bucket")

		objectCh := client.ListObjects(context.Background(), bucket, minio.ListObjectsOptions{})
		fmt.Printf("📂 Objects in bucket '%s':\n", bucket)

		for object := range objectCh {
			if object.Err != nil {
				log.Fatalf("❌ Error listing objects: %v", object.Err)
			}
			fmt.Println(" - " + object.Key)
		}
	},
}

// Delete an object
var deleteObjectCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete an object from an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()

		bucket, _ := cmd.Flags().GetString("bucket")
		file, _ := cmd.Flags().GetString("file")

		err := client.RemoveObject(context.Background(), bucket, file, minio.RemoveObjectOptions{})
		if err != nil {
			log.Fatalf("❌ Failed to delete object: %v", err)
		}

		fmt.Printf("✅ Object '%s' deleted from bucket '%s'!\n", file, bucket)
	},
}

// MinIO connection setup
// The connectMinIO function is defined in bucket.go

func init() {
	// Register all object commands
	objectCmd.AddCommand(uploadCmd)
	objectCmd.AddCommand(downloadCmd)
	objectCmd.AddCommand(listObjectsCmd)
	objectCmd.AddCommand(deleteObjectCmd)

	// Upload flags
	uploadCmd.Flags().StringP("bucket", "b", "", "Target bucket (required)")
	uploadCmd.Flags().StringP("file", "f", "", "File to upload (required)")
	uploadCmd.MarkFlagRequired("bucket")
	uploadCmd.MarkFlagRequired("file")

	// Download flags
	downloadCmd.Flags().StringP("bucket", "b", "", "Source bucket (required)")
	downloadCmd.Flags().StringP("file", "f", "", "File to download (required)")
	downloadCmd.Flags().StringP("destination", "d", "", "Destination path (optional)")
	downloadCmd.MarkFlagRequired("bucket")
	downloadCmd.MarkFlagRequired("file")

	// List objects
	listObjectsCmd.Flags().StringP("bucket", "b", "", "Bucket to list objects from (required)")
	listObjectsCmd.MarkFlagRequired("bucket")

	// Delete object
	deleteObjectCmd.Flags().StringP("bucket", "b", "", "Target bucket (required)")
	deleteObjectCmd.Flags().StringP("file", "f", "", "Object to delete (required)")
	deleteObjectCmd.MarkFlagRequired("bucket")
	deleteObjectCmd.MarkFlagRequired("file")
}
