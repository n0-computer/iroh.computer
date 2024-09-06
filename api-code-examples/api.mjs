

const blobs = [
  {
    name: 'blobs add',
    description: 'Add data from PATH to the running node',
    slug: 'blobs-add',
    arguments: [
      {
        name: 'source',
        necessity: 'required',
        description: 'Path to a file or folder'
      },
      {
        name: 'in-place',
        necessity: '',
        description: 'Add in place'
      },
      {
        name: 'tag',
        necessity: '',
        description: 'Tag to tag the data with'
      },
      {
        name: 'wrap',
        necessity: '',
        description: 'Wrap the added file or directory in a collection'
      },
      {
        name: 'filename',
        necessity: '',
        description: 'Override the filename used for the entry in the created collection'
      },
      {
        name: 'no-ticket',
        necessity: '',
        description: 'Do not print the all-in-one ticket to get the added data from this node'
      }
    ],
    examples: {
      console: `> blobs add ~/my_txt.txt
Adding my_txt.txt as /Users/me/my_txt.txt...
- /Users/me/my_txt.txt: 328 B bafkr4igef2yiz2nz33tljfdezzr45cos5lnc2urjmfi6zghbsnfzvpdpa4
Total: 328 B

Collection: bafkr4ie3xsx3vdsbflainnk6p4xs4h2hq3hdmuasuoflkgybvnsbljb3ke`
    }
  },
  {
    name: 'blobs download',
    description: 'Download data to the running node\'s database and provide it',
    slug: 'blobs-get',
    arguments: [
      {
        name: 'ticket or hash',
        necessity: 'required',
        description: 'Ticket or Hash to use'
      },
      {
        name: 'address',
        necessity: '',
        description: 'Additional socket address to use to contact the node. Can be used multiple times'
      },
      {
        name: 'relay-url',
        necessity: '',
        description: 'Override the relay URL to use to contact the node'
      },
      {
        name: 'recursive',
        necessity: '',
        description: 'Override to treat the blob as a raw blob or a hash sequence'
      },
      {
        name: 'override-addresses',
        necessity: '',
        description: 'If set, the ticket\'s direct addresses will not be used'
      },
      {
        name: 'node',
        necessity: '',
        description: 'NodeId of the provider'
      },
      {
        name: 'out',
        necessity: '',
        description: 'Directory or file in which to save the file(s)'
      },
      {
        name: 'stable',
        necessity: '',
        description: 'If set, the data will be moved to the output directory, and iroh will assume that it will not change'
      },
      {
        name: 'tag',
        necessity: '',
        description: 'Tag to tag the data with'
      },
      {
        name: 'queued',
        necessity: '',
        description: 'If set, will queue the download in the download queue'
      }
    ],
    examples: {
      console: `> blobs get his7xcvl5jc734mwbtgtkkvxeafrdcitmg2jvdmxk7ri7abgr33a --address 192.168.0.15:41918 --node w3mj2iw47i2pgbdrnutaamsqm6h2bj6r7yp7h2vliruq3vry535a
Fetching: his7xcvl5jc734mwbtgtkkvxeafrdcitmg2jvdmxk7ri7abgr33a
Transferred 14.20 KiB in 0 seconds, 173.20 KiB/s`
    }
  },
  {
    name: 'blobs export',
    description: 'Export a blob from the internal blob store to the local filesystem',
    slug: 'blobs-export',
    arguments: [
      {
        name: 'hash',
        necessity: 'required',
        description: 'The hash to export'
      },
      {
        name: 'out',
        necessity: 'required',
        description: 'Directory or file in which to save the file(s)'
      },
      {
        name: 'recursive',
        necessity: '',
        description: 'Set to true if the hash refers to a collection and you want to export all children of the collection'
      },
      {
        name: 'stable',
        necessity: '',
        description: 'If set, the data will be moved to the output directory, and iroh will assume that it will not change'
      }
    ],
    examples: {
      console: '> blobs export his7xcvl5jc734mwbtgtkkvxeafrdcitmg2jvdmxk7ri7abgr33a ./very_important.txt'
    }
  },
  {
    name: 'blobs list blobs',
    description: 'List the available blobs on the running provider',
    slug: 'blobs-list-blobs',
    arguments: [],
    examples: {
      console: `> blobs list blobs
 bafkr4idcy33utsake6atvbagnojkn7odp7mdo6n7tvspd4ndnewphj67xu (116.96 KiB)
 bafkr4idyxc27uxtcrzl5a3t42xu7hm3h2wn4mfaqt3ma5ummofsitynxle (7 B)
 bafkr4ie3xsx3vdsbflainnk6p4xs4h2hq3hdmuasuoflkgybvnsbljb3ke (46 B)
 bafkr4igef2yiz2nz33tljfdezzr45cos5lnc2urjmfi6zghbsnfzvpdpa4 (328 B)
 bafkr4igxrffos4lnhdjn7lioyvkcjsrsd3qsiu6vd4ntvxvxpuchl3myrq (5 B)
 bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu (3 B)
 bafkr4ih5e75yrvu63folnkhvppj3pnx3he2oudmr35x2xc2puodrr2kryy (47 B)`,
    }
  },
  {
    name: 'blobs list incomplete-blobs',
    description: 'List the blobs on the running provider that are not full files',
    slug: 'blobs-list-incomplete-blobs',
    arguments: [],
    examples: {
      console: '> blobs list incomplete-blobs'
    }
  },
  {
    name: 'blobs list collections',
    description: 'List the available collections on the running provider',
    slug: 'blobs-list-collections',
    arguments: [],
    examples: {
      console: `> blobs list collections
"auto-2024-08-20T17:49:54.244Z": myumj2a42x6ky72erzt4djhu3ya46h2e7sp4ibqzew2ne4xnbpua 3 blobs (0 B)`
    }
  },
  {
    name: 'blobs validate',
    description: 'Validate hashes on the running node',
    slug: 'blobs-validate',
    arguments: [
      {
        name: 'verbose',
        necessity: '',
        description: ''
      },
      {
        name: 'repair',
        necessity: '',
        description: 'Repair the store by removing invalid data'
      }
    ],
    examples: {
      console: '> blobs validate'
    }
  },
  {
    name: 'blobs consistency-check',
    description: 'Perform a database consistency check on the running node',
    slug: 'blobs-consistency-check',
    arguments: [
      {
        name: 'verbose',
        necessity: '',
        description: ''
      },
      {
        name: 'repair',
        necessity: '',
        description: 'Repair the store by removing invalid data'
      }
    ],
    examples: {
      console: '> blobs consistency-check'
    }
  },
  {
    name: 'blobs delete blob',
    description: 'Delete the given blobs',
    slug: 'blobs-delete-blob',
    arguments: [
      {
        name: 'hash',
        necessity: 'required',
        description: 'Blobs to delete'
      }
    ],
    examples: {
    }
  },
  {
    name: 'blobs share',
    description: 'Get a ticket to share this blob',
    slug: 'blobs-share',
    arguments: [
      {
        name: 'hash',
        necessity: 'required',
        description: 'Hash of the blob to share'
      },
      {
        name: 'addr-options',
        necessity: '',
        description: 'Options to configure the address information in the generated ticket'
      },
      {
        name: 'recursive',
        necessity: '',
        description: 'If the blob is a collection, the requester will also fetch the listed blobs'
      }
    ],
    examples: {
      console: `> blobs share myumj2a42x6ky72erzt4djhu3ya46h2e7sp4ibqzew2ne4xnbpua
Ticket for blob myumj2a42x6ky72erzt4djhu3ya46h2e7sp4ibqzew2ne4xnbpua (96 B)
blobac3nrhjc3t5dj4yeofwsmabskbty7ifh2h7b747kvncgsdowhdxpuaaaabtcrrhidtk7zld7ishgpqne6tpadty7it6j7ragdes3juts5uf6q`
    }
  }
]

