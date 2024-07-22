#!/bin/bash

# Get the absolute path to the script's directory
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Name of the directory we use for the iroh node
IROH_DATA_DIR="iroh_data_dir"

# Clean up on exit
cleanup() {
  echo "Cleaning up..."
  rm -rf "$SCRIPT_DIR/python/$IROH_DATA_DIR"
}

# Trap the EXIT signal to ensure cleanup
trap cleanup EXIT

echo "Running python files"

# Iterate over each file
for file in "$SCRIPT_DIR/python"/*.py; do

    # Change directory to "python" and run the Python file
    echo "Running $file..."
    (cd "$SCRIPT_DIR/python" && python3 "$file")
    status=$?

    if [ $status -ne 0 ]; then
        echo "Error running $file. Exiting..."
        exit $status
    fi

    echo "-----------------------"
done

rm -rf "$SCRIPT_DIR/python/iroh_data_dir"

echo "All Python files executed successfully!"
