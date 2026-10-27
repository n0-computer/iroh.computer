//! Content for `/docs/quickstart`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsQuickstart() -> Element {
    rsx! {
        h1 { id: "quickstart", "Quickstart" }
        p { "Let's dive into iroh by building a simple peer-to-peer file transfer tool in rust!" }
        h2 { id: "what-we-ll-build", "What we'll build" }
        p { "At the end we should be able to transfer a file from one device by running this:" }
        pre {
            code { {EXAMPLE_1} }
        }
        p { "And then fetch it on any other device like so:" }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            {EXAMPLE_3}
            a { href: "https://github.com/n0-computer/iroh-blobs/blob/main/examples/transfer.rs",
                "complete example"
            }
            "."
        }
        h2 { id: "get-set-up", "Get set up" }
        p {
            "We'll assume you've set up "
            a { href: "https://www.rust-lang.org/", "rust" }
            " and "
            a { href: "https://doc.rust-lang.org/cargo/", "cargo" }
            " on your machine."
        }
        p {
            "Initialize a new project by running "
            code { "cargo init file-transfer" }
            ", then "
            code { "cd file-transfer" }
            " and install all the packages we're going to use: "
            code { "cargo add iroh iroh-blobs tokio anyhow" }
            "."
        }
        p {
            "From here on we'll be working inside the "
            code { "src/main.rs" }
            " file."
        }
        h2 { id: "create-an-iroh-endpoint",
            "Create an "
            code { "iroh::Endpoint" }
        }
        p {
            "To start interacting with other iroh endpoints, we need to build an "
            code { "iroh::Endpoint" }
            {EXAMPLE_4}
            code { "EndpointId" }
            "."
        }
        pre {
            code { {EXAMPLE_5} }
        }
        p {
            "There we go, this is all we need to "
            a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Endpoint.html#method.connect",
                "open connections"
            }
            " or "
            a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Endpoint.html#method.accept",
                "accept them"
            }
            "."
        }
        aside { class: "note",
            p {
                "Here, we're specifically configuring the "
                code { "Endpoint" }
                {EXAMPLE_6}
                a { href: "https://n0.computer", "number 0" }
                " runs to find which relay to talk to for specific "
                code { "EndpointId" }
                {EXAMPLE_7}
                a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Builder.html#method.discovery_local_network",
                    code { "discovery_local_network" }
                }
                " based on mDNS, or "
                a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Builder.html#method.discovery_dht",
                    code { "discovery_dht" }
                }
                " for discovery based on the bittorrent mainline DHT."
            }
            p {
                {EXAMPLE_8}
                code { "EndpointId" }
                ", but also help the "
                code { "Endpoint" }
                " out with giving it the whole "
                a { href: "https://docs.rs/iroh/latest/iroh/struct.EndpointAddr.html",
                    code { "EndpointAddr" }
                }
                " when connecting."
            }
        }
        h2 { id: "using-an-existing-protocol-iroh-blobs", "Using an existing protocol: iroh-blobs" }
        p {
            "Instead of writing our own protocol from scratch, let's use "
            a { href: "/proto/iroh-blobs", "iroh-blobs" }
            {EXAMPLE_9}
        }
        pre {
            code { {EXAMPLE_10} }
        }
        aside { class: "note",
            p {
                "Learn more about what we mean by \"protocol\" on the "
                a { href: "/docs/concepts/protocol", "protocol documentation page" }
                "."
            }
        }
        p {
            "With these two lines, we've initialized iroh-blobs and gave it access to our "
            code { "Endpoint" }
            "."
        }
        p {
            {EXAMPLE_11}
            code { "send" }
            " as an argument or "
            code { "receive" }
            ", so let's parse these two options out from the CLI arguments and match on them:"
        }
        pre {
            code { {EXAMPLE_12} }
        }
        p {
            "We're also going to print some simple help text when there's no arguments or we can't parse them."
        }
        p {
            "What's left to do now is fill in the two "
            code { "todo!()" }
            "s!"
        }
        h3 { id: "getting-ready-to-send", "Getting ready to send" }
        p {
            "If we want to make a file available over the network with iroh-blobs, we first need to hash this file."
        }
        aside { class: "note",
            p { "What does this step do?" }
            p {
                "It hashes the file using "
                a { href: "https://en.wikipedia.org/wiki/BLAKE_(hash_function)", "BLAKE3" }
                " and remembers a so-called "
                a { href: "https://github.com/oconnor663/bao?tab=readme-ov-file#outboard-mode",
                    "\"outboard\""
                }
                {EXAMPLE_13}
                em { "while it's streaming" }
                ", verified range downloads and download resumption."
            }
        }
        pre {
            code { {EXAMPLE_14} }
        }
        aside { class: "note",
            p {
                {EXAMPLE_15}
                a { href: "https://docs.rs/iroh-blobs/latest/iroh_blobs/api/blobs/struct.Blobs.html#method.add_slice",
                    code { "add_slice" }
                }
                {EXAMPLE_16}
            }
        }
        p {
            "The return value "
            code { "tag" }
            " contains the final piece of information such that another endpoint can fetch a blob from us."
        }
        p {
            "We'll use a "
            code { "BlobTicket" }
            " to put the file's BLAKE3 hash and our endpoint's "
            code { "EndpointId" }
            " into a single copy-able string:"
        }
        pre {
            code { {EXAMPLE_17} }
        }
        p {
            "Now we've imported the file and produced instructions for how to fetch it, but we're actually not yet actively listening for incoming connections yet! (iroh-blobs won't do so unless you specifically tell it to do that.)"
        }
        p {
            "For that we'll use iroh's "
            code { "Router" }
            {EXAMPLE_18}
            a { href: "/docs/concepts/protocol#alpns", "protocol" }
            " and "
            a { href: "/docs/concepts/router", "router" }
            " documentation pages."
        }
        p {
            "In our case, we only need a single protocol, but constructing a router also takes care of running the accept loop, so that makes our life easier:"
        }
        pre {
            code { {EXAMPLE_19} }
        }
        p {
            "And as you can see, as a final step we wait for the user to stop the file providing side by hitting "
            code { "Ctrl+C" }
            " in the console and once they do so, we shut down the router gracefully."
        }
        h3 { id: "connecting-to-the-other-side-to-receive", "Connecting to the other side to receive" }
        p {
            "On the connection side, we got the "
            code { "ticket" }
            " and the "
            code { "path" }
            " from the CLI arguments and we can parse them into their "
            code { "struct" }
            " versions."
        }
        p { "With them parsed" }
        ul {
            li {
                "we first construct a "
                code { "Downloader" }
                " (that can help us coordinate multiple downloads from multiple peers if we'd want to)"
            }
            li {
                "and then call "
                code { ".download" }
                " with the information contained in the ticket and wait for the download to finish:"
            }
        }
        aside { class: "note",
            p { {EXAMPLE_20} }
        }
        pre {
            code { {EXAMPLE_21} }
        }
        aside { class: "note",
            p {
                "The return value of "
                code { ".download()" }
                " is "
                a { href: "https://docs.rs/iroh-blobs/latest/iroh_blobs/api/downloader/struct.DownloadProgress.html",
                    code { "DownloadProgress" }
                }
                {EXAMPLE_22}
                code { ".await" }
                " it to wait for the download to finish, or you can stream out progress events instead, e.g. if you wanted to use this for showing a nice progress bar!"
            }
        }
        p {
            "As a final step, we'll export the file we just downloaded into our in-memory blobs database to the desired file path:"
        }
        pre {
            code { {EXAMPLE_23} }
        }
        aside { class: "note",
            p {
                "This first downloads the file completely into memory, then copies it from memory to file in a second step."
            }
            p {
                {EXAMPLE_24}
                code { "FsStore" }
                " instead of a "
                code { "MemStore" }
                " and using "
                code { ".export_with_opts" }
                " with "
                code { "ExportMode::TryReference" }
                {EXAMPLE_25}
            }
        }
        p { "Before we leave, we'll gracefully shut down our endpoint in the receive branch, too:" }
        pre {
            code { {EXAMPLE_26} }
        }
        h2 { id: "that-s-it", "That's it!" }
        p { "You've now successfully built a small tool for peer-to-peer file transfers! 🎉" }
        p {
            "The full example with the very latest version of iroh and iroh-blobs can be "
            a { href: "https://github.com/n0-computer/iroh-blobs/blob/main/examples/transfer.rs",
                "viewed on github"
            }
            "."
        }
        p { "If you're hungry for more, check out" }
        ul {
            li {
                "the "
                a { href: "https://docs.rs/iroh", "iroh rust documentation" }
                ","
            }
            li {
                a { href: "/docs/examples", "other examples" }
                ", or"
            }
            li {
                "other available "
                a { href: "/proto", "protocols" }
                "."
            }
        }
    }
}
const EXAMPLE_1: &str = r###"$ cargo run -- send ./file.txt
Indexing file.
File analyzed. Fetch this file by running:
cargo run -- receive blobabvojvy[...] file.txt
"###;
const EXAMPLE_2: &str = r###"$ cargo run -- receive blobabvojvy[...] file.txt
Starting download.
Finished download.
Copying to destination.
Finished copying.
Shutting down.
"###;
const EXAMPLE_3: &str = r###"In this guide we'll be omitting the import statements required to get this working.
If you're ever confused about what to import, take a look at the imports in the "###;
const EXAMPLE_4: &str = r###".
This is what manages the possibly changing network underneath, maintains a connection to the closest relay, and finds ways to address devices by "###;
const EXAMPLE_5: &str = r###"#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create an endpoint, it allows creating and accepting
    // connections in the iroh p2p world
    let endpoint = Endpoint::bind().await?;

    // ...

    Ok(())
}
"###;
const EXAMPLE_6: &str = r###"'s builder to include "number 0 discovery".
This makes it connect to DNS servers that "###;
const EXAMPLE_7: &str = r###"s.
It's a great default!
But if you want to, you can add other discovery types like "###;
const EXAMPLE_8: &str = r###"If all of this is too much magic for your taste, it's possible for the endpoint to work entirely without any discovery services.
In that case, you'll need to make sure you're not only dialing by "###;
const EXAMPLE_9: &str = r###", which already does what we want:
It loads files from your file system and provides a protocol for seekable, resumable downloads of these files."###;
const EXAMPLE_10: &str = r###"#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create an endpoint, it allows creating and accepting
    // connections in the iroh p2p world
    let endpoint = Endpoint::bind().await?;

    // We initialize an in-memory backing store for iroh-blobs
    let store = MemStore::new();
    // Then we initialize a struct that can accept blobs requests over iroh connections
    let blobs = BlobsProtocol::new(&store, None);

    // ...

    Ok(())
}
"###;
const EXAMPLE_11: &str = r###"At this point what we want to do depends on whether we want to accept incoming iroh connections from the network or create outbound iroh connections to other endpoints.
Which one we want to do depends on if the executable was called with "###;
const EXAMPLE_12: &str = r###"// Grab all passed in arguments, the first one is the binary itself, so we skip it.
let args: Vec<String> = std::env::args().skip(1).collect();
// Convert to &str, so we can pattern-match easily:
let arg_refs: Vec<&str> = args.iter().map(String::as_str).collect();

