#!/bin/bash

# Get the absolute path to the script's directory
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Name of the directory we use for the iroh node
IROH_DATA_DIR="iroh_data_dir"

# List of file names without extensions
files=(
    "author-list"
    "author-new"
    "blob-add"
    "blob-list-blobs"
    "blob-list-collections"
    "blob-list-incomplete-blobs"
    # "doc-delete"
    "doc-drop"
    "doc-export"
    "doc-get"
    "doc-import"
    "doc-join"
    "doc-keys"
    "doc-list"
    "doc-new"
    "doc-set"
    "doc-share"
    "doc-watch"
)

# Clean up on exit
cleanup() {
  echo "Cleaning up..."
  rm -rf "$SCRIPT_DIR/go/$IROH_DATA_DIR"
  rm -rf "$SCRIPT_DIR/python/$IROH_DATA_DIR"
}

# Trap the EXIT signal to ensure cleanup
trap cleanup EXIT

# Iterate over each file
for file in "${files[@]}"; do
    # Change directory to "go" and run the Go file
    echo "Running $file.go..."
    (cd "$SCRIPT_DIR/go" && go run "$file.go")
    status=$?

    if [ $status -ne 0 ]; then
        echo "Error running $file.go. Exiting..."
        exit $status
    fi

    echo "-----------------------"

    # Change directory to "python" and run the Python file
    echo "Running $file.py..."
    (cd "$SCRIPT_DIR/python" && python3 "$file.py")
    status=$?

    if [ $status -ne 0 ]; then
        echo "Error running $file.py. Exiting..."
        exit $status
    fi

    echo "-----------------------"
done

rm -r "$SCRIPT_DIR/python/iroh_data_dir"
rm -r "$SCRIPT_DIR/go/iroh_data_dir"

echo "All Go and Python files executed successfully!"
