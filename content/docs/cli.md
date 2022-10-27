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
$ iroh --help
A next generation IPFS implementation: https://iroh.computer

Usage: iroh [OPTIONS] <COMMAND>

Commands:
  p2p     Peer-2-peer commands
  add     Add a file or directory to iroh & make it available on IPFS
  get     Fetch IPFS content and write it to disk
  start   Start local iroh services
  status  Check the health of the different iroh services
  stop    Stop local iroh services
  help    Print this message or the help of the given subcommand(s)

Options:
      --cfg <CFG>
      --no-metrics  Do not track metrics
  -h, --help        Print help information
  -V, --version     Print version information
```

Iroh is a next-generation implementation the Interplanetary File System (IPFS). IPFS is a networking protocol for exchanging content-addressed blocks of immutable data. 'content-addressed' means referring to data by the hash of it's content, which makes the reference both unique and verifiable. These two properties make it possible to get data from any node in the network that speaks the IPFS protocol, including IPFS content being served by other implementations of the protocol.

## iroh p2p
```
$ iroh p2p --help
Peer-2-peer commands

Usage: iroh p2p <COMMAND>

Commands:
  connect  Connect to a peer
  lookup   Retrieve info about a node
  peers    List connected peers
  help     Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help information
  -V, --version  Print version information
```
P2p commands all relate to peer-2-peer connectivity.

## iroh p2p connect
```
$ iroh p2p connect --help
Connect to a peer

Usage: iroh p2p connect <ADDR>

Arguments:
  <ADDR>  Multiaddr or peer ID of a peer to connect to

Options:
  -h, --help     Print help information
  -V, --version  Print version information
```

Attempts to open a new direct connection to a peer address. By default p2p continulously maintains an open set of peer connections based on requests & internal hueristics. Connect is useful in situations where it makes sense to manually force libp2p to dial a known peer. A common example includes when you know the multiaddr or peer ID of a peer that you would like to exchange data with.

The address format is in multiaddr format. For example:
```
 > iroh p2p connect /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

