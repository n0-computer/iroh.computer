
const doc = [
  {
    name: 'docs delete',
    description: 'Delete all document entries below a key prefix.',
    slug: 'docs-delete',
    arguments: [
      { name: "prefix", necessity: 'required', description: "Prefix to delete. All entries whose key starts with or is equal to the prefix will be deleted" }
    ],
    examples: {
      console: `> docs create --switch
2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Active doc is now 2aoukeibc2vdy5n2

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs set key value
bafkr4iagirfesfxon7wneztow6ila3w5mm53jnmcq4sek6nnnxxv7wk6bm

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs del key
Deleting all entries whose key starts with key. Continue? yes
Deleted 1 entries.
Inserted an empty entry for author luo73rdznvupzrjb with key key`,
    }
  },
  {
    name: 'docs drop',
    description: 'Delete an entire document from the local node',
    slug: 'docs-drop',
    arguments: [
      { name: "doc", necessity: 'required', description: "Document to operate on." }
    ],
    examples: {
      console: `> docs create --switch
2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Active doc is now 2aoukeibc2vdy5n2

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs set key value
bafkr4iagirfesfxon7wneztow6ila3w5mm53jnmcq4sek6nnnxxv7wk6bm

> docs drop 2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Deleting a document will permanently remove the document secret key, all document entries,
and all content blobs which are not referenced from other docs or tags.
Delete document 2aoukeibc2vdy5n2? yes
Doc 2aoukeibc2vdy5n2 has been deleted.`,
    }
  },
  {
    name: 'docs export',
    description: 'Export the most recent data for a key from a document',
    slug: 'docs-export',
    examples: {
      console: `> docs create --switch
2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Active doc is now 2aoukeibc2vdy5n2

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs set key value
bafkr4iagirfesfxon7wneztow6ila3w5mm53jnmcq4sek6nnnxxv7wk6bm

> docs drop 2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Deleting a document will permanently remove the document secret key, all document entries,
and all content blobs which are not referenced from other docs or tags.
Delete document 2aoukeibc2vdy5n2? yes
Doc 2aoukeibc2vdy5n2 has been deleted.`,
    }
  },
  {
    name: 'docs get',
    description: 'Get entries in a document.',
    slug: 'docs-get',
    arguments: [
      { name: 'key', necessity: 'required', description: 'Key of the entry to fetch.' },
      { name: 'doc_id', necessity: 'required', description: 'Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also set with `docs set`.' },
      { name: 'prefix', necessity: '', description: 'If true, get all entries that start with key.' },
      { name: 'author', necessity: '', description: 'If provided, only return entries from this author.' },
      { name: 'old', necessity: '', description: 'If true, old entries will be included. By default only the latest value for each key is shown.' },
      { name: 'content', necessity: '', description: 'Also print the content for each entry (but only if smaller than 1MB and valid UTf-8).' }
    ],
    examples: {
      console: `> docs create --switch
dyyelvqqruxjwrlntsdvsksopwznmgnfxpehcsoqckklvqfxar2q
Active doc is now dyyelvqq…

author:fhu3uk4w… doc:dyyelvqq…
> docs set foo bar
@fhu3uk4w…: foo = 6lujp3wx… (3 B)

author:fhu3uk4w… doc:dyyelvqq…
> docs get foo
@fhu3uk4w…: foo = 6lujp3wx… (3 B)
bar

`,
    }
  },
  {
    name: 'docs import',
    description: 'Import data into a document.',
    slug: 'docs-import',
    arguments: [
      { name: 'path', necessity: 'required', description: 'Path to a local file or directory to import. Pathnames will be used as the document key' },
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also be set with `docs switch`.' },
      { name: 'author', necessity: 'required', description: 'Author of the entry. Required unless the author is set through the IROH_AUTHOR environment variable. Within the Iroh console, the active author can also be set with `author switch`.' },
      { name: 'prefix', necessity: '', description: 'If true, get all entries that start with key.' },
      { name: 'in place', necessity: '', description: ' If true, don\'t copy the file into iroh, reference the existing file instead, Moving a file imported with `in-place` will result in data corruption' },

    ],
    examples: {
      console: `> docs create --switch
dyyelvqqruxjwrlntsdvsksopwznmgnfxpehcsoqckklvqfxar2q
Active doc is now dyyelvqq…

author:fhu3uk4w… doc:dyyelvqq…
> docs import ~/foo.txt --prefix bar
@fhu3uk4w…: bar/foo.txt = 6lujp3wx… (3 B)

author:fhu3uk4w… doc:dyyelvqq…
> docs get foo
@fhu3uk4w…: foo = 6lujp3wx… (3 B)
bar

`,
    }
  },
  {
    name: 'docs join',
    description: 'Join a document from a ticket.',
    slug: 'docs-join',
    arguments: [
      { name: 'ticket', necessity: 'required', description: 'The ticket to join a document. Create a ticket with \'docs share\'.' },
      { name: 'switch', necessity: '', description: 'Switch to the joined document (only in the iroh console).'}
    ],
    examples: {
      console: `> docs join --switch 6tcadaassjgjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mxvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhlfzyvlqcai55pmzg4d3x34mcpuydxoq4t5ec66zp3k3ouxwadxky745i3dwrhqcig3rqqdifkjjb3drfbo2krc7l3anoqly5wanom756kxmrqnap
tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua`,
    }
  },
  {
    name: 'docs keys',
    description: 'List all keys in a document.',
    slug: 'docs-keys',
    arguments: [
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOC environment variable. Within the iroh console, the active document can also set with `docs set`.'  },
      { name: 'prefix', necessity: 'optional', description: 'Only list keys that start with prefix.' },
      { name: 'author', necessity: 'optional', description: 'Filter by author.' },
    ],
    examples: {
      console: `author:i3vpd4e7… doc:njszszvg…
> docs set foo bar
bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu

author:i3vpd4e7… doc:njszszvg…
> docs set hello world
bafkr4igxrffos4lnhdjn7lioyvkcjsrsd3qsiu6vd4ntvxvxpuchl3myrq

author:i3vpd4e7… doc:njszszvg…
> docs set good morning
bafkr4idyxc27uxtcrzl5a3t42xu7hm3h2wn4mfaqt3ma5ummofsitynxle

author:i3vpd4e7… doc:njszszvg…
> docs keys
@i3vpd4e7…: foo = 6lujp3wx… (3 B)
@i3vpd4e7…: good = pc4ll6s6… (7 B)
@i3vpd4e7…: hello = 26euv2lr… (5 B)

# use a prefix to filter the keys

author:i3vpd4e7… doc:njszszvg…
> docs keys fo
@i3vpd4e7…: foo = 6lujp3wx… (3 B)`,
    }
  },
  {
    name: 'docs list',
    description: 'List documents on this node.',
    slug: 'docs-list',
    examples: {
      console: `> docs list
      tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua
      3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
      njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq`,
    }
  },
  {
    name: 'docs create',
    description: 'Create a new blank document.',
    slug: 'docs-create',
    examples: {
      console: `> docs create
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea`,
    }
  },
  {
    name: 'docs set',
    description: 'Set an entry in a document',
    slug: 'docs-set',
    arguments: [
      { name: "key", necessity: 'required', description: "Key to the entry (parsed as UTF-8 string)." },
      { name: "value", necessity: 'required', description: "Content to store for this entry (parsed as UTF-8 string)." },
      { name: "author", necessity: 'required', description: "Author of this entry. Required unless the author is set through the console or the IROH_AUTHOR environment variable." },
    ],
    examples: {
      console: `> docs create --switch
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

> set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`,
      cli: `# create an author if you haven't already
$ IROH_AUTHOR=$(iroh authors create)

# create a document
$ iroh docs create
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

# set a key
$ iroh docs 674deec7a19fec50fd6f486a5eef20509073ecf7c527b60a27c84baea90d3816 set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`
    }
  },
  {
    name: 'docs share',
    description: 'Share a document with peers.',
    slug: 'docs-share',
    arguments: [
      { name: 'mode', necessity: 'required', description: 'One of \'read\' for Read-only access or \'write\' for Write access.' },
      { name: 'doc', necessity: 'required', description: 'Document to share. In the console the current document is used when no `--doc` is provided.' }
    ],
    examples: {
      console: `# switch to a specific doc
> docs switch njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq
Active doc is now njszszvg…

doc: njszszvg…

> docs share write
xvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhlfzyvlqcaidiaglyldhfvq4xeaa5cqswdistl2hje3c24biacig3rqqdifkjjb3drfbo2krc7l3anoqly5wanom756kxmrqnap6tcadaassjgjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mprsyystlwe66cs

# or use --doc flag to get the ticket for a specific doc
> docs share write --doc 3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
gjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mprsyystlwe66csxvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhljfkldiajjkannnnjiejfkldkaskjlxi0jfwoqppiemxclpilkdipljqhixkkwmhziufkhablskhdjjlllqwoooqusiuypwouuuuippmjkk
  ` }
  },
  {
    name: 'docs switch',
    description: 'Set the active document (only works within the Iroh console).',
    slug: 'docs-switch',
    arguments: [
      { name: 'id', necessity: 'required', description: 'The [identifier](/docs/layers/documents#document-identifiers) of the document to switch to.' },
    ],
    examples: {
      console: `> docs create
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

> docs switch ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

doc:ktrygcpx
>`,
    }
  },
  {
    name: 'docs watch',
    description: 'Watch for changes and events on a document',
    slug: 'docs-watch',
    arguments: [
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOCS environment variable. Within the iroh console, the active document can also set with `docs set`.'  }
    ],
    examples: {
      console: `author:i3vpd4e7… doc:njszszvg…
  > docs set foo bar
  bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu

  > docs watch
  # events will show up here!`,
    }
  }

]

