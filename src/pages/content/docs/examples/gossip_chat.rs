//! Content for `/docs/examples/gossip-chat`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsExamplesGossipChat() -> Element {
    rsx! {
        h1 { id: "building-a-peer-to-peer-chat-application-in-rust",
            "Building a Peer-to-Peer Chat Application in Rust"
        }
        iframe {
            title: "Video",
            src: "https://www.youtube-nocookie.com/embed/undefined",
            "loading": "lazy",
            allowfullscreen: true,
        }
        h1 { id: "building-a-p2p-chat-application-with-rust-and-iroh",
            "Building a P2P Chat Application with Rust and Iroh"
        }
        p {
            "This tutorial demonstrates how to build a peer-to-peer chat application from scratch using Rust and the Iroh library. While this implementation is simplified, it illustrates core concepts of P2P networking and the Iroh gossip protocol."
        }
        p {
            "The code in the above video differs slightly from the code presented below. We recommend watching the video and following along until you get comfortable. When you are ready for a deeper dive into the code, walk through this tutorial."
        }
        h2 { id: "prerequisites", "Prerequisites" }
        p {
            "The tutorial assumes basic programming knowledge but no prior Rust experience. To begin, install Rust by following the instructions at "
            a { href: "https://rust-lang.org", "rust-lang.org" }
            "."
        }
        h2 { id: "project-setup", "Project Setup" }
        p { "First, initialize a new Rust project:" }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "This should print \"hello world\", and you can see the code for that in the "
            code { "src/main.rs" }
            " file, which is the file we will be building on for this tutorial."
        }
        p {
            "Next, let's add the iroh dependencies, and a few others we will need to get the chat application working."
        }
        p {
            code { "tokio" }
            " handles our async runtime, allowing us to do things like listen for incoming messages at the same time as we write outgoing messages."
        }
        p {
            code { "anyhow" }
            " allows us to more easily handle errors, and is especially useful when writing binaries or when prototyping."
        }
        p {
            code { "rand" }
            " generates randomness."
        }
        p { "Install the required dependencies:" }
        pre {
            code { {EXAMPLE_2} }
        }
        h2 { id: "basic-endpoint-configuration", "Basic Endpoint Configuration" }
        p {
            "The first step is creating a basic endpoint configuration. Replace the following with the current contents of the "
            code { "src/main.rs" }
            " file:"
        }
        pre {
            code { {EXAMPLE_3} }
        }
        h2 { id: "adding-gossip-protocol-support", "Adding Gossip Protocol Support" }
        p {
            "The "
            code { "iroh-gossip" }
            " protocol is what we will use to not only send messages, but also coordinate who we are connected to in our chat application."
        }
        p { "Install the gossip protocol:" }
        pre {
            code { {EXAMPLE_4} }
        }
        p { "Then update the code to implement basic gossip functionality:" }
        pre {
            code { {EXAMPLE_5} }
        }
        h2 { id: "creating-and-broadcasting-to-a-topic", "Creating and Broadcasting to a Topic" }
        p {
            "Topics are the fundamental unit of communication in the gossip protocol. Here's how to create a topic and broadcast a message:"
        }
        pre {
            code { {EXAMPLE_6} }
        }
        h2 { id: "messages", "Messages" }
        p {
            "The "
            code { "broadcast" }
            " method will send bytes over the wire. To keep ourselves organized, we should create a "
            code { "Message" }
            " enum that enumerates the "
            em { "kinds" }
            " of messages we want folks to send. We can serialize those messages into bytes for the "
            code { "broadcast" }
            " method to send."
        }
        p {
            "Let's write a "
            code { "Message::AboutMe" }
            " enum variant that allows someone who joins the chat to be called by a specific name."
        }
        p {
            "And let's write a "
            code { "Message::Message" }
            " that has a "
            code { "String" }
            " with the actual chat messages."
        }
        p {
            "Also, we want each of those messages to include the "
            code { "EndpointId" }
            " of the sender. In an actual application, we would encode and decode the messages with keypairs to ensure that everyone who sends a message is actually who they say they are. For more on that, check out our more robust chat example that exists in the "
            a { href: "https://github.com/n0-computer/iroh-gossip/blob/main/examples/chat.rs",
                code { "iroh-gossip" }
            }
            " repo."
        }
        p {
            {EXAMPLE_7}
            a { href: "https://en.wikipedia.org/wiki/Cryptographic_nonce", "cryptographic nonce" }
            "."
        }
        p {
            "We need to add crates that will allow us to serialize our new message types as bytes and deserialize bytes as our message type."
        }
        p {
            code { "serde" }
            " stands for "
            code { "Serialize/Deserialize" }
            ". "
            code { "serde-json" }
            " lets us easily encode and decode to the json format, but we can choose other formats. E.g., in the "
            code { "iroh-gossip" }
            " example, we use "
            code { "postcard" }
            "."
        }
        p {
            code { "bytes" }
            " is a utility library for working with bytes."
        }
        pre {
            code { {EXAMPLE_8} }
        }
        p { "Then add the following to your main file:" }
        pre {
            code { {EXAMPLE_9} }
        }
        p {
            "Now, rather than broadcasting \"sup\", let's broadcast a message that let's others in the chat know our name:"
        }
        pre {
            code { {EXAMPLE_10} }
        }
        h2 { id: "implementing-message-reception", "Implementing Message Reception" }
        p {
            "To handle incoming messages, we need to iterate over the stream of messages that come in on the "
            code { "receiver" }
            " of the "
            code { "Topic" }
            "."
        }
        p {
            "Dealing with streams in rust is complicated without additional help from crates that were designed to simplify using them. Knowing the best tools to use for this can "
            em { "also" }
            " be complicated, since a certain crate may have a good trait implementation for "
            em { "some" }
            " use cases, and a less good implementation for others. It can also feel a bit yucky to add a big beefy crate to your code, when you are only using a very small subset of its contents."
        }
        p {
            "In this application, we are using the "
            code { "StreamExt" }
            " trait to make handling async streams easier. We've found that the best option right now is to use the "
            code { "futures-lite" }
            " crate. It contains a subset of the "
            code { "futures" }
            " crate."
        }
        p {
            "Install the "
            code { "futures-lite" }
            " crate to handle async streams:"
        }
        pre {
            code { {EXAMPLE_11} }
        }
        p {
            "Then implement message reception. We are going to use a separate "
            code { "subscribe_loop" }
            " function to keep the code more simple:"
        }
        pre {
            code { {EXAMPLE_12} }
        }
        p {
            "Let's call this "
            code { "subscribe_loop" }
            " function in our main function. Eventually, when we add the ability to send messages, we want this subscribe loop to be listening for incoming messages at the same time as we send outgoing messages."
        }
        p {
            "To do that, we are going to call the "
            code { "subscribe_loop" }
            " function inside a "
            code { "tokio::spawn" }
            ". That will spawn a task so that the subscribe loop is listening concurrently with our writing loop."
        }
        p { "Here are the imports and the main function so far:" }
        pre {
            code { {EXAMPLE_13} }
        }
        h2 { id: "the-input-loop", "The input loop" }
        p { "Now that we can receive messages, let's code up how to send them." }
        p {
            "We are going to write an "
            code { "input_loop" }
            " that reads from stdin. It's going to take a "
            code { "Sender" }
            " that can send "
            code { "String" }
            "s on a channel. Each time we get input from "
            code { "stdin" }
            ", we will read it to a String buffer, and then send that string over the channel:"
        }
        pre {
            code { {EXAMPLE_14} }
        }
        p {
            "Much like we did for the "
            code { "subscribe_loop" }
            ", we are going to spawn the "
            code { "input_loop" }
            " on a thread. Tokio recommends that we actually spawn the loop listening to "
            code { "Stdin" }
            " on a "
            code { "std" }
            " thread rather than a "
            code { "tokio" }
            " thread:"
        }
        pre {
            code { {EXAMPLE_15} }
        }
        p {
            "Okay, so we can read off of stdin. Now we need to broadcast what we are typing to the Topic (and also print our messages to ourselves so that we can read through the chat logically):"
        }
        pre {
            code { {EXAMPLE_16} }
        }
        p {
            "If you run the code now, you can finally see some signs of life! Type a message and you can see how we take the content from std and send it."
        }
        p {
            "It's getting a bit lonely now, though. Let's implement a way for other's to join our Topic."
        }
        h2 { id: "implementing-signaling-with-tickets", "Implementing Signaling with Tickets" }
        p {
            "Let's implement ticket-based signaling! This means we will turn the topic and our endpoint id information into a "
            code { "Ticket" }
            " for others to use to join our Topic. We send the ticket by serializing the "
            code { "Ticket" }
            " data and printing the serialized data to the terminal. We can then copy/paste for others to use."
        }
        pre {
            code { {EXAMPLE_17} }
        }
        h2 { id: "using-the-ticket-and-messages",
            "Using the "
            code { "Ticket" }
            " and "
            code { "Message" }
            "s"
        }
        p {
            "Let's update our main file to include printing a "
            code { "Ticket" }
            " and broadcasting our name on the topic."
        }
        pre {
            code { {EXAMPLE_18} }
        }
        p { "Now, when you run your code, you should see something like this:" }
        pre {
            code { {EXAMPLE_19} }
        }
        h2 { id: "creating-a-command-line-interface", "Creating a Command-Line Interface" }
        p {
            "Here is where things get fun. We know how to create, join, and send and receive on a "
            code { "Topic" }
            ". We also know how to get others to join that "
            code { "Topic" }
            ". This has now created two different \"roles\" an endpoint can have: a topic \"creator\" and a topic \"joiner\". One side \"creates\" the topic and the ticket, and the other side takes the ticket and uses it to join the topic and connect to the ticket creator."
        }
        p {
            "To \"join\", we will need to pass in a "
            code { "Ticket" }
            " as a command line argument. There is a great rust crate called "
            code { "clap" }
            " that takes care of much  of the CLI boiler plate for you."
        }
        p { "Install the clap crate for CLI argument parsing:" }
        pre {
            code { {EXAMPLE_20} }
        }
        p {
            "At this point, rather than show you a chunk of code, I'm going to lay out the entire file."
        }
        p { "Here are the bits to pay attention to:" }
        p {
            "We now create a struct that handles the arguments for the CLI, and a struct that handles the commands for the CLI. We use "
            code { "clap" }
            " to create a nice CLI. There are two commands "
            code { "open" }
            " and "
            code { "join" }
            ". "
            code { "join" }
            " expects a `Ticket."
        }
        p {
            "We also now have a "
            code { "--name" }
            " flag that we can optionally use as an identifier in the topic."
        }
        p {
            "If you use the "
            code { "open" }
            " command, you create a topic. If you use the "
            code { "join" }
            " command, you get a topic and a list of "
            code { "endpoint_ids" }
            " from the ticket."
        }
        p { "In either case, we still print a ticket to the terminal." }
        p {
            "The smallest change, but a very important one, is that we go from using the "
            code { "subscribe" }
            " method to the "
            code { "subscribe_and_join" }
            " method. The "
            code { "subscribe" }
            " method would return a "
            code { "Topic" }
            " immediately. The "
            code { "subscribe_and_join" }
            " method takes the given topic, joins it, and waits for someone else to join the topic before returning."
        }
        pre {
            code { {EXAMPLE_21} }
        }
        h2 { id: "running-the-application", "Running the Application" }
        pre {
            code { {EXAMPLE_22} }
        }
        p { "To join an existing chat room:" }
        pre {
            code { {EXAMPLE_23} }
        }
        p {
            "The application will now support basic chat functionality between connected peers, with messages broadcast to all participants in the room."
        }
        h2 { id: "notes-on-security", "Notes on Security" }
        p {
            "While this implementation demonstrates the basic concepts, a production system would need additional security measures. For example, the example in the Iroh gossip protocol repository includes message signing to prevent impersonation attacks."
        }
        p {
            "For more sophisticated implementations and security features, refer to the examples in the Iroh gossip protocol repository."
        }
    }
}
const EXAMPLE_1: &str = r###"cargo init iroh-gossip-chat
cd iroh-gossip-chat
cargo run
"###;
const EXAMPLE_2: &str = r###"cargo add iroh tokio anyhow rand
"###;
const EXAMPLE_3: &str = r###"use anyhow::Result;
use iroh::{Endpoint, SecretKey};

