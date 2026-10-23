//! Content for `/docs/ipfs`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsIpfs() -> Element {
    rsx! {
        h1 { id: "iroh-ipfs", "iroh & IPFS" }
        p {
            "Iroh is an "
            em { "IPFS system" }
            ". It uses content identifiers (CIDs). Content addressing is a powerful primitive that belongs at the foundation of the internet."
        }
        p {
            "Iroh is not an IPFS implementation. An implementation of IPFS should be able to interoperate with "
            a { href: "https://github.com/ipfs/kubo", "kubo" }
            " the reference implementation of nearly all "
            a { href: "https://github.com/ipfs/specs", "IPFS Specs" }
            ". Iroh can interoperate with kubo by bridging the two technologies, but by default one shouldn't expect to be able to add content to kubo and get it out with iroh, or vice versa."
        }
        h2 { id: "why-not-just-make-iroh-an-ipfs-implementation",
            "Why not just make iroh an IPFS implementation?"
        }
        p {
            "At first, we did! We wrote a ground-up implementation of IPFS in rust called "
            a { href: "https://github.com/n0-computer/beetle", "Beetle" }
            ". We switched away because Iroh has different design goals than IPFS, and after writing an implementation, we realized we couldn't achieve those goals & keep the implementation 'badge'. Iroh aims to be the smallest working foundation for building apps with sublinear scaling. The word "
            em { "small" }
            " is the challenging one here. IPFS is designed to upgrade the "
            em { "entire web" }
            ". To do that it has to accommodate numerous use cases and requirements that we couldn't build into iroh while keeping the project small."
        }
        h2 { id: "comparison-table", "Comparison Table" }
        p { "Here's a quick rundown on some of the core technical distinctions between IPFS & iroh:" }
        table {
            thead {
                tr {
                    th { "Concept" }
                    th { "Iroh" }
                    th { "Kubo" }
                }
            }
            tbody {
                tr {
                    td {
                        strong {
                            a { href: "https://docs.ipfs.tech/concepts/content-addressing/",
                                "CID"
                            }
                            " Usage"
                        }
                    }
                    td {
                        "Used for root hashes on the "
                        a { href: "/docs/components/blobs", "Blob layer" }
                    }
                    td { "Used for all blocks" }
                }
                tr {
                    td {
                        strong { "Hash Function" }
                    }
                    td { "BLAKE3" }
                    td { "Various, SHA2 by default" }
                }
                tr {
                    td {
                        strong { "Maximum Block Size" }
                    }
                    td { "none" }
                    td { "1MiB" }
                }
                tr {
                    td {
                        strong { "Data Layout" }
                    }
                    td { "Key-Value" }
                    td { "Directed Acyclic Graphs (DAGs)" }
                }
                tr {
                    td {
                        strong { "Data Model" }
                    }
                    td { "\"Bring your own\"" }
                    td {
                        a { href: "https://ipld.io/specs", "IPLD" }
                        " or \"Bring your own\""
                    }
                }
                tr {
                    td {
                        strong { "Syncing" }
                    }
                    td {
                        a { href: "/docs/components/documents", "documents" }
                    }
                    td { "none" }
                }
                tr {
                    td {
                        strong { "Networking Stack" }
                    }
                    td {
                        a { href: "/docs/components/net", "iroh-net" }
                    }
                    td {
                        a { href: "https://libp2p.io", "libp2p" }
                    }
                }
                tr {
                    td {
                        strong { "Public Key Cryptography" }
                    }
                    td { "ED25519 Keys" }
                    td { "Various, ED25519 by default" }
                }
                tr {
                    td {
                        strong { "Naming system" }
                    }
                    td { "none" }
                    td {
                        a { href: "https://specs.ipfs.tech/ipns/", "IPNS" }
                        ", "
                        a { href: "https://dnslink.dev/", "DNSLink" }
                    }
                }
                tr {
                    td {
                        strong { "Content Storage" }
                    }
                    td { "User Files + Cache" }
                    td { "Internal Repository" }
                }
                tr {
                    td {
                        strong { "Verification Checkpoints" }
                    }
                    td { "send and receive" }
                    td { "receive" }
                }
            }
        }
        h2 { id: "cid-interop", "CID Interop" }
        p {
            "If you create a file that is less than 256Kib, kubo can be configured to emit the same content:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "The CID for "
            code { "file.txt" }
            " in both systems is "
            a { href: "https://cid.ipfs.tech/#bafkr4ig4ljhnxasawambeqcsymycobuw7ftxdjr3iusquxax2maa5artku",
                code { "bafkr4ig4ljhnxasawambeqcsymycobuw7ftxdjr3iusquxax2maa5artku" }
            }
            ". The collection CIDs are different because directories work differently, but this small overlap between iroh & IPFS forms a foundation we can build all sorts of interop from."
        }
        p { "If we create a file that's larger than 256Kb, however, things break down:" }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            "This is because under the hood IPFS is cutting the input file up into "
            em { "blocks" }
            " of data so that each block can be incrementally verified during transfer. Iroh does not do this, and so the hashes are different. To address this, we need "
            em { "CID translation" }
            "."
        }
        h3 { id: "cid-translation", "CID Translation" }
        aside { class: "note",
            p { "CID Translations have not been implemented in iroh yet." }
        }
        p {
            "CID translations are signed documents that state a content equivalency between hashes in two different systems. Here's what a CID translation would look like for the random 1M file example above, expressed in JSON:"
        }
        pre {
            code { {EXAMPLE_3} }
        }
        p {
            "In english this would read \"author "
            code { "3pwjma35..." }
            " has said this iroh CID and that kubo CID are equal content. They point to the same bytes\"."
        }
        p {
            "Using translations requires trusting the author of the translation. The \"author\" field is an iroh public key, which can be used to verify the signature field. The signature is the contents of the \"eq\" object."
        }
    }
}
const EXAMPLE_1: &str = r###"# configure IPFS to use the BLAKE3 hash algorithm, and wrap in a directory to match iroh's default behavior
$ ipfs add file.txt --hash blake3 --wrap-with-directory
added bafkr4ig4ljhnxasawambeqcsymycobuw7ftxdjr3iusquxax2maa5artku file.txt
added bafyb4ig2hp3tqb762mg7bvuixfimok7tyn4a3b3vswlkvcphppj7j2pemi

