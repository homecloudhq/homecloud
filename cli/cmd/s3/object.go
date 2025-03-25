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
		// Connect to MinIO
		client := connectMinIO()

		// Get bucket and file path from flags
		bucket, _ := cmd.Flags().GetString("bucket")
		filePath, _ := cmd.Flags().GetString("file")

		// Open the file
		file, err := os.Open(filePath)
		if err != nil {
			log.Fatalf("Failed to open file: %v", err)
		}
		defer file.Close()

		// Get file stats
		fileStat, _ := file.Stat()

		// Upload the file to the specified bucket
		_, err = client.PutObject(context.Background(), bucket, filePath, file, fileStat.Size(), minio.PutObjectOptions{})
		if err != nil {
			log.Fatalf("Failed to upload file: %v", err)
		}

		// Print success message
		fmt.Printf("✅ File '%s' uploaded to bucket '%s'!\n", filePath, bucket)
	},
}

// Download file command
var downloadCmd = &cobra.Command{
	Use:   "download",
	Short: "Download a file from an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		// Connect to MinIO
		client := connectMinIO()

		// Get bucket, file, and destination from flags
		bucket, _ := cmd.Flags().GetString("bucket")
		file, _ := cmd.Flags().GetString("file")
		destination, _ := cmd.Flags().GetString("destination")

		// If no destination is provided, use the file name
		if destination == "" {
			destination = file
		}

		// Download the file from the specified bucket
		err := client.FGetObject(context.Background(), bucket, file, destination, minio.GetObjectOptions{})
		if err != nil {
			log.Fatalf("❌ Failed to download file: %v", err)
		}

		// Print success message
		fmt.Printf("✅ File '%s' downloaded from bucket '%s' to '%s'!\n", file, bucket, destination)
	},
}

// List objects command
var listObjectsCmd = &cobra.Command{
	Use:   "list",
	Short: "List all objects in a bucket",
	Run: func(cmd *cobra.Command, args []string) {
		// Connect to MinIO
		client := connectMinIO()

		// Get bucket from flags
		bucket, _ := cmd.Flags().GetString("bucket")

		// List objects in the specified bucket
		objectCh := client.ListObjects(context.Background(), bucket, minio.ListObjectsOptions{})
		fmt.Printf("📂 Objects in bucket '%s':\n", bucket)

		// Iterate over the objects and print their keys
		for object := range objectCh {
			if object.Err != nil {
				log.Fatalf("❌ Error listing objects: %v", object.Err)
			}
			fmt.Println(" - " + object.Key)
		}
	},
}

// Delete an object command
var deleteObjectCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete an object from an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		// Connect to MinIO
		client := connectMinIO()

		// Get bucket and file from flags
		bucket, _ := cmd.Flags().GetString("bucket")
		file, _ := cmd.Flags().GetString("file")

		fmt.Printf("🔍 Checking if object '%s' exists in bucket '%s'...\n", file, bucket)

		// Verify the file exists first
		found := false
		objectCh := client.ListObjects(context.Background(), bucket, minio.ListObjectsOptions{})
		for object := range objectCh {
			if object.Err != nil {
				log.Fatalf("❌ Error listing objects: %v", object.Err)
			}
			if object.Key == file {
				found = true
				break
			}
		}

		if !found {
			log.Fatalf("❌ Error: Object '%s' not found in bucket '%s'. Double-check the filename!\n", file, bucket)
		}

		// Proceed to delete now that we've confirmed the object exists
		fmt.Printf("🚀 Deleting object '%s' from bucket '%s'...\n", file, bucket)
		err := client.RemoveObject(context.Background(), bucket, file, minio.RemoveObjectOptions{})
		if err != nil {
			log.Fatalf("❌ Failed to delete object: %v", err)
		}

		// Print success message
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

	// List objects flags
	listObjectsCmd.Flags().StringP("bucket", "b", "", "Bucket to list objects from (required)")
	listObjectsCmd.MarkFlagRequired("bucket")

	// Delete object flags
	deleteObjectCmd.Flags().StringP("bucket", "b", "", "Target bucket (required)")
	deleteObjectCmd.Flags().StringP("file", "f", "", "Object to delete (required)")
	deleteObjectCmd.MarkFlagRequired("bucket")
	deleteObjectCmd.MarkFlagRequired("file")
}