match arg_refs.as_slice() {
    ["send", filename] => {
        todo!();
    }
    ["receive", ticket, filename] => {
        todo!();
    }
    _ => {
        println!("Couldn't parse command line arguments: {args:?}");
        println!("Usage:");
        println!("    # to send:");
        println!("    cargo run -- send [FILE]");
        println!("    # this will print a ticket.");
        println!();
        println!("    # to receive:");
        println!("    cargo run -- receive [TICKET] [FILE]");
    }
}
"###;
const EXAMPLE_13: &str = r###" for that file.
This outboard contains information about hashes of parts of this file.
All of this enables some extra features with iroh-blobs like automatically verifying the integrity of the file "###;
const EXAMPLE_14: &str = r###"let filename: PathBuf = filename.parse()?;
let abs_path = std::path::absolute(&filename)?;

println!("Hashing file.");

// When we import a blob, we get back a "tag" that refers to said blob in the store
// and allows us to control when/if it gets garbage-collected
let tag = store.blobs().add_path(abs_path).await?;
"###;
const EXAMPLE_15: &str = r###"For other use cases, there are other ways of importing blobs into iroh-blobs, you're not restricted to pulling them from the file system!
You can see other options available, such as "###;
const EXAMPLE_16: &str = r###".
Make sure to also check out the options you can pass and their documentation for some interesting tidbits on performance."###;
const EXAMPLE_17: &str = r###"let endpoint_id = endpoint.id();
let ticket = BlobTicket::new(endpoint_id.into(), tag.hash, tag.format);

