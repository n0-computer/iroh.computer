
const doc = [
  {
    name: 'doc switch',
    description: 'Set the active document (only works within the Iroh console)',
    slug: 'doc-switch',
    arguments: [
      { name: 'ID', necessity: 'required', description: 'the [identifier](/docs/layers/documents#document-identifiers) of the document to switch to' },
    ],
    examples: {
      console: `> doc init
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

> doc switch ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

doc:ktrygcpx
>`,
    }
  },
  {
    name: 'doc init',  
    description: 'Create a new document',
    slug: 'doc-init',
    examples: {
      console: `> doc init
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea`,
    }
  },
  {
    name: 'doc join',  
    description: 'Join a document from a ticket',
    slug: 'doc-join',
    arguments: [
      { name: 'TICKET', necessity: 'required', description: 'the ticket to join a document. Create a ticket with \'doc share\'' }
    ],
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc list',  
    description: 'List documents on this node',
    slug: 'doc-list',
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc share', 
    description: 'Share a document with peers',
    slug: 'doc-share',
    arguments: [
      { name: 'MODE', necessity: 'required', description: 'one of \'read\' for Read-only access or \'write\' for Write access' },
      { name: 'DOC_ID', necessity: 'required', description: 'document to share. in the console the current document is used when no DOC_ID is provided' }
    ],
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc set',   
    description: 'Set an entry in a document',
    slug: 'doc-set',
    arguments: [
      { name: "KEY", necessity: 'required', description: "Key to the entry (parsed as UTF-8 string)" },
      { name: "VALUE", necessity: 'required', description: "Content to store for this entry (parsed as UTF-8 string)" },
      { name: "author", necessity: 'required', description: "Author of this entry. Required unless the author is set through the console or the IROH_AUTHOR environment variable." },
    ],
    examples: {
      console: `> docs create --use
> set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`,
      cli: `# create an author if you haven't already
$ IROH_AUTHOR=$(iroh author create)

# create a document
$ iroh docs create
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

# set a key
$ iroh doc 674deec7a19fec50fd6f486a5eef20509073ecf7c527b60a27c84baea90d3816 set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`
    }
  },
  {
    name: 'doc get',   
    description: 'Get entries in a document',
    slug: 'doc-get',
    arguments: [
      { name: 'KEY', necessity: 'required', description: 'Key to the entry to fetch' },
      { name: 'DOC_ID', necessity: 'required', description: ' Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also set with `doc set`.' },
      { name: 'prefix', necessity: '', description: 'If true, get all entries that start with KEY' },
      { name: 'author', necessity: '', description: 'If provided, only return entries from this author' },
      { name: 'old', necessity: '', description: 'If true, old entries will be included. By default only the latest value for each key is shown' },
      { name: 'content', necessity: '', description: 'Also print the content for each entry (but only if smaller than 1MB and valid UTf-8)' }
    ],
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc keys',  
    description: 'List all keys in a document',
    slug: 'doc-keys',
    arguments: [
      { name: 'DOC_ID', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also set with `doc set`.'  },
      { name: 'PREFIX', necessity: 'optional', description: 'Only list keys that start with PREFIX' },
      { name: 'author', necessity: 'optional', description: 'Filter by author' },
      { name: 'old', necessity: 'optional', description: 'If true, old entries will be included. By default only the latest value for each key is shown' }
    ],
    examples: {
      console: `> `,
    }
  },
]

const author = [
  { 
    name: 'author switch', 
    description: 'Set the active author for doc insertion (only works within the console)',
    slug: 'author-switch',
    arguments: [
      { name: 'ID', necessity: 'required', description: 'id of the author to switch to' }
    ],
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'author list', 
    description: 'List authors',
    slug: 'author-list',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'author create',
    description: 'Create a new author',
    slug: 'author-create',
    examples: {
      console: `> `,
    }
  }
]

const blob = [
  { 
    name: 'blob add',
    description: 'Add data from PATH to the running provider\'s database',
    slug: 'blob-add',
    arguments: [
      { name: 'PATH', necessity: 'required', description: 'The path to the file or folder to add' },
      { name: 'in-place', necessity: '', description: 'Add in place. Set this to true only if you are sure that the data in its current location will not change.' }
    ],
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob share',
    description: 'Download data to the running provider\'s database and provide it',
    slug: 'blob-share',
    arguments: [
      { name: 'hash', required: '', description: 'Hash to get, required unless ticket is specified' },
      { name: 'recursive', required: '', description: 'treat as collection, required unless ticket is specified [possible values: true, false]'},
      { name: 'peer', required: '', description: 'PublicKey of the provider' },
      { name: 'addr', required: '', description: 'Addresses of the provider' },
      { name: 'derp-region', required: '', description: 'derp region ID of the provider' },
      { name: 'token', required: '', description: 'base32-encoded Request token to use for authentication, if any' },
      { name: 'ticket', required: '', description: 'base32-encoded ticket to use for fetching' },
      { name: 'out', required: '', description: 'Directory in which to save the file(s)' },
      { name: 'stable', required: '', description: 'If this is set to true, the data will be moved to the output directory, and iroh will assume that it will not change'}
    ],
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob list blobs',
    description: 'List the available blobs on the running provider',
    slug: 'blob-list-blobs',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob list incomplete-blobs',
    description: 'List the blobs on the running provider that are not full files',
    slug: 'blob-list-incomplete-blobs',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob list collections',
    description: 'List the available collections on the running provider',
    slug: 'blob-list-blobs',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob validate',
    description: 'Validate hashes on the running node',
    slug: 'blob-validate',
    arguments: [
      { name: 'repair', necessity: '', description: 'Repair the store by removing invalid data' }
    ],
    examples: {
      console: `> `,
    }
  }
]

const commands = {
  doc,
  author,
  blob
};

export default commands;