#[tokio::main]
async fn main() -> Result<()> {
    // Generate a secret key. This is the source of
    // identity for your endpoint. If you want to have
    // the same identity each time you open the app,
    // you would need to store and load it each time.
    let secret_key = SecretKey::generate(&mut rand::rng());

    // Create an endpoint.
    // By default we turn on our n0 discovery services.
    //  This allows you to
    // dial by `EndpointId`, and allows you to be
    // dialed by `EndpointId`.
    let endpoint = Endpoint::builder()
        // Pass in your secret key. If you don't pass
        // in a secret key a new one will be generated
        // for you each time.
        .secret_key(secret_key)
        // Bind the endpoint to the socket.
        .bind()
        .await?;

    println!("> our endpoint id: {}", endpoint.id());

    Ok(())
}
"###;
const EXAMPLE_4: &str = r###"cargo add iroh-gossip
"###;
const EXAMPLE_5: &str = r###"use anyhow::Result;
use iroh::protocol::Router;
use iroh::Endpoint;
use iroh_gossip::net::Gossip;

#[tokio::main]
async fn main() -> Result<()> {
    // We've removed the `SecretKey::generate` method.
    // The `Endpoint` will generate a `SecretKey` for
    // you under the hood if you don't supply one.
    let endpoint = Endpoint::builder()
        .bind()
        .await?;

    println!("> our endpoint id: {}", endpoint.id());

    // Build and instance of the gossip protocol
    // and add a clone of the endpoint we have built.
    // The gossip protocol will use the endpoint to
    // make connections.
    let gossip = Gossip::builder().spawn(endpoint.clone());

    // The Router is how we manage protocols on top
    // of the iroh endpoint. It handles all incoming
    // messages and routes them to the correct
    // protocol.
    let router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    // Cleanly shutdown the router.
    router.shutdown().await?;

    Ok(())
}
"###;
const EXAMPLE_6: &str = r###"use anyhow::Result;
use iroh::protocol::Router;
use iroh::Endpoint;
use iroh_gossip::{net::Gossip, proto::TopicId};

