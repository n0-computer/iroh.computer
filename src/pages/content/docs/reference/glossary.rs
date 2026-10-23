//! Content for `/docs/reference/glossary`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsReferenceGlossary() -> Element {
    rsx! {
        h1 { id: "glossary", "Glossary" }
        p { "A set of commonly used terms in the iroh ecosystem." }
        table {
            thead {
                tr {
                    th { "Term" }
                    th { "Definition" }
                }
            }
            tbody {
                tr {
                    td {
                        a { href: "/docs/layers/blobs",
                            strong { "Blob" }
                        }
                    }
                    td {
                        "A piece of data stored in the iroh network. Blobs are immutable, content-addressed (refer by hash), and opaque."
                    }
                }
                tr {
                    td {
                        a { href: "/docs/layers/document",
                            strong { "Document" }
                        }
                    }
                    td {
                        "A mutable piece of data stored in the iroh network. Documents are content-addressed (refer by hash), and can be read and written to."
                    }
                }
                tr {
                    td {
                        strong { "DocID" }
                    }
                    td {
                        "A unique identifier for a document in an iroh network. A docID is the public half of a keyPair."
                    }
                }
                tr {
                    td {
                        strong { "EndpointID" }
                    }
                    td {
                        "A unique identifier for an endpoint in an iroh network. An EndpointId is a keyPair"
                    }
                }
                tr {
                    td {
                        a { href: "/docs/concepts/tickets",
                            strong { "Ticket" }
                        }
                    }
                    td {
                        "A single serialized token containing everything needed to kick off an interaction with another endpoint running iroh."
                    }
                }
            }
        }
    }
}
