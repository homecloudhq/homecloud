
# 🚀 HomeCloud CLI: S3 Module  

The `s3` module integrates S3-compatible storage into the HomeCloud CLI, powered by **MinIO**. It supports creating buckets, managing objects, and auto-handles the MinIO setup using Docker containers.

---

## 📁 Folder Structure  

```plaintext
cli/
└── cmd/
    └── s3/
        ├── s3.go          # Parent command for 'homecloud s3'
        ├── bucket.go      # Bucket commands (create, delete, list)
        └── object.go      # Object commands (upload, download, list, delete)
```

---

## 🛠️ MinIO Setup  

When you run any `homecloud s3` command:  

✅ **Checks if MinIO is running**  
✅ If stopped, **restarts** the container  
✅ If missing, **pulls the latest MinIO image** and **sets it up**  

---

### 🚧 **MinIO Configuration Defaults**  

| Setting          | Value                           |
|------------------|---------------------------------|
| Image            | `quay.io/minio/minio`           |
| Data Directory   | `/data`                          |
| API Address      | `http://localhost:9000`         |
| Console Address  | `http://localhost:9001`         |
| Root User        | `admin`                          |
| Root Password    | `admin123`                       |

---

## 🔥 S3 Commands Breakdown  

---

### 🪣 1️⃣ **Bucket Commands**  

```bash
homecloud s3 bucket [command]
```

| Command        | Description                         | Example Usage                                        |
|----------------|-------------------------------------|------------------------------------------------------|
| **create**     | Create a new bucket                 | `homecloud s3 bucket create --name mybucket`         |
| **delete**     | Delete an existing bucket           | `homecloud s3 bucket delete --name mybucket`         |
| **list**       | List all available buckets          | `homecloud s3 bucket list`                           |

---

#### ✅ **Bucket Command Examples**

---

#### **Create a Bucket**  

```bash
homecloud s3 bucket create --name photos
```

✅ **Output:**  
```bash
Bucket 'photos' created successfully!
```

---

#### **List Buckets**  

```bash
homecloud s3 bucket list
```

✅ **Output:**  
```bash
Available Buckets:
- photos
- backups
- logs
```

---

#### **Delete a Bucket**  

```bash
homecloud s3 bucket delete --name logs
```

✅ **Output:**  
```bash
Bucket 'logs' deleted successfully!
```

---

### 📦 2️⃣ **Object Commands**  

```bash
homecloud s3 object [command]
```

| Command        | Description                          | Example Usage                                          |
|----------------|--------------------------------------|--------------------------------------------------------|
| **upload**     | Upload a file to a bucket            | `homecloud s3 object upload --bucket photos --file profile.jpg` |
| **download**   | Download a file from a bucket        | `homecloud s3 object download --bucket photos --file profile.jpg --destination ./downloads` |
| **list**       | List all objects in a bucket         | `homecloud s3 object list --bucket photos`              |
| **delete**     | Delete an object from a bucket       | `homecloud s3 object delete --bucket photos --file profile.jpg` |

---

#### ✅ **Object Command Examples**

---

#### **Upload a File**  

```bash
homecloud s3 object upload --bucket photos --file vacation.jpg
```

✅ **Output:**  
```bash
File 'vacation.jpg' uploaded to bucket 'photos'!
```

---

#### **List Objects in a Bucket**  

```bash
homecloud s3 object list --bucket photos
```

✅ **Output:**  
```bash
Files in 'photos':
- vacation.jpg
- birthday.jpg
```

---

#### **Download a File**  

```bash
homecloud s3 object download --bucket photos --file vacation.jpg --destination ./saved_pics
```

✅ **Output:**  
```bash
File 'vacation.jpg' downloaded to './saved_pics'!
```

---

#### **Delete an Object**  

```bash
homecloud s3 object delete --bucket photos --file vacation.jpg
```

✅ **Output:**  
```bash
File 'vacation.jpg' deleted from bucket 'photos'!
```

---

## 🔍 MinIO Web UI  

After running any S3 command, MinIO’s web console becomes available:  

- **URL:** `http://localhost:9001`  
- **Username:** `admin`  
- **Password:** `admin123`  

✅ **Supports manual file uploads, bucket management, and monitoring!**  

---

## ⚙️ Environment Variables (Optional)  

You can override MinIO settings with these environment variables before running the CLI:  

```bash
export MINIO_ROOT_USER=myuser
export MINIO_ROOT_PASSWORD=supersecurepass
export MINIO_PORT=9000
export MINIO_CONSOLE_PORT=9001
```

---