#[tokio::main]
async fn main() -> Result<()> {
    let endpoint = Endpoint::bind().await?;

    println!("> our endpoint id: {}", endpoint.id());
    let gossip = Gossip::builder().spawn(endpoint.clone());

    let router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    // Create a new topic.
    let id = TopicId::from_bytes(rand::random());
    let endpoint_ids = vec![];

    // Subscribe to the topic.
    // Since the `endpoint_ids` list is empty, we will
    // subscribe to the topic, but not attempt to
    // connect to any other endpoint.
    let topic = gossip.subscribe(id, endpoint_ids).await?;

    // `split` splits the topic into the `GossipSender`
    // and `GossipReceiver` portions
    let (sender, _receiver) = topic.split();

    // Broadcast a message to the topic.
    // Since no one else is a part of this topic,
    // this message is currently going out to no one.
    sender.broadcast("sup".into()).await?;

    router.shutdown().await?;

    Ok(())
}
"###;
const EXAMPLE_7: &str = r###"In addition, the nature of the gossip protocol could potentially cause messages to be sent multiple times. This is done intentionally, to ensure at-least-once delivery of each message to all endpoints. This behavior is unexpected in most app contexts, so iroh will internally deduplicate messages based on the hash of their contents.
In this case, if someone sends re-sends a message they already sent, it will be ignored by the other peers. To circumvent this, each message should include a piece of unique data to prevent this deduplication. This can be done in a number of ways - we will use a "###;
const EXAMPLE_8: &str = r###"cargo add serde --features serde/derive serde-json data_encoding
"###;
const EXAMPLE_9: &str = r###"// add these use statements to the top
use iroh::EndpointId;
use serde::{Deserialize, Serialize};

