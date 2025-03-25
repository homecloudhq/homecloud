package s3

import (
	"context"
	"fmt"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/spf13/cobra"
)

// Initialize MinIO client
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

// Define bucket commands
var bucketCmd = &cobra.Command{
	Use:   "bucket",
	Short: "Manage S3 buckets",
}

// Create bucket command
var createBucketCmd = &cobra.Command{
	Use:   "create",
	Short: "Create a new S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()
		bucketName, _ := cmd.Flags().GetString("name")

		err := client.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})
		if err != nil {
			log.Fatalf("Failed to create bucket: %v", err)
		}
		fmt.Printf("Bucket '%s' created successfully!\n", bucketName)
	},
}

// Delete bucket command
var deleteBucketCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete an S3 bucket",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()
		bucketName, _ := cmd.Flags().GetString("name")

		err := client.RemoveBucket(context.Background(), bucketName)
		if err != nil {
			log.Fatalf("Failed to delete bucket: %v", err)
		}
		fmt.Printf("Bucket '%s' deleted successfully!\n", bucketName)
	},
}

// List buckets command
var listBucketsCmd = &cobra.Command{
	Use:   "list",
	Short: "List all S3 buckets",
	Run: func(cmd *cobra.Command, args []string) {
		client := connectMinIO()
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
	bucketCmd.AddCommand(createBucketCmd)
	bucketCmd.AddCommand(deleteBucketCmd)
	bucketCmd.AddCommand(listBucketsCmd)

	createBucketCmd.Flags().StringP("name", "n", "", "Name of the bucket (required)")
	deleteBucketCmd.Flags().StringP("name", "n", "", "Name of the bucket (required)")
}
