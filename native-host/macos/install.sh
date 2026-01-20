#!/bin/bash

echo "========================================"
echo "Installing Weaverse Navigator (macOS)"
echo "========================================"
echo ""

# Get current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Chrome NativeMessagingHosts directory
MANIFEST_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"

# Create directory if not exists
mkdir -p "$MANIFEST_DIR"

# Create temporary manifest with updated path
sed "s|REPLACE_PATH|$DIR/host.sh|g" "$DIR/manifest.json" > "$MANIFEST_DIR/com.weaverse.navigator.json"

# Make host.sh executable
chmod +x "$DIR/host.sh"

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Native Host has been registered with Chrome."
echo "You can now use Weaverse Navigator extension."
echo ""
