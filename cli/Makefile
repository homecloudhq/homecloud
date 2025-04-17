VERSION := 0.0.1
COMMIT := $(shell git rev-parse --short HEAD)

all: build-linux build-mac build-windows

build-linux:
	GOOS=linux GOARCH=amd64 go build -ldflags "-X github.com/homecloudhq/homecloud/cli/cmd.Version=$(VERSION) -X github.com/homecloudhq/homecloud/cli/cmd.Commit=$(COMMIT)" -o dist/homecloud-linux main.go

build-mac:
	GOOS=darwin GOARCH=arm64 go build -ldflags "-X github.com/homecloudhq/homecloud/cli/cmd.Version=$(VERSION) -X github.com/homecloudhq/homecloud/cli/cmd.Commit=$(COMMIT)" -o dist/homecloud-mac main.go

build-windows:
	GOOS=windows GOARCH=amd64 go build -ldflags "-X github.com/homecloudhq/homecloud/cli/cmd.Version=$(VERSION) -X github.com/homecloudhq/homecloud/cli/cmd.Commit=$(COMMIT)" -o dist/homecloud.exe main.go

clean:
	rm -rf dist
