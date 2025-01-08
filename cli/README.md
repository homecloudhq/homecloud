# HomeCloud CLI

This folder contains the implementation of the HomeCloud CLI tool. The CLI is designed to interact with HomeCloud services and manage various aspects of the system.

## Folder Structure

```plaintext
cli/
├── cmd/
│   ├── root.go         # Root command of the CLI
│   ├── compute.go      # Subcommand for managing compute resources
│   ├── config.go       # Subcommand for managing CLI configurations
├── main.go             # Entry point for the CLI application
├── go.mod              # Go module file
```

## Commands Overview

### Root Command
- The base command for the CLI, defined in `cmd/root.go`.
- Provides help and global options for the CLI.

### `compute` Command
- Manages compute resources in HomeCloud.
- Placeholder implementation in `cmd/compute.go`.

### `config` Command
- Manages configuration for the CLI.
- Includes:
  - `set`: Updates configuration values (e.g., API endpoint).
  - `get`: Retrieves configuration values.
- Implemented in `cmd/config.go`.

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

