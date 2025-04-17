# build.ps1
$version = "0.0.1"
$commit = git rev-parse --short HEAD

# Create output folder if not exists
if (-Not (Test-Path -Path "dist")) {
    New-Item -ItemType Directory -Path "dist"
}

Write-Host "Building for Windows..."
go build -ldflags "-X github.com/homecloudhq/homecloud/cli/cmd.Version=$version -X github.com/homecloudhq/homecloud/cli/cmd.Commit=$commit" -o dist/homecloud.exe main.go

Write-Host "Building for Linux..."
$env:GOOS = "linux"
$env:GOARCH = "amd64"
go build -ldflags "-X github.com/homecloudhq/homecloud/cli/cmd.Version=$version -X github.com/homecloudhq/homecloud/cli/cmd.Commit=$commit" -o dist/homecloud-linux main.go

Write-Host "Building for macOS (arm64)..."
$env:GOOS = "darwin"
$env:GOARCH = "arm64"
go build -ldflags "-X github.com/homecloudhq/homecloud/cli/cmd.Version=$version -X github.com/homecloudhq/homecloud/cli/cmd.Commit=$commit" -o dist/homecloud-mac main.go

Write-Host "Done!"
