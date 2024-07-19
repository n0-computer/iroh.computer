#!/bin/bash

# Get the absolute path to the script's directory
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Name of the directory we use for the iroh node
IROH_DATA_DIR="iroh_data_dir"

# Clean up on exit
cleanup() {
  echo "Cleaning up..."
  rm -rf "$SCRIPT_DIR/$IROH_DATA_DIR"
}

# Trap the EXIT signal to ensure cleanup
trap cleanup EXIT

echo "Running Rust files"

# Iterate over each file
for file in "$SCRIPT_DIR/rust"/*.rs; do

    # Change directory to "python" and run the Python file
    filename=$(basename -- "$file")
    filename="${filename%.*}"
    echo "Running $filename..."
    cargo run --bin $filename
    status=$?

    if [ $status -ne 0 ]; then
        echo "Error running $file. Exiting..."
        exit $status
    fi

    echo "-----------------------"
done

rm -r "$SCRIPT_DIR/iroh_data_dir"

echo "All Rust files executed successfully!"
