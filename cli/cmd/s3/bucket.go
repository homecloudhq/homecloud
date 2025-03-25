package s3

import (
	"context"
	"fmt"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/spf13/cobra"
)

// connectMinIO initializes and returns a MinIO client
func connectMinIO() *minio.Client {
	client, err := minio.New("localhost:9000", &minio.Options{
		Creds:  credentials.NewStaticV4("minioadmin", "minioadmin", ""),
		Secure: false,
	})
	if err != nil {
		log.Fatalf("Failed to connect to MinIO: %v", err)
	}
	return client
}

// bucketCmd defines the root command for bucket operations
var bucketCmd = &cobra.Command{
	Use:   "bucket",
	Short: "Manage S3 buckets",
}

// createBucketCmd defines the command to create a new S3 bucket
var createBucketCmd = &cobra.Command{
	Use:   "create",
	Short: "Create a new S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()
		bucketName, _ := cmd.Flags().GetString("name")

		// Create a new bucket
		err := client.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})
		if err != nil {
			log.Fatalf("Failed to create bucket: %v", err)
		}
		fmt.Printf("Bucket '%s' created successfully!\n", bucketName)
	},
}

// deleteBucketCmd defines the command to delete an existing S3 bucket
var deleteBucketCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()
		bucketName, _ := cmd.Flags().GetString("name")

		// Delete the specified bucket
		err := client.RemoveBucket(context.Background(), bucketName)
		if err != nil {
			log.Fatalf("Failed to delete bucket: %v", err)
		}
		fmt.Printf("Bucket '%s' deleted successfully!\n", bucketName)
	},
}

// listBucketsCmd defines the command to list all S3 buckets
var listBucketsCmd = &cobra.Command{
	Use:   "list",
	Short: "List all S3 buckets",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()

		// List all buckets
		buckets, err := client.ListBuckets(context.Background())
		if err != nil {
			log.Fatalf("Failed to list buckets: %v", err)
		}
		for _, bucket := range buckets {
			fmt.Println(bucket.Name)
		}
	},
}

func init() {
	// Add subcommands to the root bucket command
	bucketCmd.AddCommand(createBucketCmd)
	bucketCmd.AddCommand(deleteBucketCmd)
	bucketCmd.AddCommand(listBucketsCmd)

	// Define flags for the create and delete commands
	createBucketCmd.Flags().StringP("name", "n", "", "Name of the bucket (required)")
	deleteBucketCmd.Flags().StringP("name", "n", "", "Name of the bucket (required)")
}