const net = [
  {
    name: 'net remote-list',
    description: 'Get information about the different remote nodes',
    slug: 'net-remote-list',
    arguments: [],
    examples: {
      console: `> net remote-list
 current time: Tue, 20 Aug 2024 21:30:33 +0000

 node id                                               relay  conn type  latency    last used 
 ewrl7gvv6ndtqmtvd2s6tmblvcah3yl7mn4wyyftem7dtjkrlbvq         direct     1ms,527μs  3s`
    }
  },
  {
    name: 'net remote',
    description: 'Get information about a particular remote node',
    slug: 'net-remote',
    arguments: [
      {
        name: 'node_id',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: `> net remote ewrl7gvv6ndtqmtvd2s6tmblvcah3yl7mn4wyyftem7dtjkrlbvq
 current time     Tue, 20 Aug 2024 21:30:50 +0000                      
 node id          ewrl7gvv6ndtqmtvd2s6tmblvcah3yl7mn4wyyftem7dtjkrlbvq 
 relay url        unknown                                              
 connection type  direct                                               
 latency          1ms,527μs                                            
 last used        3s                                                   
 known addresses  1                                                    

 addr                latency     last control  last data  last alive 
 192.168.0.15:11204  1ms,527μs   ping← ( 3s )  3s         3s         `
    }
  },
  {
    name: 'net node-addr',
    description: 'Get the node addr of this node',
    slug: 'net-node-addr',
    arguments: [],
    examples: {
      console: `> net node-addr
Node ID: w3mj2iw47i2pgbdrnutaamsqm6h2bj6r7yp7h2vliruq3vry535a
Home Relay: https://foo.bar/
Direct Addresses (1):
 192.168.0.15:41918`
    }
  },
  {
    name: 'net add-node-addr',
    description: 'Add this node addr to the known nodes',
    slug: 'net-add-node-addr',
    arguments: [
      {
        name: 'node_id',
        necessity: 'required',
        description: ''
      },
      {
        name: 'relay',
        necessity: 'required',
        description: ''
      },
      {
        name: 'addresses',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: '> net add-node-addr dlwnphjvqn43cyywsurzmr46i5cpg56ox5xhsqyq2jddly3o5m5q  https://foo.bar/ 192.168.0.15:1120'
    }
  },
  {
    name: 'net home-relay',
    description: 'Get the relay server we are connected to',
    slug: 'net-home-relay',
    arguments: [],
    examples: {
      console: `> net home-relay
Home Relay: https://foo.bar/`
    }
  }
]


const api = {
  net,
  docs,
  authors,
  tags,
  blobs
};

export default api;