println!("File hashed. Fetch this file by running:");
println!(
    "cargo run -- receive {ticket} {}",
    filename.display()
);
"###;
const EXAMPLE_18: &str = r###".
Similar to routers in webserver libraries, it runs a loop accepting incoming connections and routes them to the specific handler.
However, instead of handlers being organized by HTTP paths, it routes based on "ALPNs".
Read more about ALPNs and the router on the "###;
const EXAMPLE_19: &str = r###"// For sending files we build a router that accepts blobs connections & routes them
// to the blobs protocol.
let router = Router::builder(endpoint)
    .accept(iroh_blobs::ALPN, blobs)
    .spawn();

tokio::signal::ctrl_c().await?;

// Gracefully shut down the endpoint
println!("Shutting down.");
router.shutdown().await?;
"###;
const EXAMPLE_20: &str = r###"Reusing the same downloader across multiple downloads can be more efficient, e.g. by reusing existing connections.
In this example we don't see this, but it might come in handy for your use case."###;
const EXAMPLE_21: &str = r###"let filename: PathBuf = filename.parse()?;
let abs_path = std::path::absolute(filename)?;
let ticket: BlobTicket = ticket.parse()?;

// For receiving files, we create a "downloader" that allows us to fetch files
// from other endpoints via iroh connections
let downloader = store.downloader(&endpoint);

println!("Starting download.");

downloader
    .download(ticket.hash(), Some(ticket.endpoint_addr().id)
    .await?;

println!("Finished download.");
"###;
const EXAMPLE_22: &str = r###".
You can either "###;
const EXAMPLE_23: &str = r###"println!("Copying to destination.");

store.blobs().export(ticket.hash(), abs_path).await?;

println!("Finished copying.");
"###;
const EXAMPLE_24: &str = r###"There's ways to make this work without having to store the whole file in memory!
This would involve setting up an "###;
const EXAMPLE_25: &str = r###".
Something similar can be done on the sending side!
We'll leave these changes as an exercise to the reader 😉"###;
const EXAMPLE_26: &str = r###"// Gracefully shut down the endpoint
println!("Shutting down.");
endpoint.close().await;
"###;
