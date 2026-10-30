//! Content for `/docs/protocols/writing`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsProtocolsWriting() -> Element {
    rsx! {
        h1 { id: "writing-your-own-protocol", "Writing your own Protocol" }
        p {
            "So you've read "
            a { href: "/docs/concepts/protocol", "what an iroh protocol is" }
            " and know "
            a { href: "/docs/concepts/router", "what an iroh router is" }
            ", and you're eager to start implementing your own iroh protocol? This is a short guide to show you how."
        }
        h2 { id: "what-we-ll-build", "What we'll build" }
        p {
            {EXAMPLE_1}
            a { href: "/docs/quickstart", "the quickstart" }
            "), and instead run both sides of the protocol as a test run in the "
            code { "main()" }
            " function."
        }
        p { "The protocol itself works like this:" }
        ol {
            li { "The accepting side waits for the connecting side to open a connection." }
            li {
                "Once a connection is established, the accepting side waits for the connecting side to open a bi-directional stream."
            }
            li { "The connecting side transfers some payload on the bi-directional stream first." }
            li {
                "The accepting side reads the payload and transfers it back on the same bi-directional stream."
            }
            li {
                "Once the connecting side has finished sending, it reads \"the echo\" back and then closes the connection."
            }
        }
        h2 { id: "listening-for-connections", "Listening for connections" }
        p {
            "As established in the "
            a { href: "/docs/concepts/router", "router" }
            " and "
            a { href: "/docs/concepts/protocol", "protocol" }
            {EXAMPLE_2}
        }
        pre {
            code { {EXAMPLE_3} }
        }
        p {
            "The easiest way to start listening for incoming connections is by using iroh's "
            a { href: "https://docs.rs/iroh/latest/iroh/protocol/struct.Router.html",
                code { "Router" }
                " API"
            }
            "."
        }
        pre {
            code { {EXAMPLE_4} }
        }
        p {
            "The router's "
            code { "spawn" }
            {EXAMPLE_5}
            a { href: "/docs/quickstart", "quickstart" }
            ", we would need to call "
            code { "accept" }
            {EXAMPLE_6}
            a { href: "https://docs.rs/iroh/latest/iroh/protocol/struct.RouterBuilder.html#method.accept",
                code { "accept" }
                " function"
            }
            " expects two arguments:"
        }
        ul {
            li { "The ALPN we defined for ourselves above and" }
            li {
                "something that implements "
                code { "ProtocolHandler" }
                "."
            }
        }
        p {
            "In the "
            a { href: "/docs/quickstart", "quickstart" }
            ", we used the "
            code { "Blobs" }
            " struct from the existing "
            code { "iroh-blobs" }
            " protocol, "
            a { href: "https://docs.rs/iroh-blobs/latest/iroh_blobs/net_protocol/struct.Blobs.html#impl-ProtocolHandler-for-Blobs%3CS%3E",
                "which implements "
                code { "ProtocolHandler" }
            }
            {EXAMPLE_7}
            code { "ProtocolHandler" }
            {EXAMPLE_8}
            code { "Echo" }
            "."
        }
        pre {
            code { { EXAMPLE_9
                    } }
        }
        p { "The struct is actually empty, because the protocol is fully stateless." }
        aside { class: "note",
            p {
                "If we were building a protocol for a database, then this struct would contain a database connection or the database contents directly, so that all connections can access it."
            }
        }
        p {
            "We'll also stub out an implementation of "
            code { "ProtocolHandler" }
            " for this trait:"
        }
        pre {
            code { {EXAMPLE_10} }
        }
        aside { class: "note",
            p {
                "We're using the "
                code { "n0-future" }
                " crate for the return type of "
                code { "accept" }
                {EXAMPLE_11}
                code { "std::pin::Pin<Box<dyn Future<Output = Result<()>> + Send + 'static>>" }
                {EXAMPLE_12}
                code { "futures-lite" }
                ", "
                code { "futures-util" }
                {EXAMPLE_13}
                code { "n0-future" }
                " as it re-exports all the crates we've vetted and commonly use at number 0."
            }
        }
        p {
            "The "
            code { "accept" }
            " function is going to get called once an incoming connection with the correct ALPN is established."
        }
        p {
            "Now, we can modify our router so it handles incoming connections with our newly created custom protocol:"
        }
        pre {
            code { {EXAMPLE_14} }
        }
        h2 { id: "implementing-the-accepting-side", "Implementing the Accepting Side" }
        p {
            "At the moment, the "
            code { "Echo::accept" }
            {EXAMPLE_15}
            code { "iroh::Connection" }
            {EXAMPLE_16}
            code { "Echo::accept" }
            " and handling the protocol logic within that future:"
        }
        pre {
            code { {EXAMPLE_17} }
        }
        p {
            "We're using "
            code { "tokio::io::copy" }
            " here to just copy any bytes we receive via "
            code { "recv" }
            " to the "
            code { "send" }
            {EXAMPLE_18}
            code { "connection.closed()" }
            {EXAMPLE_19}
            code { "SendStream::finish()" }
            " only "
            em { "indicates" }
            {EXAMPLE_20}
            em { "receives" }
            " data - indicate proper protocol procedure by being the side to close the connection."
        }
        aside { class: "note",
            p {
                {EXAMPLE_21}
                a { href: "https://www.iroh.computer/blog/closing-a-quic-connection",
                    "written about it"
                }
                " before, but it trips us up every now and then still."
            }
        }
        h2 { id: "implementing-the-connecting-side", "Implementing the Connecting Side" }
        p { "The connecting side is going to be the mirror image of the accepting side:" }
        ul {
            li {
                "An "
                code { "accept_bi" }
                " corresponds to an "
                code { "open_bi" }
                ","
            }
            li { "when data is received, the other side sends data," }
            li {
                "when one side waits for "
                code { "connection.closed()" }
                ", the other calls "
                code { "connection.close()" }
                "."
            }
        }
        p {
            "Summarizing our protocol again, the connecting side will open a connection, send some data, receives the echo, then finally closes the connection."
        }
        p { "This is what that looks like:" }
        pre {
            code { {EXAMPLE_22} }
        }
        p {
            "In this example we simply hard-coded the echo message \"Hello World!\", and we'll assert that that's what we receive back."
        }
        p {
            "Note that we also take a "
            code { "EndpointAddr" }
            {EXAMPLE_23}
            code { "Endpoint" }
            " where in the world to connect to in the "
            code { "endpoint.connect(addr, ALPN)" }
            " call."
        }
        h2 { id: "putting-it-all-together", "Putting it all together" }
        p {
            {EXAMPLE_24}
            code { "connect_side" }
            " and the accepting side in "
            code { "start_accept_side" }
            "."
        }
        p {
            "In a simple "
            code { "main" }
            " function we can start the accepting side and concurrently connect to it before shutting down the accepting side again:"
        }
        pre {
            code { {EXAMPLE_25} }
        }
        p { "This is what the output can look like when running:" }
        pre {
            code { { EXAMPLE_26
                    } }
        }
        p {
            "You can find all of the code in the "
            a { href: "https://github.com/n0-computer/iroh/blob/main/iroh/examples/echo.rs",
                code { "echo.rs" }
                " example"
            }
            " in the iroh repo."
        }
        h1 { id: "appendix", "Appendix" }
        h2 { id: "no-router-no-problem", "No router no problem" }
        p {
            {EXAMPLE_27}
            a { href: "https://docs.rs/iroh/latest/iroh/protocol/struct.Router.html",
                code { "Router" }
                " API"
            }
            " is too limited or perhaps too complex for your use case, it's fairly simple to replace with your own accept loop based on only "
            code { "iroh::Endpoint" }
            " APIs."
        }
        p {
            "To replace the router accept loop, you need to spawn your own tokio task instead of calling "
            code { "iroh::protocol::RouterBuilder::spawn" }
            {EXAMPLE_28}
            code { "iroh::Endpoint::accept" }
            {EXAMPLE_29}
        }
        p {
            "Putting it all together, you only need to change the "
            code { "start_accept_side" }
            " function:"
        }
        pre {
            code { {EXAMPLE_30} }
        }
        p {
            "We also return an "
            code { "iroh::Endpoint" }
            " instead of an "
            code { "iroh::protocol::Router" }
            {EXAMPLE_31}
            code { "main" }
            " function would need to call "
            code { "endpoint.close()" }
            " instead of "
            code { "router.shutdown()" }
            ", but otherwise it's the same."
        }
        p {
            "Note that in this case, you don't even need to implement the "
            code { "ProtocolHandler" }
            {EXAMPLE_32}
            code { "Router" }
            {EXAMPLE_33}
            code { "Echo.accept(connection)" }
            {EXAMPLE_34}
        }
        p {
            "You can see a version of the echo example completely without using a router or protocol handler trait in the "
            a { href: "https://github.com/n0-computer/iroh/blob/main/iroh/examples/echo-no-router.rs",
                code { "echo-no-router.rs" }
                " example"
            }
            "."
        }
        h2 { id: "general-guidance", "General Guidance" }
        p { {EXAMPLE_35} }
        ul {
            li {
                strong { "Re-use connections" }
                {EXAMPLE_36}
                code { "connection.accept_bi()" }
                {EXAMPLE_37}
                em { "really" }
                " cheap, as it doesn't need extra round-trips for the stream to get established, which is not the case for connections (unless in special circumstances when you're using the QUIC 0-RTT feature)."
            }
            li {
                strong { "Beware: QUIC streams are lazy" }
                ": Make sure that when you call "
                code { "connection.open_bi()" }
                ", you "
                em { "always send first" }
                {EXAMPLE_38}
                em { "send" }
                {EXAMPLE_39}
            }
            li {
                strong { "Closing QUIC connections can be hard" }
                {EXAMPLE_40}
                code { "Endpoint::close" }
                {EXAMPLE_41}
                a { href: "https://www.iroh.computer/blog/closing-a-quic-connection",
                    "closing connections"
                }
                "."
            }
        }
        hr {}
        p {
            {EXAMPLE_42}
            a { href: "https://iroh.computer/discord", "iroh discord" }
            {EXAMPLE_43}
        }
    }
}
const EXAMPLE_1: &str = r###"In this guide we'll implement a very basic echo protocol.
For simplicity, we're not going to implement a CLI for this (unlike what we did in "###;
const EXAMPLE_2: &str = r###" pages, you'll first need to decide on an "Application-Layer Protocol Negotiation" (ALPN) string.
We'll use "iroh-example/echo/0":"###;
const EXAMPLE_3: &str = r###"const ALPN: &[u8] = b"iroh-example/echo/0";
"###;
const EXAMPLE_4: &str = r###"async fn start_accept_side() -> anyhow::Result<iroh::protocol::Router> {
    let endpoint = iroh::Endpoint::.bind().await?;

    let router = iroh::protocol::Router::builder(endpoint)
        .spawn();

    Ok(router)
}
"###;
const EXAMPLE_5: &str = r###" function is what starts an accept loop.
As you saw in the "###;
const EXAMPLE_6: &str = r###" on the router's builder before, to avoid rejecting every incoming connection attempt, though.
The "###;
const EXAMPLE_7: &str = r###".
In this example, we'll build our own struct and implement "###;
const EXAMPLE_8: &str = r###" ourselves.
Let's call this struct "###;
const EXAMPLE_9: &str = r###"#[derive(Debug, Clone)]
struct Echo;
"###;
const EXAMPLE_10: &str = r###"impl iroh::protocol::ProtocolHandler for Echo {
    /// The `accept` method is called for each incoming connection for our ALPN.
    ///
    /// The returned future runs on a newly spawned tokio task, so it can run as long as
    /// the connection lasts without blocking other connections.
    fn accept(&self, connection: iroh::Connection) -> n0_future::boxed::BoxFuture<Result<()>> {
        Box::pin(async move {
            // TODO!

            Ok(())
        })
    }
}
"###;
const EXAMPLE_11: &str = r###" here.
This is just a shorthand for "###;
const EXAMPLE_12: &str = r###" (which is a mouthful!).
This shorthand is also provided by "###;
const EXAMPLE_13: &str = r###" and many more.
We simply use "###;
const EXAMPLE_14: &str = r###"async fn start_accept_side() -> anyhow::Result<iroh::protocol::Router> {
    let endpoint = iroh::Endpoint::bind().await?;

    let router = iroh::protocol::Router::builder(endpoint)
        .accept(ALPN, Echo) // This makes the router handle incoming connections with our ALPN via Echo::accept!
        .spawn();

    Ok(router)
}
"###;
const EXAMPLE_15: &str = r###" function is still stubbed out.
The way it is currently implemented, it would drop the "###;
const EXAMPLE_16: &str = r###" immediately, causing the connection to close.
Instead, we need to hold on to either the connection or one of its streams for as long as we want to interact with it.
We'll do that by moving the connection to the future we return from "###;
const EXAMPLE_17: &str = r###"impl ProtocolHandler for Echo {
    fn accept(&self, connection: Connection) -> BoxFuture<Result<()>> {
        Box::pin(async move {
            // We can get the remote's endpoint id from the connection.
            let endpoint_id = connection.remote_id()?;
            println!("accepted connection from {endpoint_id}");

            // Our protocol is a simple request-response protocol, so we expect the
            // connecting peer to open a single bi-directional stream.
            let (mut send, mut recv) = connection.accept_bi().await?;

            // Echo any bytes received back directly.
            // This will keep copying until the sender signals the end of data on the stream.
            let bytes_sent = tokio::io::copy(&mut recv, &mut send).await?;
            println!("Copied over {bytes_sent} byte(s)");

            // By calling `finish` on the send stream we signal that we will not send anything
            // further, which makes the receive stream on the other end terminate.
            send.finish()?;

            // Wait until the remote closes the connection, which it does once it
            // received the response.
            connection.closed().await;

            Ok(())
        })
    }
}
"###;
const EXAMPLE_18: &str = r###" side of the bi-directional stream.
Before we drop the connection, we briefly wait for "###;
const EXAMPLE_19: &str = r###".
This effectively allows the connecting side to be the side that acknowledges that it received all data.
Remember: Dropping the connection essentially "interrupts" all work on that connection, including sending or retransmitting lost data.
Calling "###;
const EXAMPLE_20: &str = r###" that we're done sending data, but doesn't wait for all data to be sent.
Instead, we'll make the connecting side - as the side that last "###;
const EXAMPLE_21: &str = r###"Closing connections properly with QUIC can be quite hard sometimes.
We've "###;
const EXAMPLE_22: &str = r###"async fn connect_side(addr: EndpointAddr) -> Result<()> {
    let endpoint = Endpoint::bind().await?;

    // Open a connection to the accepting endpoint
    let conn = endpoint.connect(addr, ALPN).await?;

    // Open a bidirectional QUIC stream
    let (mut send, mut recv) = conn.open_bi().await?;

    // Send some data to be echoed
    send.write_all(b"Hello, world!").await?;

    // Signal the end of data for this particular stream
    send.finish()?;

    // Receive the echo, but limit reading up to maximum 1000 bytes
    let response = recv.read_to_end(1000).await?;
    assert_eq!(&response, b"Hello, world!");

    // Explicitly close the whole connection.
    conn.close(0u32.into(), b"bye!");

    // The above call only queues a close message to be sent (see how it's not async!).
    // We need to actually call this to make sure this message is sent out.
    endpoint.close().await;
    // If we don't call this, but continue using the endpoint, we then the queued
    // close call will eventually be picked up and sent.
    // But always try to wait for endpoint.close().await to go through before dropping
    // the endpoint to ensure any queued messages are sent through and connections are
    // closed gracefully.
    Ok(())
}
"###;
const EXAMPLE_23: &str = r###" as a parameter.
This is the address of the accepting side, so we can use it to tell the "###;
const EXAMPLE_24: &str = r###"Now we have both sides of our protocol implemented!
The connect side in "###;
const EXAMPLE_25: &str = r###"#[tokio::main]
async fn main() -> Result<()> {
    let router = start_accept_side().await?;
    let endpoint_addr = router.endpoint().addr().await?;

    connect_side(endpoint_addr).await?;

    // This makes sure the endpoint in the router is closed properly and connections close gracefully
    router.shutdown().await?;

    Ok(())
}
"###;
const EXAMPLE_26: &str = r###"accepted connection from fb970f941d38eb5ef357316f13a6dc24f35f74d3403b1b9de79bd698a6531a79
Copied over 13 byte(s)
"###;
const EXAMPLE_27: &str = r###"The router can make writing code with iroh easier, but it's not required.
If the "###;
const EXAMPLE_28: &str = r###".
This task then calls "###;
const EXAMPLE_29: &str = r###" in a loop and passes the incoming connections on to the same handler we looked at before.
You also need to make sure to configure the right ALPNs on the endpoint yourself."###;
const EXAMPLE_30: &str = r###"async fn start_accept_side() -> anyhow::Result<iroh::Endpoint> {
    let endpoint = Endpoint::builder()
        // The accept side needs to opt-in to the protocols it accepts,
        // as any connection attempts that can't be found with a matching ALPN
        // will be rejected.
        .alpns(vec![ALPN.to_vec()])
        .bind()
        .await?;

    // spawn a task so that `start_accept_side` returns immediately and we can continue in main().
    tokio::spawn({
        let endpoint = endpoint.clone();
        async move {
            // This task won't leak, because we call `endpoint.close()` in `main()`,
            // which causes `endpoint.accept().await` to return `None`.
            // In a more serious environment, we recommend avoiding `tokio::spawn` and use either a `TaskTracker` or
            // `JoinSet` instead to make sure you're not accidentally leaking tasks.
            while let Some(incoming) = endpoint.accept().await {
                // spawn a task for each incoming connection, so we can serve multiple connections asynchronously
                tokio::spawn(async move {
                    let connection = incoming.await?;
                    let result = Echo.accept(connection).await?;
                    result
                });
            }

            anyhow::Ok(())
        }
    });

    Ok(endpoint)
}
"###;
const EXAMPLE_31: &str = r###".
This means our "###;
const EXAMPLE_32: &str = r###" trait.
The only reason it exists is to provide an interface between protocols and the "###;
const EXAMPLE_33: &str = r###".
If we're not using the router, then we could replace our "###;
const EXAMPLE_34: &str = r###" call above with whatever function we'd like.
We could even inline the whole function call instead."###;
const EXAMPLE_35: &str = r###"The echo example is a very simple protocol.
There's many ways in which a protocol in practice is going to be more complex.
Here's some advice that might be useful if you write your own protocol:"###;
const EXAMPLE_36: &str = r###": The version of the echo protocol above simply closes the connection after having echo-ed one stream.
This is needlessly wasteful, if e.g. you'd want to echo multiple times or periodically.
Instead, you could put a loop around "###;
const EXAMPLE_37: &str = r###" to accept multiple streams to echo on for the same connection.
In practice, protocols often re-use the same connection for performance.
Opening a QUIC stream is "###;
const EXAMPLE_38: &str = r###" before you receive data.
This is because the other side doesn't even know about a stream unless you "###;
const EXAMPLE_39: &str = r###" data on the stream first.
This property is called "laziness" - as opposed to being "eager".
The other side that accepts the stream will know about it at the same time that it gets the first bits of data."###;
const EXAMPLE_40: &str = r###": This was already mentioned above, but it's worth re-iterating.
As a general rule of thumb: The side to last read data should be the side to close a connection.
Also try to always wait for "###;
const EXAMPLE_41: &str = r###" before dropping your endpoint, as that's required to make connections close gracefully.
For everything else, feel free to read our blog post about "###;
const EXAMPLE_42: &str = r###"We hope the above helps you write your own iroh protocol.
Should you do so, we'd love you to share your new protocol in the "###;
const EXAMPLE_43: &str = r###"!
Have fun."###;