...

// add the message code to the bottom
#[derive(Debug, Serialize, Deserialize)]
struct Message {
    body: MessageBody,
    nonce: [u8; 16],
}

#[derive(Debug, Serialize, Deserialize)]
enum MessageBody {
    AboutMe { from: EndpointId, name: String },
    Message { from: EndpointId, text: String },
}

impl Message {
    fn from_bytes(bytes: &[u8]) -> Result<Self> {
        serde_json::from_slice(bytes).map_err(Into::into)
    }

    pub fn new(body: MessageBody) -> Self {
        Self {
            body,
            nonce: rand::random(),
        }
    }

    pub fn to_vec(&self) -> Vec<u8> {
        serde_json::to_vec(self).expect("serde_json::to_vec is infallible")
    }
}
"###;
const EXAMPLE_10: &str = r###"// replace:
sender.broadcast("sup".into()).await?;

// with:
// Create an "about me" message
let message = Message::new(MessageBody::AboutMe {
    from: endpoint.id(),
    name: String::from("alice"),
});
// Turn the message into a `Vec`, and then use
// `into` to coerce the `Vec` into `Bytes`
sender.broadcast(message.to_vec().into()).await?;
"###;
const EXAMPLE_11: &str = r###"cargo add futures-lite
"###;
const EXAMPLE_12: &str = r###"// at the top of the file add these imports:
use std::collections::HashMap;
use iroh_gossip::api::{GossipReceiver, Event};
use futures_lite::StreamExt;

