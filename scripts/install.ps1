# Function to check if Docker is installed
function Check-Docker {
    $dockerCheck = Get-Command docker -ErrorAction SilentlyContinue
    return $dockerCheck -ne $null
}

# Check if Docker is installed
if (-not (Check-Docker)) {
    Write-Host "Docker is not installed. Installing Docker..."
    # Open Docker installation URL in the browser
    Start-Process "https://docker.com/"
    Write-Host "Please install Docker Desktop and try running the script again after Docker is installed."
    exit
} else {
    Write-Host "Docker is already installed."
}

# Define download URL for Windows binary
$url = "https://github.com/homecloudhq/homecloud/releases/download/0.0.1/homecloud-windows.zip"
$dest = "homecloud-windows.zip"

# Download the ZIP file
Write-Host "Downloading HomeCloud CLI..."
Invoke-WebRequest -Uri $url -OutFile $dest

# Unzip the downloaded file
Write-Host "Extracting HomeCloud CLI..."
Expand-Archive -Path $dest -DestinationPath "."

# Move the executable to a system folder (optional)
Write-Host "Moving executable to C:\Program Files\HomeCloud"
New-Item -Path "C:\Program Files\HomeCloud" -ItemType Directory -Force
Move-Item -Path ".\homecloud-windows.exe" -Destination "C:\Program Files\HomeCloud\homecloud.exe"

Write-Host "HomeCloud CLI has been installed to C:\Program Files\HomeCloud\homecloud.exe"
Write-Host "You can now use the 'homecloud' command in the terminal."