$ iroh add file.txt
Adding file.txt as /Users/b5/file.txt...
- /Users/b5/file.txt: 12B bafkr4ig4ljhnxasawambeqcsymycobuw7ftxdjr3iusquxax2maa5artku
Total: 12B

Collection: bafkr4iatacaewbfgoqe7d4mcxtuhfxbbog57t7xpvppqgvyr2bzswlb4fy
"###;
const EXAMPLE_2: &str = r###"# create a random 1M file
$ head -c 1000000 </dev/urandom > file

$ ipfs add --hash blake3 --wrap-with-directory file.txt
added bafyb4idt2x6f35tsvvkic3uxn5377gvjohpu7ejlxjdgno73lb4yzwrca4 file
added bafyb4ia4lras4leu2lwpc57lg3xk2c4bdacabuzpunbjrl7piwug4lojiq

$ iroh add file
Adding file as /Users/b5/code/iroh.computer/file...
- /Users/b5/code/iroh.computer/file.txt: 976.56 KiB bafkr4ihr5vpp33v5ufos2dneywofls3gx67b5jmraxcn77odsu3yqcsohq
Total: 976.56 KiB

Collection: bafkr4id2xleuzonckwul47dwmaktqw6dgpudvfzmdxkitv6qmg7bwxy7hu
"###;
const EXAMPLE_3: &str = r###"{
  "eq": {
    "iroh": "bafkr4ihr5vpp33v5ufos2dneywofls3gx67b5jmraxcn77odsu3yqcsohq",
    "kubo": "bafyb4idt2x6f35tsvvkic3uxn5377gvjohpu7ejlxjdgno73lb4yzwrca4"
  },
  "author": "3pwjma35aeu7mmmjolslefpnlsdztyp4zwf4zwx32nnvlmzko4aa",
  "signature": "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
"###;