const author = [
  {
    name: 'authors switch',
    description: 'Set the active author for doc insertion (only works within the console).',
    slug: 'authors-switch',
    arguments: [
      { name: 'id', necessity: 'required', description: 'Id of the author to switch to.' }
    ],
    examples: {
      console: `# switch from one active author to another
author:i3vpd4e7…
> authors switch wkl4cgrykxvcvr6pjnbvymrzm7h4je7d4ztszp35xfnk2rnflcxq
Active author is now wkl4cgry…

author:wkl4cgry…
>`,
    }
  },
  {
    name: 'authors list',
    description: 'List authors.',
    slug: 'authors-list',
    examples: {
      console: `> authors list
i3vpd4e7coeonwv6otni36bdux73opig5du6zjekvnl3c64gn4ua
wkl4cgrykxvcvr6pjnbvymrzm7h4je7d4ztszp35xfnk2rnflcxq`,
    }
  },
  {
    name: 'authors create',
    description: 'Create a new author.',
    slug: 'authors-create',
    arguments: [
      { name: 'switch', necessity: '', description: 'Switch to the created author (only in the iroh console).' }
    ],
    examples: {
      console: `> authors create --switch
2rkuvpk4prtjbqh7rnksaet3a3hdvrrz5mqinjcjbutklotort5a
Active author is now 2rkuvpk4…

author:2rkuvpk4…
>`,
    }
  }
]

const blob = [
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
      console: '> blobs add'
    }
  },
  {
    name: 'blobs get',
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
      console: '> blobs get'
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
      console: '> blobs export'
    }
  },
  {
    name: 'blobs list blobs',
    description: 'List the available blobs on the running provider',
    slug: 'blobs-list-blobs',
    arguments: [],
    examples: {
      console: '> blobs list blobs'
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
      console: '> blobs list collections'
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
      console: '> blobs delete blob'
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
      console: '> blobs share'
    }
  }
]

const api = {
  doc,
  author,
  blob
};

export default api;