...
// at the bottom of the file add this function:

/// Handle incoming events
async fn subscribe_loop(mut receiver: GossipReceiver) -> Result<()> {
    // keep track of the mapping between `EndpointId`s and names
    let mut names = HashMap::new();
    // iterate over all events
    while let Some(event) = receiver.try_next().await? {
        // if the Event is a `GossipEvent::Received`, let's deserialize the message:
        if let Event::Received(msg) = event {
            // deserialize the message and match on the
            // message type:
            match Message::from_bytes(&msg.content)?.body {
                MessageBody::AboutMe { from, name } => {
                    // if it's an `AboutMe` message
                    // add an entry into the map
                    // and print the name
                    names.insert(from, name.clone());
                    println!("> {} is now known as {}", from.fmt_short(), name);
                }
                MessageBody::Message { from, text } => {
                    // if it's a `Message` message,
                    // get the name from the map
                    // and print the message
                    let name = names
                        .get(&from)
                        .map_or_else(|| from.fmt_short().to_string(), String::to_string);
                    println!("{}: {}", name, text);
                }
            }
        }
    }
    Ok(())
}
"###;
const EXAMPLE_13: &str = r###"
use std::collections::HashMap;

use anyhow::Result;
use futures_lite::StreamExt;
use iroh::protocol::Router;
use iroh::{Endpoint, EndpointId};
use iroh_gossip::{
    api::{GossipReceiver, Event},
    net::Gossip,
    proto::TopicId,
};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() -> Result<()> {
    let endpoint = Endpoint::bind().await?;

    println!("> our endpoint id: {}", endpoint.id());
    let gossip = Gossip::builder().spawn(endpoint.clone());

    let router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    let id = TopicId::from_bytes(rand::random());
    let endpoint_ids = vec![];

    let (sender, receiver) = gossip.subscribe(id, endpoint_ids).await?.split();

    let message = Message::new(MessageBody::AboutMe {
        from: endpoint.id(),
        name: String::from("alice"),
    });
    sender.broadcast(message.to_vec().into()).await?;

    // subscribe and print loop
    tokio::spawn(subscribe_loop(receiver));

    router.shutdown().await?;

    Ok(())
}
"###;
const EXAMPLE_14: &str = r###"/// Read input from stdin
fn input_loop(line_tx: tokio::sync::mpsc::Sender<String>) -> Result<()> {
    // create a new string buffer
    let mut buffer = String::new();
    // get a handle on `Stdin`
    let stdin = std::io::stdin(); // We get `Stdin` here.
    loop {
        // loop through reading from the buffer...
        stdin.read_line(&mut buffer)?;
        // and then sending over the channel
        line_tx.blocking_send(buffer.clone())?;
        // clear the buffer after we've sent the content
        buffer.clear();
    }
}
"###;
const EXAMPLE_15: &str = r###"// after the call to `subscribe_loop`:

