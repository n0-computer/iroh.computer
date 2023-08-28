+++
title = "cli"
description = "iroh command line interface"
template="docs/page.html"
[extra]
section="iroh"
+++

# CLI Commands
Iroh has a single command line interface, common to all platforms & distributions.


## iroh
```
Send data.

Usage: iroh [OPTIONS] <COMMAND>

Commands:
  provide     Serve the data from the given path
  list        List hashes
  validate    Validate hashes
  shutdown    Shutdown provider
  id          Identify provider
  add         Add data from the given path
  get         Fetch the data from the hash
  get-ticket  Fetch the data using a ticket for all provider information and authentication.
  addresses   List addresses
  help        Print this message or the help of the given subcommand(s)

Options:
      --keylog   Log SSL pre-master key to file in SSLKEYLOGFILE environment variable
  -h, --help     Print help
  -V, --version  Print version
```

## iroh provide
```
Serve the data from the given path

Usage: iroh provide [OPTIONS] [PATH]

Arguments:
  [PATH]

Options:
  -a, --addr <ADDR>              Optional listening address, defaults to 127.0.0.1:4433
      --auth-token <AUTH_TOKEN>  Auth token, defaults to random generated
      --rpc-port <RPC_PORT>      Optional rpc port, defaults to 4919. Set to 0 to disable RPC [default: 4919]
  -h, --help                     Print help
```

## iroh list
```
List hashes

Usage: iroh list [OPTIONS]

Options:
      --rpc-port <RPC_PORT>  Optional rpc port, defaults to 4919 [default: 4919]
  -h, --help
```

## iroh shutdown
```
Shutdown provider

Usage: iroh shutdown [OPTIONS]

Options:
      --force                Shutdown mode. Hard shutdown will immediately terminate the process, soft shutdown will wait for all connections to close
      --rpc-port <RPC_PORT>  Optional rpc port, defaults to 4919 [default: 4919]
  -h, --help
```

## iroh id
```
Identify provider

Usage: iroh id [OPTIONS]

Options:
      --rpc-port <RPC_PORT>  Optional rpc port, defaults to 4919 [default: 4919]
  -h, --help
```

## iroh add
```
Add data from the given path

Usage: iroh add [OPTIONS] <PATH>

Arguments:
  <PATH>  The path to the file or folder to add

Options:
      --rpc-port <RPC_PORT>  Optional rpc port, defaults to 4919 [default: 4919]
  -h, --help                 Print help
```

## iroh get
```
Fetch the data from the hash

Usage: iroh get [OPTIONS] --peer <PEER> --auth-token <AUTH_TOKEN> <HASH>

Arguments:
  <HASH>  The root hash to retrieve

Options:
  -p, --peer <PEER>              PeerId of the provider
      --auth-token <AUTH_TOKEN>  The authentication token to present to the server
  -a, --addr <ADDR>              Optional address of the provider, defaults to 127.0.0.1:4433
  -o, --out <OUT>                Optional path to a new directory in which to save the file(s). If none is specified writes the data to STDOUT
  -h, --help
```


## iroh get-ticket
```
Fetches some data from a ticket,

The ticket contains all hash, authentication and connection information to connect to the provider.  It is a simpler, but slightly less flexible alternative to the `get` subcommand.

Usage: iroh get-ticket [OPTIONS] <TICKET>

Arguments:
  <TICKET>
          Ticket containing everything to retrieve a hash from provider

Options:
  -o, --out <OUT>
          Optional path to a new directory in which to save the file(s). If none is specified writes the data to STDOUT

  -h, --help
          Print help (see a summary with '-h')
```

## iroh addresses
```
List addresses

Usage: iroh addresses [OPTIONS]

Options:
      --rpc-port <RPC_PORT>  Optional rpc port, defaults to 4919 [default: 4919]
  -h, --help
```
