# HomeCloud CLI

This folder contains the implementation of the HomeCloud CLI tool. The CLI interacts with HomeCloud services and manages various aspects of the system, with an enhanced focus on compute resources using Docker containers.

## Folder Structure

```plaintext
cli/
├── cmd/
│   ├── root.go         # Root command of the CLI
│   ├── compute.go      # Subcommand for managing compute resources (Docker-based)
│   ├── config.go       # Subcommand for managing CLI configurations
├── main.go             # Entry point for the CLI application
├── go.mod              # Go module file
```

## Commands Overview

### Root Command
- The base command for the CLI, defined in `cmd/root.go`.
- Provides help and global options for the CLI.

### `compute` Command
- **Purpose**: Manages compute resources using Docker containers.
- **Operations**:
  - **create**: Create a new Docker container and register it as a compute instance.
  - **list**: List all compute instances (Docker containers).
  - **start**: Start a stopped Docker container and update its status.
  - **enter**: Enter a Docker container interactively.
  - **stop**: Stop a running Docker container and update its status.
  - **delete**: Delete a Docker container and remove its registration.
  
Implemented in `cmd/compute.go`.

### `config` Command
- **Purpose**: Manages configuration for the CLI.
- Includes:
  - `set`: Updates configuration values (e.g., API endpoint).
  - `get`: Retrieves configuration values.
  
Implemented in `cmd/config.go`.

## Configuration
- Configurations are stored in a JSON file located at `~/.homecloud_config.json`.
- Example keys:
  - `api_endpoint`: Specifies the API endpoint for HomeCloud.

## Getting Started
1. Navigate to the `cli` folder.
2. Run the CLI:
   ```bash
   go run main.go
   ```
3. Explore the available commands:
   ```bash
   go run main.go --help
   ```

## `compute` Command Detailed Usage

### `compute create`
- **Description**: Create a new compute instance (Docker container).
- **Flags**:
  - `--name` or `-n` (required): Name of the container/instance.
  - `--cpu` or `-c` (default: 1): Number of CPU cores.
  - `--ram` or `-r` (default: 512MB): Amount of RAM in MB.
  - `--storage` or `-s` (default: 10GB): Storage size in GB.
  - `--image` or `-i` (default: "python:3.10-alpine"): Base image for the container.
  
- **Example**:
   ```bash
   go run main.go compute create --name my_instance --cpu 2 --ram 1024 --storage 20 --image python:3.10-alpine
   ```

### `compute list`
- **Description**: List all compute instances (Docker containers).
- **Example**:
   ```bash
   go run main.go compute list
   ```

### `compute start [ID]`
- **Description**: Start a stopped compute instance (Docker container).
- **Example**:
   ```bash
   go run main.go compute start my_instance_id
   ```

### `compute enter [ID]`
- **Description**: Enter a compute instance (Docker container) interactively.
- **Example**:
   ```bash
   go run main.go compute enter my_instance_id
   ```

### `compute stop [ID]`
- **Description**: Stop a running compute instance (Docker container).
- **Example**:
   ```bash
   go run main.go compute stop my_instance_id
   ```

### `compute delete [ID]`
- **Description**: Delete a compute instance (Docker container) and remove its registration.
- **Example**:
   ```bash
   go run main.go compute delete my_instance_id
   ```

## Instance Storage
- The state of instances is saved in a local JSON file named `compute.json`.
- This file tracks the following details for each instance:
  - `ID`: Unique container ID
  - `Name`: The name of the container/instance
  - `CPU`: The allocated number of CPU cores
  - `RAM`: The allocated amount of RAM
  - `Storage`: The allocated storage space
  - `BaseImage`: The base Docker image used for the container
  - `Status`: The current status of the instance (running, stopped)