// spawn an input thread that reads stdin
// create a multi-provider, single-consumer channel
let (line_tx, mut line_rx) = tokio::sync::mpsc::channel(1);
// and pass the `sender` portion to the `input_loop`
std::thread::spawn(move || input_loop(line_tx));
"###;
const EXAMPLE_16: &str = r###"// right after the above code:

// broadcast each line we type
println!("> type a message and hit enter to broadcast...");
// listen for lines that we have typed to be sent from `stdin`
while let Some(text) = line_rx.recv().await {
    // create a message from the text
    let message = Message::new(MessageBody::Message {
        from: endpoint.id(),
        text: text.clone(),
    });
    // broadcast the encoded message
    sender.broadcast(message.to_vec().into()).await?;
    // print to ourselves the text that we sent
    println!("> sent: {text}");
}
"###;
const EXAMPLE_17: &str = r###"// Add the `use` statement to the top of the main file
use iroh::EndpointAddr;
use std::fmt;
use std::str::FromStr;

...

// add the `Ticket` code to the bottom of the main file
#[derive(Debug, Serialize, Deserialize)]
struct Ticket {
    topic: TopicId,
    endpoints: Vec<EndpointAddr>,
}

impl Ticket {
    /// Deserialize from a slice of bytes to a Ticket.
    fn from_bytes(bytes: &[u8]) -> Result<Self> {
        serde_json::from_slice(bytes).map_err(Into::into)
    }

    /// Serialize from a `Ticket` to a `Vec` of bytes.
    pub fn to_bytes(&self) -> Vec<u8> {
        serde_json::to_vec(self).expect("serde_json::to_vec is infallible")
    }
}

// The `Display` trait allows us to use the `to_string`
// method on `Ticket`.
impl fmt::Display for Ticket {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let mut text = data_encoding::BASE32_NOPAD.encode(&self.to_bytes()[..]);
        text.make_ascii_lowercase();
        write!(f, "{}", text)
    }
}

// The `FromStr` trait allows us to turn a `str` into
// a `Ticket`
impl FromStr for Ticket {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let bytes = data_encoding::BASE32_NOPAD.decode(s.to_ascii_uppercase().as_bytes())?;
        Self::from_bytes(&bytes)
    }
}
"###;
const EXAMPLE_18: &str = r###"// in our main file, after we create a topic `id`:
// print a ticket that includes our own endpoint id and endpoint addresses
let ticket = {
    // Get our address information, includes our
    // `EndpointId`, our `RelayUrl`, and any direct
    // addresses.
    let me = endpoint.addr();
    let endpoints = vec![me];
    Ticket { topic: id, endpoints }
};
println!("> ticket to join us: {ticket}");
"###;
const EXAMPLE_19: &str = r###"> our endpoint id: 03ce2e2f55af140d0b18395fff054d3f3ab6a30aa680e4a2a3ab4526838151a5
> ticket to join us: pmrhi33qnfrseos3ge4tslbthawdcojvfq3tolbrgq4symjufqytinbmg4wdemzzfqzdinjmgiztmlbshewdonbmgiztglbrgi4cynzzfqzdslbxgqwdsnrmgizdmlbsgazsymjzgewdemzzfqytqmjmgiytalbsguysyobzfqytclbvgiwdenbwfq2cymjygbosyiton5sgk4zchjnxwiton5sgkx3jmqrduirqgnrwkmtfgjtdknlbmyytimdegbrdcobthe2wmztgga2tizbtmyzwcyrwmeztaylbgy4dazjumezgcm3bmi2dkmrwhaztqmjvgfqtkirmejzgk3dbpfpxk4tmei5ce2duoryhgorpf52xgzjrfuys44tfnrqxsltjojxwqltomv2ho33snmxc6irmejsgs4tfmn2f6ylemrzgk43tmvzseos3ei3tilrxgmxdkmroge2dqorvguzdomzcfqrdcojsfyytmobogexdemr2gu2tenzteiwcewzsgyydgorxgaydaoryg4zwcotdmjsdmorrmnsgiorwge2dqorxmnrgcoteha4wgxj2gu2tenzueiwcewzsgyydgorxgaydaoryg4zwcotdmjsdmotggu4teorshfrtaotbgzqtgotbha4tsxj2gu2tenzuejox2xl5
> type a message and hit enter to broadcast...
"###;
const EXAMPLE_20: &str = r###"cargo add clap --features derive
"###;
const EXAMPLE_21: &str = r###"use std::{collections::HashMap, fmt, str::FromStr};

