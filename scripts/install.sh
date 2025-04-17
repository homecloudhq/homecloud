#!/bin/bash

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null
    then
        return 1
    else
        return 0
    fi
}

# Check if Docker is installed
if ! check_docker; then
    echo "Docker is not installed. Installing Docker..."

    # Installing Docker on Ubuntu (adjust for other distros)
    if [ -f /etc/debian_version ]; then
        # For Ubuntu/Debian-based distributions
        sudo apt update
        sudo apt install -y docker.io
        sudo systemctl enable --now docker
    elif [ -f /etc/redhat-release ]; then
        # For RedHat/CentOS-based distributions
        sudo yum install -y docker
        sudo systemctl enable --now docker
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # For macOS
        echo "Please install Docker Desktop for Mac from https://www.docker.com/products/docker-desktop"
        exit 1
    else
        echo "Unsupported OS for Docker installation. Please install Docker manually."
        exit 1
    fi
    echo "Docker has been installed. Please run the script again after Docker is installed."
    exit 1
else
    echo "Docker is already installed."
fi

# Determine OS type and set the correct download URL
if [[ "$OSTYPE" == "linux"* ]]; then
    # Linux OS detected
    URL="https://github.com/homecloudhq/homecloud/releases/download/0.0.1/homecloud-linux.zip"
    ZIP_FILE="homecloud-linux.zip"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS detected
    URL="https://github.com/homecloudhq/homecloud/releases/download/0.0.1/homecloud-macos.zip"
    ZIP_FILE="homecloud-macos.zip"
else
    echo "Unsupported OS. Please download HomeCloud manually."
    exit 1
fi

# Download the HomeCloud CLI zip file
echo "Downloading HomeCloud CLI..."
curl -LO $URL

# Unzip the downloaded file
echo "Extracting HomeCloud CLI..."
unzip $ZIP_FILE

# Move the executable to a system path (optional)
echo "Moving executable to /usr/local/bin"
sudo mv homecloud-* /usr/local/bin/homecloud
sudo chmod +x /usr/local/bin/homecloud

echo "HomeCloud CLI has been installed successfully!"
echo "You can now use the 'homecloud' command in the terminal."