For more info on multiaddrs see [multiaddrs](./docs/concepts#multiaddr)

If a peer ID is provided, connect first perform a distribtued hash table (DHT) lookup to learn the address of the given peer ID before dialing.

## iroh p2p lookup
```
$ iroh p2p lookup --help
Retrieve info about a node

Usage: iroh p2p lookup [ADDR]

Arguments:
  [ADDR]  multiaddress or peer ID

Options:
  -h, --help     Print help information
  -V, --version  Print version information
```

Takes as input a peer ID or address and prints the output of the libp2p-identify protocol. When provided with a peer ID, the address is looked up on the Network's Distributed Hash Table (DHT) before connecting to the node. When provided with a multiaddress, the connection is dialed directly.

Providing no <ADDR> argument will return your local node information.

lookup will output 6 types of the info about the peer:

* **Peer ID** the identifier of the peer
* **Agent Version** software identifier similar to a web browser's user agent
* **Protocol Version** broad identifier for the peer & it's network
* **Observed Addresses**  -** the peer's best guess at it's own public address(es) based on feedback from other peers
* **Listening Addresses** address this peer is listening for connections on
* **Protocols** identifiers for protocols this peer speaks

This command is a direct port of [libp2p-lookup](https://github.com/mxinden/libp2p-lookup) by mxinden.

## iroh p2p peers
```
List connected peers

Usage: iroh p2p peers

Options:
  -h, --help     Print help information
  -V, --version  Print version information
```

`p2p peers` lists the set of peer addresses this node is currently connected to. The address format is a multiaddress, or 'multiaddr' for short. For example:
```
  /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

The last element after the '/' is the Peer Identifier or 'PeerID'. Either the PeerID or the entire multiaddr can be given to the 'p2p lookup' command for additional details about the peer. For example:

```
  > iroh p2p lookup QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
  > iroh p2p lookup /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

## iroh add
```
$ iroh add --help
Add a file or directory to iroh & make it available on IPFS

Usage: iroh add [OPTIONS] <PATH>

Arguments:
  <PATH>  The path to a file or directory to be added

Options:
  -r, --recursive  Required to add a directory
      --no-wrap    Do not wrap added content with a directory
      --offline    Don't provide added content to the network
  -h, --help       Print help information
  -V, --version    Print version information
```

**WARNING: IROH CURRENTLY PROVIDES NO WAY TO REMOVE CONTENT ONCE ADDED.** This will be addressed in a future release. 

Add copies the file or directory specified by <PATH> into the iroh store, splitting the input file into a tree of immutable blocks. Each block is labeled by the hash of its content. The final output of the add command is the hash of the root of the tree, which contains references to all other blocks:
```
  > iroh add cat.jpg
  [1/2] Calculating size...
  [2/2] Importing content 643 B...
  /ipfs/bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q
```
The 'bafybei...' text after /ipfs/ is a Content IDentifier (or CID). The CID for  different things will always be a different set of characters. Once content is in IPFS, we refer to it by the CID. The opposite of the add command is the get  command, which accepts a CID and turns it back into files or directories:
```
  > iroh get /ipfs/bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q
  Saving file(s) to bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q
```
This will create a directory with our cat image inside. We can also make this a little nicer for humans by getting just the cat picture:
```
  > iroh get /ipfs/bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q/cat.jpg cat.jpg
```
The stored result of add is a 'MerkleDAG'. Merkle proofs (hashes) are a fast method of proving and checking data inclusion, and the tree formed by chunking the input into blocks is always a directed acyclic graph (DAG). These MerkleDAGs can be provably checked for tamper resistance by anyone who fetches all blocks in the tree, which means MerkleDAGs can be provided by anyone, without concern for tampering.
By default all content added to iroh is available to the configured network, and the default network is the public IPFS network. We can use a HTTPS gateway  hosted at https://gateway.lol to fetch the content from our local node:
```
  > curl https://gateway.lol/ipfs/bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q/cat.jpg
```

**Implementation Interop:**
Iroh does *not* produce the same hashes as other IPFS implementations when given the same data. Iroh & other valid implementations can read each other's data, but if given the same file, Iroh will almost certianly produce a different hash value.

## iroh get
```
Fetch IPFS content and write it to disk

Usage: iroh get <IPFS_PATH> [OUTPUT]

Arguments:
  <IPFS_PATH>  CID or CID/with/path/qualifier to get
  [OUTPUT]     filesystem path to write to. Optional and defaults to $CID

Options:
  -h, --help     Print help information
  -V, --version  Print version information
```
Download file or directory specified by <ipfs-path> from IPFS into [ path ]. If path already exists and is a file then it's overwritten with the new downloaded file. If path already exists and is a directory, the command fails with an error. If path already exists, is a file and the downloaded data is a directory, that's an error.

By default, the output will be written to the working directory. If no file or directory name can be derived from the <ipfs-path>, the output will be written to the given path's CID.

If <ipfs-path> is already present in the iroh store, no network call will be made.

## iroh start
```
Start local iroh services

Usage: iroh start [OPTIONS] [SERVICE]...

Arguments:
  [SERVICE]...

Options:
  -a, --all      Start all services
  -h, --help     Print help information
  -V, --version  Print version information
```

Iroh start kicks off 'daemons' on your local machine: long-running processes that make iroh work. Iroh requires a running daemon to do anything meaningful like get or add content, and `iroh start` is the fastest way to get iroh up & running locally

Use the start, stop, and status commands to monitor iroh on your local machine, and control it's uptime. start runs daemons in the background, so there's no need to keep your terminal open after running start. Once running, stop iroh with `iroh stop`.

Daemons provide 'services'. Services work together to fullfill requests. There are three services:

1. **storage** a database of IPFS content
2. **p2p** peer-2-peer networking functionality
3. **gateway** bridge the IPFS network to HTTP

By default iroh start spins up storage & gateway services. Start the p2p service with `iroh start p2p`.  To learn more about each service, see [services](/docs/services)

Iroh start is by no means the only way to get iroh up & running. Long running local deployments should be scheduled by your operating systems daemon supervisior, and cloud deployments should invoke daemon binaries directly. Regardless of how iroh is started, you can always use `iroh status` to monitor service health.

## iroh status
```
Check the health of the different iroh services

Usage: iroh status [OPTIONS]

Options:
  -w, --watch    when true, updates the status table whenever a change in a process's status occurs
  -h, --help     Print help information
  -V, --version  Print version information
```

status reports the current operational setup of iroh. Use status as a go-to
command for understanding where iroh commands are being processed. different
ops configurations utilize different network and service implementations
under the hood, which can lead to varying performance characteristics.

Service status can be in one of four states:
```

  Down:         The service is not currently running, or is
                not configured to connect to the proper port.

  Serving:      The service is running & healthy

  Not Serving:  The service is running, but unhealthy.

  Unknown:      The service is in an unknown state.
                This should not happen.
```
Use the --watch flag to continually poll for changes.

Status reports no metrics about the running system aside from current service health. Instead all metrics are emitted through uniform tracing collection & reporting, which is intended to be consumed by tools like prometheus and grafana. For more info on metrics collection, see [metrics](/docs/metrics)

## iroh stop
```
Stop local iroh services

Usage: iroh stop [SERVICE]...

Arguments:
  [SERVICE]...

Options:
  -h, --help     Print help information
  -V, --version  Print version information
```
stop turns local iroh services off by killing daemon processes. There are three iroh services, each backed by a daemon:
```
   storage  -  a database of IPFS content
   p2p      -  peer-2-peer networking functionality
   gateway  -  bridge the IPFS network to HTTP
```
By default `iroh stop` attempts to stop all three services. To stop specific services, provide service names as arguments, eg: `iroh stop p2p`.

When a deamon starts it creates a lockfile and writes it's process identifier (PID) to the lock. Iroh stop uses this lock to lookup the process & send an interrupt signal to the daemon, which halts the service. Stop will also try to clean up any stray lock files in the even that a program crash fails to remove the lockfile from the file system.

Stop only works for local processes, and cannot be used to interact with remote services.