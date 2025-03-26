package runtime

import (
	"fmt"
	"os/exec"
	"path/filepath"
)

// DeployPythonFunction deploys a Python-based serverless function
func DeployPythonFunction(name string, file string) error {
	// Get the absolute path of the function file
	absPath, err := filepath.Abs(file)
	if err != nil {
		return fmt.Errorf("failed to get absolute file path: %w", err)
	}

	fmt.Printf("🐍 Deploying Python function '%s'...\n", name)

	// Run the Docker container
	cmd := exec.Command(
		"docker", "run", "-d",
		"--name", name,
		"-v", fmt.Sprintf("%s:/app/main.py", absPath),
		"python:3.10-slim", "tail", "-f", "/dev/null",
	)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("docker run failed: %s\n%s", err, string(output))
	}

	fmt.Println("✅ Docker container started:", string(output))
	return nil
}