use anyhow::Result;
use clap::Parser;
use futures_lite::StreamExt;
use iroh::{protocol::Router, Endpoint, EndpointAddr, EndpointId};
use iroh_gossip::{
    api::{GossipReceiver, Event},
    net::Gossip,
    proto::TopicId,
};
use serde::{Deserialize, Serialize};

/// Chat over iroh-gossip
///
/// This broadcasts unsigned messages over iroh-gossip.
///
/// By default a new endpoint id is created when starting the example.
///
/// By default, we use the default n0 discovery services to dial by `EndpointId`.
#[derive(Parser, Debug)]
struct Args {
    /// Set your nickname.
    #[clap(short, long)]
    name: Option<String>,
    /// Set the bind port for our socket. By default, a random port will be used.
    #[clap(short, long, default_value = "0")]
    bind_port: u16,
    #[clap(subcommand)]
    command: Command,
}

#[derive(Parser, Debug)]
enum Command {
    /// Open a chat room for a topic and print a ticket for others to join.
    Open,
    /// Join a chat room from a ticket.
    Join {
        /// The ticket, as base32 string.
        ticket: String,
    },
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();

    // parse the cli command
    let (topic, endpoints) = match &args.command {
        Command::Open => {
            let topic = TopicId::from_bytes(rand::random());
            println!("> opening chat room for topic {topic}");
            (topic, vec![])
        }
        Command::Join { ticket } => {
            let Ticket { topic, endpoints } = Ticket::from_str(ticket)?;
            println!("> joining chat room for topic {topic}");
            (topic, endpoints)
        }
    };

    let endpoint = Endpoint::bind().await?;

    println!("> our endpoint id: {}", endpoint.id());
    let gossip = Gossip::builder().spawn(endpoint.clone());

    let router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    // in our main file, after we create a topic `id`:
    // print a ticket that includes our own endpoint id and endpoint addresses
    let ticket = {
        // Get our address information, includes our
        // `EndpointId`, our `RelayUrl`, and any direct
        // addresses.
        let me = endpoint.addr();
        let endpoints = vec![me];
        Ticket { topic, endpoints }
    };
    println!("> ticket to join us: {ticket}");

    // join the gossip topic by connecting to known endpoints, if any
    let endpoint_ids = endpoints.iter().map(|p| p.id).collect();
    if endpoints.is_empty() {
        println!("> waiting for endpoints to join us...");
    } else {
        println!("> trying to connect to {} endpoints...", endpoints.len());
    };
    let (sender, receiver) = gossip.subscribe_and_join(topic, endpoint_ids).await?.split();
    println!("> connected!");

    // broadcast our name, if set
    if let Some(name) = args.name {
        let message = Message::new(MessageBody::AboutMe {
            from: endpoint.id(),
            name,
        });
        sender.broadcast(message.to_vec().into()).await?;
    }

    // subscribe and print loop
    tokio::spawn(subscribe_loop(receiver));

    // spawn an input thread that reads stdin
    // create a multi-provider, single-consumer channel
    let (line_tx, mut line_rx) = tokio::sync::mpsc::channel(1);
    // and pass the `sender` portion to the `input_loop`
    std::thread::spawn(move || input_loop(line_tx));

