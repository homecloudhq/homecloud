# HomeCloud CLI  

This folder contains the implementation of the HomeCloud CLI tool. The CLI interacts with HomeCloud services and manages various aspects of the system, including compute resources (Docker containers) and S3-compatible storage.

---

## 📁 Folder Structure  

```plaintext
cli/
├── cmd/
│   ├── root.go         # Root command of the CLI
│   ├── compute/        # Compute management commands
│   ├── s3/             # S3 storage management commands
│   ├── config.go       # Configuration management commands
├── main.go             # Entry point for the CLI application
├── go.mod              # Go module file
```

---

## 🔧 Commands Overview  

### 🌟 Root Command  
- The base command for the CLI, defined in `cmd/root.go`.  
- Provides help and global options for the CLI.  

---

### 🖥️ `compute` Command  
- **Purpose**: Manages compute resources using Docker containers.  
- **Operations**:  
  - **create**: Create a new Docker container and register it as a compute instance.  
  - **list**: List all compute instances.  
  - **start**: Start a stopped compute instance.  
  - **enter**: Enter a running instance interactively.  
  - **stop**: Stop a running instance.  
  - **delete**: Delete a compute instance.  

Example:  
```bash
go run main.go compute create --name my_instance --cpu 2 --ram 1024 --storage 20 --image python:3.10-alpine
```

---

### ☁️ `s3` Command  
- **Purpose**: Manages S3-compatible storage (e.g., MinIO).  
- **Operations**:  

#### `s3 bucket`  
  - **create**: Create a new S3 bucket.  
  - **list**: List all buckets.  
  - **delete**: Delete a bucket.  

Example:  
```bash
go run main.go s3 bucket create --name my_bucket
```

#### `s3 object`  
  - **upload**: Upload a file to a bucket.  
  - **list**: List objects in a bucket.  
  - **download**: Download a file from a bucket.  
  - **delete**: Delete a file from a bucket.  

Example:  
```bash
go run main.go s3 object upload --bucket my_bucket --file file.txt
```

---

## ⚙️ Configuration  

Configurations are stored in `~/.homecloud_config.json`.  

Example keys:  
```json
{
  "api_endpoint": "http://localhost:8080",
  "s3_endpoint": "http://localhost:9000",
  "s3_access_key": "your_access_key",
  "s3_secret_key": "your_secret_key"
}
```

---

## 🚀 Getting Started  

1. **Navigate to the CLI folder**  
   ```bash
   cd cli
   ```

2. **Run the CLI**  
   ```bash
   go run main.go
   ```

3. **Explore commands**  
   ```bash
   go run main.go --help
   ```

---
