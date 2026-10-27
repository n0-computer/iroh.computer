//! Content for `/docs/protocols/docs`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsProtocolsDocs() -> Element {
    rsx! {
        h1 { id: "documents", "Documents" }
        p {
            "A protocol for a mutable key-value store. Authors create and join documents, multiple users read from them, write to them, and sync with them, subscribing to live updates in real time."
        }
        img {
            src: "/diagrams/documents.svg",
            alt: "a diagram of three author devices with arrows pointing to a document. the document is a table with key and value columns. for each row, the value column has an arrow pointing out to a blob",
            width: "800",
            height: "450",
            class: "theme-light",
        }
        img {
            src: "/diagrams/documents_dark.svg",
            alt: "a diagram of three author devices with arrows pointing to a document. the document is a table with key and value columns. for each row, the value column has an arrow pointing out to a blob",
            width: "800",
            height: "450",
            class: "theme-dark",
        }
        h2 { id: "document-namespaces", "Document Namespaces" }
        p {
            "A document is a "
            em { "namespace" }
            " that is uniquely identified by a keypair."
        }
        p {
            "A key in a document is just a sequence of bytes. In practice keys are almost always "
            a { href: "https://en.wikipedia.org/wiki/UTF-8", "UTF-8 strings" }
            ". A value in a document is always a hash that points to a blob. Conceptually, a document looks like this when written in JSON notation:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "An "
            em { "entry" }
            " in the document is a key-value pair. When an author writes an entry they first create a blob, then use the hash of the blob as the value, then pick a label to use as the key."
        }
        h2 { id: "authors-permissions", "Authors & Permissions" }
        p {
            "Authors are users who have write access to a document. Every author has a keypair that represents their identity. The public side of a keypair identifies the user & validates the edits they make to the document, the private side of the keypair is used to sign edits."
        }
        p {
            "Read access to a document is granted by sharing the document public key. Write access to a document is granted by sharing the document private key."
        }
        h2 { id: "document-identifiers", "Document Identifiers" }
        p {
            "Documents are referred to within iroh-docs by their "
            em { "document identifier" }
            " or "
            em { "DocID" }
            ". They look like this:"
        }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            "Document IDs are base32-lower serialization of the public key of the document. They do "
            em { "not" }
            " change as the document changes."
        }
        h2 { id: "synchronizing-documents", "Synchronizing Documents" }
        p {
            "When an author wants to sync with a document, they first find the document's current state, then they perform a "
            a { href: "https://arxiv.org/abs/2212.13567", "range-based set reconciliation" }
            " to fill in any changes in the keyspace."
        }
        p {
            "When two endpoints want to sync, they perform a range-based set reconciliation to fill in any changes in the keyspace. Any endpoint with the read key (document ID) can read & sync the latest state of the document. Having the read key denotes read access. All entries in the document are double-signed, once with an authorID (keypair) and the write key of the document."
        }
        aside { class: "note",
            p {
                "Check out our "
                a { href: "https://www.youtube.com/watch?v=_D_tbAMqADM", "youtube video" }
                " on how range-based set reconciliation works!"
            }
        }
        p {
            "After this synchronization step, we know the hashes of all the content the document references. By default iroh-docs documents will fetch all content associated with the document."
        }
        h2 { id: "document-pubsub", "Document PubSub" }
        p {
            "Every document is its own pubsub swarm, keyed by the public key of the document using iroh-gossip. These swarms implement techniques described in "
            a { href: "https://asc.di.fct.unl.pt/~jleitao/pdf/dsn07-leitao.pdf?ref=bartoszsypytkowski.com",
                "HyParView"
            }
            " & PlumTree to keep a bounded number of active endpoints any one endpoint in the swarm needs to push to."
        }
        aside { class: "note",
            p {
                "Bartosz Sypytkowski has a great "
                a { href: "https://www.bartoszsypytkowski.com/hyparview/", "blog post" }
                " on HyParView & Plumtree, well worth reading."
            }
        }
        p {
            "As authors write to a document, they publish these changes as pubsub messages that other peers pick up on & apply to their local state."
        }
        h2 { id: "storage", "Storage" }
        p {
            "Iroh-docs can be used with in-memory or file-system based storage. The store is used to keep track of all relevant metadata necessary for management of documents, authors and keys. The contents associated to keys is managed by "
            a { href: "/docs/layers/blobs",
                code { "iroh-blobs" }
            }
            ", which stores data in a optimized, content-addressed manner. Data can be imported and exported out of iroh-docs's storage using "
            a { href: "/docs/api/docs-import",
                code { "doc import" }
            }
            " and "
            a { href: "/docs/api/docs-export",
                code { "doc export" }
            }
            "."
        }
        h2 { id: "api", "API" }
        p {
            "Documents can be manipulated and queried using the "
            a { href: "/docs/api", "docs API" }
            "."
        }
    }
}
const EXAMPLE_1: &str = r###"{
  "bar": "bafkr4iebxyldaiwztn5kwt6bap5e5bnzeru5lgc64w6lns644ir6ky5soi",
  "bananas": "bafkr4ihr5vpp33v5ufos2dneywofls3gx67b5jmraxcn77odsu3yqcsohq",
  "foo": "bafkr4ic3ywkoq5k2bn7kaiz6lovehgkpfqk4kwstepcbs7pw256dtxutme",
  "slashes/are/also/ok": "bafkr4ic3ywkoq5k2bn7kaiz6lovehgkpfqk4kwstepcbs7pw256dtxutme",
  "so.are.dots": "bafkr4ic3ywkoq5k2bn7kaiz6lovehgkpfqk4kwstepcbs7pw256dtxutme",
  // ...
}
"###;
const EXAMPLE_2: &str = r###"ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea
"###;
