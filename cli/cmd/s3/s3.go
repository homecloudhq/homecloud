package s3

import (
	"fmt"
	"log"
	"os/exec"
	"strings"

	"github.com/spf13/cobra"
)

// S3Cmd is the parent command for S3 operations
var S3Cmd = &cobra.Command{
	Use:   "s3",
	Short: "Manage S3-compatible storage",
	Long:  "Commands for managing S3-compatible object storage, including MinIO.",
	Run: func(cmd *cobra.Command, args []string) {
		ensureMinIODocker()
		fmt.Println("MinIO is ready! Use 'homecloud s3 --help' for available commands.")
	},
}

func ensureMinIODocker() {
	containerName := "homecloud_minio"
	minioImage := "quay.io/minio/minio"
	minioPort := "9000"
	minioConsolePort := "9001"
	minioUser := "admin"
	minioPass := "admin123"

	fmt.Println("🔍 Checking MinIO setup...")

	// Check if any MinIO container exists (by image)
	checkCmd := exec.Command("docker", "ps", "-a", "--filter", "ancestor="+minioImage, "--format", "{{.ID}}")
	output, _ := checkCmd.Output()
	containerID := strings.TrimSpace(string(output))

	if containerID != "" {
		fmt.Println("✅ MinIO container found!")

		// Check if it's running
		statusCmd := exec.Command("docker", "inspect", "-f", "{{.State.Status}}", containerID)
		statusOutput, err := statusCmd.Output()
		if err != nil {
			log.Fatalf("❌ Failed to check MinIO container status: %v", err)
		}

		containerStatus := strings.TrimSpace(string(statusOutput))
		if containerStatus == "exited" {
			fmt.Println("🔄 MinIO was stopped — restarting it...")
			restartCmd := exec.Command("docker", "start", containerID)
			if err := restartCmd.Run(); err != nil {
				log.Fatalf("❌ Failed to restart MinIO container: %v", err)
			}
			fmt.Println("✅ MinIO restarted!")
		} else if containerStatus == "running" {
			fmt.Println("⚡ MinIO is already running!")
		}
	} else {
		fmt.Println("🚀 MinIO container not found — creating one...")

		// Pull the latest MinIO image (optional but ensures it’s fresh)
		fmt.Println("🔄 Pulling latest MinIO image...")
		pullCmd := exec.Command("docker", "pull", minioImage)
		if err := pullCmd.Run(); err != nil {
			log.Fatalf("❌ Failed to pull MinIO image: %v", err)
		}

		// Create and start MinIO container
		runCmd := exec.Command(
			"docker", "run", "-d",
			"--name", containerName,
			"-p", minioPort+":9000",
			"-p", minioConsolePort+":9001",
			"-e", "MINIO_ROOT_USER="+minioUser,
			"-e", "MINIO_ROOT_PASSWORD="+minioPass,
			minioImage,
			"server", "/data", "--console-address", ":9001",
		)

		if err := runCmd.Run(); err != nil {
			log.Fatalf("❌ Failed to create MinIO container: %v", err)
		}

		fmt.Println("✅ MinIO setup complete!")
		fmt.Printf("🌐 Access MinIO Web UI at: http://localhost:%s (user: %s / pass: %s)\n", minioConsolePort, minioUser, minioPass)
	}
}

func init() {
	S3Cmd.AddCommand(bucketCmd)
	S3Cmd.AddCommand(objectCmd)
}
