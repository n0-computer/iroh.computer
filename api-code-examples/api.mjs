
const doc = [
  {
    name: 'doc list',  
    description: 'List documents on this node.',
    slug: 'doc-list',
    examples: {
      console: `> doc list
      tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua
      3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
      njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq`,
      cli: `$ iroh doc list
      tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua
      3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
      njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq`
    }
  },
  {
    name: 'doc new',  
    description: 'Create a new blank document.',
    slug: 'doc-new',
    examples: {
      console: `> doc new
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea`,
    }
  },
  {
    name: 'doc set',   
    description: 'Set an entry in a document',
    slug: 'doc-set',
    arguments: [
      { name: "key", necessity: 'required', description: "Key to the entry (parsed as UTF-8 string)." },
      { name: "value", necessity: 'required', description: "Content to store for this entry (parsed as UTF-8 string)." },
      { name: "author", necessity: 'required', description: "Author of this entry. Required unless the author is set through the console or the IROH_AUTHOR environment variable." },
    ],
    examples: {
      console: `> doc new --switch
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

> set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`,
      cli: `# create an author if you haven't already
$ IROH_AUTHOR=$(iroh author create)

# create a document
$ iroh doc new
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

# set a key
$ iroh doc 674deec7a19fec50fd6f486a5eef20509073ecf7c527b60a27c84baea90d3816 set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`
    }
  },
  {
    name: 'doc get',   
    description: 'Get entries in a document.',
    slug: 'doc-get',
    arguments: [
      { name: 'key', necessity: 'required', description: 'Key of the entry to fetch.' },
      { name: 'doc_id', necessity: 'required', description: 'Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also set with `doc set`.' },
      { name: 'prefix', necessity: '', description: 'If true, get all entries that start with key.' },
      { name: 'author', necessity: '', description: 'If provided, only return entries from this author.' },
      { name: 'old', necessity: '', description: 'If true, old entries will be included. By default only the latest value for each key is shown.' },
      { name: 'content', necessity: '', description: 'Also print the content for each entry (but only if smaller than 1MB and valid UTf-8).' }
    ],
    examples: {
      console: `> doc new --switch
dyyelvqqruxjwrlntsdvsksopwznmgnfxpehcsoqckklvqfxar2q
Active doc is now dyyelvqq…

author:fhu3uk4w… doc:dyyelvqq…
> doc set foo bar
@fhu3uk4w…: foo = 6lujp3wx… (3 B)

author:fhu3uk4w… doc:dyyelvqq…
> doc get foo -c
@fhu3uk4w…: foo = 6lujp3wx… (3 B)
bar

`,
    }
  },
  {
    name: 'doc keys',  
    description: 'List all keys in a document.',
    slug: 'doc-keys',
    arguments: [
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOC environment variable. Within the iroh console, the active document can also set with `doc set`.'  },
      { name: 'prefix', necessity: 'optional', description: 'Only list keys that start with prefix.' },
      { name: 'author', necessity: 'optional', description: 'Filter by author.' },
    ],
    examples: {
      console: `author:i3vpd4e7… doc:njszszvg…
> doc set foo bar
bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu

author:i3vpd4e7… doc:njszszvg…
> doc set hello world
bafkr4igxrffos4lnhdjn7lioyvkcjsrsd3qsiu6vd4ntvxvxpuchl3myrq

author:i3vpd4e7… doc:njszszvg…
> doc set good morning
bafkr4idyxc27uxtcrzl5a3t42xu7hm3h2wn4mfaqt3ma5ummofsitynxle

author:i3vpd4e7… doc:njszszvg…
> doc keys
@i3vpd4e7…: foo = 6lujp3wx… (3 B)
@i3vpd4e7…: good = pc4ll6s6… (7 B)
@i3vpd4e7…: hello = 26euv2lr… (5 B)

# use a prefix to filter the keys

author:i3vpd4e7… doc:njszszvg…
> doc keys fo
@i3vpd4e7…: foo = 6lujp3wx… (3 B)`,
    }
  },
  {
    name: 'doc share', 
    description: 'Share a document with peers.',
    slug: 'doc-share',
    arguments: [
      { name: 'mode', necessity: 'required', description: 'One of \'read\' for Read-only access or \'write\' for Write access.' },
      { name: 'doc', necessity: 'required', description: 'Document to share. In the console the current document is used when no `--doc` is provided.' }
    ],
    examples: {
      console: `# switch to a specific doc
> doc switch njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq
Active doc is now njszszvg…

doc: njszszvg…

> doc share write
xvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhlfzyvlqcaidiaglyldhfvq4xeaa5cqswdistl2hje3c24biacig3rqqdifkjjb3drfbo2krc7l3anoqly5wanom756kxmrqnap6tcadaassjgjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mprsyystlwe66cs

# or use --doc flag to get the ticket for a specific doc
> doc share write --doc 3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
gjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mprsyystlwe66csxvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhljfkldiajjkannnnjiejfkldkaskjlxi0jfwoqppiemxclpilkdipljqhixkkwmhziufkhablskhdjjlllqwoooqusiuypwouuuuippmjkk
  ` }
  },
  {
    name: 'doc join',  
    description: 'Join a document from a ticket.',
    slug: 'doc-join',
    arguments: [
      { name: 'ticket', necessity: 'required', description: 'The ticket to join a document. Create a ticket with \'doc share\'.' },
      { name: 'switch', necessity: '', description: 'Switch to the joined document (only in the iroh console).'}
    ],
    examples: {
      console: `> doc join --switch 6tcadaassjgjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mxvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhlfzyvlqcai55pmzg4d3x34mcpuydxoq4t5ec66zp3k3ouxwadxky745i3dwrhqcig3rqqdifkjjb3drfbo2krc7l3anoqly5wanom756kxmrqnap
tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua`,
    }
  },
  {
    name: 'doc switch',
    description: 'Set the active document (only works within the Iroh console).',
    slug: 'doc-switch',
    arguments: [
      { name: 'id', necessity: 'required', description: 'The [identifier](/docs/layers/documents#document-identifiers) of the document to switch to.' },
    ],
    examples: {
      console: `> doc new
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

> doc switch ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

doc:ktrygcpx
>`,
    }
  },
]

