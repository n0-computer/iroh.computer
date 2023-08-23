
const doc = [
  {
    name: 'doc switch',
    description: 'Set the active document (only works within the Iroh console)',
    slug: 'doc-switch',
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
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc list',  
    description: 'List documents',
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
      { name: "KEY", necessity: 'required', description: "Key to the entry (parsed as UTF-8 string)" },
      { name: "VALUE", necessity: 'required', description: "Content to store for this entry (parsed as UTF-8 string)" },
      { name: "author", necessity: 'required', description: "Author of this entry. Required unless the author is set through the console or the IROH_AUTHOR environment variable." },
    ],
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc set',   
    description: 'Set an entry in a document',
    slug: 'doc-set',
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc get',   
    description: 'Get entries in a document',
    slug: 'doc-get',
    examples: {
      console: `> `,
    }
  },
  {
    name: 'doc keys',  
    description: 'List all keys in a document',
    slug: 'doc-keys',
    examples: {
      console: `> `,
    }
  },
]

const author = [
  { 
    name: 'author switch', 
    description: 'Set the active author for doc insertion',
    slug: 'author-switch',
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
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob share',
    description: 'Download data to the running provider\'s database and provide it',
    slug: 'blob-share',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob list',
    description: 'List available content on the node',
    slug: 'blob-list',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob validate',
    description: 'Validate hashes on the running node',
    slug: 'blob-validate',
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