    // broadcast each line we type
    println!("> type a message and hit enter to broadcast...");
    // listen for lines that we have typed to be sent from `stdin`
    while let Some(text) = line_rx.recv().await {
        // create a message from the text
        let message = Message::new(MessageBody::Message {
            from: endpoint.id(),
            text: text.clone(),
        });
        // broadcast the encoded message
        sender.broadcast(message.to_vec().into()).await?;
        // print to ourselves the text that we sent
        println!("> sent: {text}");
    }
    router.shutdown().await?;

    Ok(())
}

#[derive(Debug, Serialize, Deserialize)]
struct Message {
    body: MessageBody,
    nonce: [u8; 16],
}

#[derive(Debug, Serialize, Deserialize)]
enum MessageBody {
    AboutMe { from: EndpointId, name: String },
    Message { from: EndpointId, text: String },
}

impl Message {
    fn from_bytes(bytes: &[u8]) -> Result<Self> {
        serde_json::from_slice(bytes).map_err(Into::into)
    }

    pub fn new(body: MessageBody) -> Self {
        Self {
            body,
            nonce: rand::random(),
        }
    }

    pub fn to_vec(&self) -> Vec<u8> {
        serde_json::to_vec(self).expect("serde_json::to_vec is infallible")
    }
}

// Handle incoming events
async fn subscribe_loop(mut receiver: GossipReceiver) -> Result<()> {
    // keep track of the mapping between `EndpointId`s and names
    let mut names = HashMap::new();
    // iterate over all events
    while let Some(event) = receiver.try_next().await? {
        // if the Event is a `GossipEvent::Received`, let's deserialize the message:
        if let Event::Received(msg) = event {
            // deserialize the message and match on the
            // message type:
            match Message::from_bytes(&msg.content)?.body {
                MessageBody::AboutMe { from, name } => {
                    // if it's an `AboutMe` message
                    // add an entry into the map
                    // and print the name
                    names.insert(from, name.clone());
                    println!("> {} is now known as {}", from.fmt_short(), name);
                }
                MessageBody::Message { from, text } => {
                    // if it's a `Message` message,
                    // get the name from the map
                    // and print the message
                    let name = names
                        .get(&from)
                        .map_or_else(|| from.fmt_short().to_string(), String::to_string);
                    println!("{}: {}", name, text);
                }
            }
        }
    }
    Ok(())
}

fn input_loop(line_tx: tokio::sync::mpsc::Sender<String>) -> Result<()> {
    let mut buffer = String::new();
    let stdin = std::io::stdin(); // We get `Stdin` here.
    loop {
        stdin.read_line(&mut buffer)?;
        line_tx.blocking_send(buffer.clone())?;
        buffer.clear();
    }
}

// add the `Ticket` code to the bottom of the main file
#[derive(Debug, Serialize, Deserialize)]
struct Ticket {
    topic: TopicId,
    endpoints: Vec<EndpointAddr>,
}

impl Ticket {
    /// Deserialize from a slice of bytes to a Ticket.
    fn from_bytes(bytes: &[u8]) -> Result<Self> {
        serde_json::from_slice(bytes).map_err(Into::into)
    }

    /// Serialize from a `Ticket` to a `Vec` of bytes.
    pub fn to_bytes(&self) -> Vec<u8> {
        serde_json::to_vec(self).expect("serde_json::to_vec is infallible")
    }
}

// The `Display` trait allows us to use the `to_string`
// method on `Ticket`.
impl fmt::Display for Ticket {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let mut text = data_encoding::BASE32_NOPAD.encode(&self.to_bytes()[..]);
        text.make_ascii_lowercase();
        write!(f, "{}", text)
    }
}

// The `FromStr` trait allows us to turn a `str` into
// a `Ticket`
impl FromStr for Ticket {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let bytes = data_encoding::BASE32_NOPAD.decode(s.to_ascii_uppercase().as_bytes())?;
        Self::from_bytes(&bytes)
    }
}
"###;
const EXAMPLE_22: &str = r###"cargo run -- --name user1 open
"###;
const EXAMPLE_23: &str = r###"cargo run -- --name user2 join <ticket>
"###;