const author = [
  { 
    name: 'author switch', 
    description: 'Set the active author for doc insertion (only works within the console).',
    slug: 'author-switch',
    arguments: [
      { name: 'id', necessity: 'required', description: 'Id of the author to switch to.' }
    ],
    examples: {
      console: `# switch from one active author to another
author:i3vpd4e7…
> author switch wkl4cgrykxvcvr6pjnbvymrzm7h4je7d4ztszp35xfnk2rnflcxq
Active author is now wkl4cgry…

author:wkl4cgry…
>`,
    }
  },
  { 
    name: 'author list',
    description: 'List authors.',
    slug: 'author-list',
    examples: {
      console: `> author list
i3vpd4e7coeonwv6otni36bdux73opig5du6zjekvnl3c64gn4ua
wkl4cgrykxvcvr6pjnbvymrzm7h4je7d4ztszp35xfnk2rnflcxq`,
    }
  },
  { 
    name: 'author new',
    description: 'Create a new author.',
    slug: 'author-new',
    arguments: [
      { name: 'switch', necessity: '', description: 'Switch to the created author (only in the iroh console).' }
    ],
    examples: {
      console: `> author new --switch
2rkuvpk4prtjbqh7rnksaet3a3hdvrrz5mqinjcjbutklotort5a
Active author is now 2rkuvpk4…

author:2rkuvpk4…
>`,
    }
  }
]

const blob = [
  { 
    name: 'blob add',
    description: 'Add data from PATH to the running provider\'s database.',
    slug: 'blob-add',
    arguments: [
      { name: 'path', necessity: 'required', description: 'The path to the file or folder to add.' },
      { name: 'in-place', necessity: '', description: 'Add in place. Set this to true only if you are sure that the data in its current location will not change.' }
    ],
    examples: {
      console: `> blob add ~/my_txt.txt
Adding my_txt.txt as /Users/me/my_txt.txt...
- /Users/me/my_txt.txt: 328 B bafkr4igef2yiz2nz33tljfdezzr45cos5lnc2urjmfi6zghbsnfzvpdpa4
Total: 328 B

Collection: bafkr4ie3xsx3vdsbflainnk6p4xs4h2hq3hdmuasuoflkgybvnsbljb3ke`,
    }
  },
  { 
    name: 'blob list blobs',
    description: 'List the available blobs on the running provider.',
    slug: 'blob-list-blobs',
    examples: {
      console: `> blob list blobs
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
    name: 'blob list incomplete-blobs',
    description: 'List the blobs on the running provider that are not full files.',
    slug: 'blob-list-incomplete-blobs',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob list collections',
    description: 'List the available collections on the running provider.',
    slug: 'blob-list-collections',
    examples: {
      console: `> `,
    }
  },
  { 
    name: 'blob validate',
    description: 'Validate hashes on the running node.',
    slug: 'blob-validate',
    arguments: [
      { name: 'repair', necessity: '', description: 'Repair the store by removing invalid data.' }
    ],
    examples: {
      console: `> `,
    }
  }
]

const api = {
  doc,
  author,
  blob
};

export default api;
