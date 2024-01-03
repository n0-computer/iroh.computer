# iroh API code examples

This directory includes all the code examples that show how to achieve `iroh` cli commands programmatically using rust, golang, and python.

## running the examples

There is a `run_files.sh` bash script that will run all of the python and golang examples. The following sections will describe how to set up the golang and python environments to run the script correctly.

You can also run the individual examples without using the `run_files.sh` script.

### running python

Download python3 and download some way to manage virtual environments. pip will likely come with python, but if not, download pip3 as well.

Navigate into the `python` directory.

Create and activate a virtual environment for this project.

Install iroh:
`python3 -m pip install iroh`

To run an example, eg for file `author-list.py`:
`python3 run author-list.py`

### running golang

Download & set up go.

Navigate to the go directory.

Run the following commands:
```
$ go get github.com/n0-computer/iroh-ffi/iroh-go/iroh
$ git submodule add https://github.com/n0-computer/iroh-ffi.git extern/iroh-ffi
$ make -f extern/iroh-ffi/InstallGo
$ go mod edit -replace=github.com/n0-computer/iroh-ffi/iroh-go=./extern/iroh-ffi/iroh-go
```

To run an example, eg for the file `author-list.py`:
`go run author-list.py`

### running the script
Once the above are set up, run the `run_files.sh` script to iterate through each go and python file to ensure that the examples work!
