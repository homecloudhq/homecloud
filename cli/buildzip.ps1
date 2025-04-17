# Check if the dist folder exists
$distFolder = "dist"
if (-Not (Test-Path -Path $distFolder)) {
    Write-Host "'dist' folder not found. Please ensure you've run the build process first."
    exit
}

# Check if the necessary files are present
$windowsFile = "$distFolder\homecloud-windows.exe"
$linuxFile = "$distFolder\homecloud-linux"
$macosFile = "$distFolder\homecloud-macos"

# Check and zip each platform binary
if (Test-Path $windowsFile) {
    Write-Host "Zipping Windows binary..."
    Compress-Archive -Path $windowsFile -DestinationPath "$distFolder\homecloud-windows.zip"
    Write-Host "homecloud-windows.zip created!"
} else {
    Write-Host "Windows binary (homecloud-windows.exe) not found. Skipping..."
}

if (Test-Path $linuxFile) {
    Write-Host "Zipping Linux binary..."
    Compress-Archive -Path $linuxFile -DestinationPath "$distFolder\homecloud-linux.zip"
    Write-Host "homecloud-linux.zip created!"
} else {
    Write-Host "Linux binary (homecloud-linux) not found. Skipping..."
}

if (Test-Path $macosFile) {
    Write-Host "Zipping macOS binary..."
    Compress-Archive -Path $macosFile -DestinationPath "$distFolder\homecloud-macos.zip"
    Write-Host "homecloud-macos.zip created!"
} else {
    Write-Host "macOS binary (homecloud-macos) not found. Skipping..."
}

Write-Host "Zipping process complete!"
