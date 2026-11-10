+++
title = "irpc 1.0"
description = ""
date = "2026-11-10"
author = "Rüdiger Klaehn"
social_image = ""
draft = false
+++

Today we released irpc 1.0. Many of our public iroh protocols are built on irpc, so releasing a stable version is a prerequisite and major milestone for releasing stable versions of these protocols.

## What is irpc

Irpc is a library for RPC-style interactions using in-process or cross-process message passing.

Irpc has been our go-to tool both to implement new iroh protocols and frequently even to define in-process protocols, including internally in iroh services. It is lightweight enough to use it for [IoT projects] on extremely resource-constrained devices such as ESP32 embedded computers.

### RPC

Irpc allows multiple interaction patterns, such as server streaming or client streaming. But they all start with a request from the client to the server.

So when defining a new protocol, you start by defining an enum enumerating the requests, and then annotating it with the type of update and response for each request.

```rust
#[derive(Debug, Serialize, Deserialize)]
struct Get {
    key: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct List;

#[derive(Debug, Serialize, Deserialize)]
struct Set {
    key: String,
    value: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SetMany;

#[rpc_requests(message = StorageMessage)]
#[derive(Serialize, Deserialize, Debug)]
enum StorageProtocol {
    #[rpc(tx=oneshot::Sender<Option<String>>)]
    Get(Get),
    #[rpc(tx=oneshot::Sender<()>)]
    Set(Set),
    #[rpc(tx=oneshot::Sender<u64>, rx=mpsc::Receiver<(String, String)>)]
    SetMany(SetMany),
    #[rpc(tx=mpsc::Sender<String>)]
    List(List),
}
```

You can use any combination of receive (rx) and transmit (tx) stream types. For the most common ones we have syntax sugar.

| tx \ rx  | none                 | oneshot | mpsc                 |
|----------|----------------------|---------|----------------------|
| none     | [`notify`]           | -       | [`notify_streaming`] |
| oneshot  | [`rpc`]              | -       | [`client_streaming`] |
| mpsc     | [`server_streaming`] | -       | [`bidi_streaming`]   |

### Channels

When used in-process, irpc channels have zero overhead over just tokio oneshot and mpsc channels. Messages are not serialized, and all senders and receivers have special cases for in-process to prevent allocations.

So irpc message handling will look very similar to Rust async message handling, with `select!` or stream combinators.

When used cross-process, irpc works over [QUIC] connections, either iroh connections or connections using our QUIC implementation [noq]. It takes advantage of the [cheap streams] of QUIC to multiplex rpc requests.

### Wire format

The wire format is incredibly simple: length-prefixed, [postcard]-serialized messages. Most of the heavy lifting - [encryption], [stream multiplexing], [termination signalling] - is handled by QUIC.

<div>
  <img class="theme-light" src="/blog/irpc-1-0/frames.svg" alt="Requests and oneshot values are a varint length followed by the postcard-encoded message. mpsc values add a one-byte end marker, 0 for complete and 1 for aborted, which the length includes." />
  <img class="theme-dark" src="/blog/irpc-1-0/frames-dark.svg" alt="Requests and oneshot values are a varint length followed by the postcard-encoded message. mpsc values add a one-byte end marker, 0 for complete and 1 for aborted, which the length includes." />
</div>

<div>
  <img class="theme-light" src="/blog/irpc-1-0/streams.svg" alt="Every request opens one bidirectional QUIC stream. The client sends the request frame, followed by the rx channel frames if there is one. The server answers on the other direction with the tx channel frames. Each direction ends with a QUIC FIN." />
  <img class="theme-dark" src="/blog/irpc-1-0/streams-dark.svg" alt="Every request opens one bidirectional QUIC stream. The client sends the request frame, followed by the rx channel frames if there is one. The server answers on the other direction with the tx channel frames. Each direction ends with a QUIC FIN." />
</div>

## What was done for 1.0

If you look at the commit history, you will notice that irpc has seen very little activity in the last months, despite irpc being extensively used in our internal and public protocols as well as in every single IoT proof of concept. It already worked very well for us.

<div>
  <img class="theme-light" src="/blog/irpc-1-0/timeline.svg" alt="Lines changed per day on irpc main from June 2026 to the 1.0 release: almost nothing over the summer, then a dense push from late September up to the release." />
  <img class="theme-dark" src="/blog/irpc-1-0/timeline-dark.svg" alt="Lines changed per day on irpc main from June 2026 to the 1.0 release: almost nothing over the summer, then a dense push from late September up to the release." />
</div>

We were already very happy with the behaviour on the happy path. Most of the work to stabilize the API was concerned with errors and cancellations.

### Errors

We have reorganized the errors so that there is a clear distinction between errors that can happen locally, errors during serialization or deserialization of a particular message, and errors due to the underlying connection.

If, like in many prototypes, you don't do much with errors other than log them, you won't even notice the changes. For production-quality projects this makes it easier to provide good logging as well as to recover from some errors.

```rust
pub enum SendError {
    ReceiverClosed,                               // local
    Rpc { source: RpcSendError },                 // remote
}

pub enum RpcSendError {
    MaxSizeExceeded,                              // serialization
    EncodeFailed { source: postcard::Error },     // serialization
    Closed,                                       // serialization, earlier message
    Remote { code: ErrorCode },                   // peer stopped the stream
    ConnectionClosed { close: ConnectionClose },  // connection
    ConnectionFailed { source: io::Error },       // connection
}
```

### Cancellation

The largest work item, and also the one that required us to change the wire format in a compatible way, was to handle cancelled sends for the mpsc sender.

Unlike sending a message in-process, sending a long message over the wire is not atomic. You might send a few bytes over the wire before your send future gets cancelled.

Nevertheless, a cancelled send future should guarantee that the message *does not get received* and should not terminate the *entire* mpsc stream. Otherwise you might get a nasty surprise if you write code involving timeouts that works fine locally.

Our encoding is using varint length prefixes. So once we have written the length prefix we are committed to writing `length` bytes. So we have to add an additional byte to signal if the message was sent to the end or cancelled.

If that byte is set to cancelled, we still have to send the entire frame, but it will be completely ignored on the receive side.

The result of all this machinery is that the send future is now cancellation safe for both local and remote sends.

> [!NOTE]
> We have briefly experimented with [COBS] encoding. COBS encoding would allow to terminate a cancelled message immediately, but it has performance problems for the happy path.
>
> We might add COBS support as an optional feature in the future.

### Protocol evolution

Prior to 1.0, irpc would immediately abort the entire connection as soon as it would receive a message that it could not decode. In most cases this is the right thing to do. When using irpc internally you want to have the same protocol enum on both sides. But this behaviour made it hard to evolve a protocol. So now we have an option, [`Handler::skip_bad_requests`], to only fail the request that could not be decoded and keep the connection open.

This allows a primitive form of protocol evolution by just adding new request variants *at the end* of the request enum and handling the errors. It only works if the server already had `skip_bad_requests` enabled in the old version, so you have to turn it on from the start if you want to evolve the protocol this way.

We have a much more sophisticated system for protocol evolution, [irpc-schema]. This allows not just *evolving* protocols but serving *multiple* protocols from the same ALPN. Very roughly this works by giving each rpc call a unique [BLAKE3] hash that is derived from a structural or semantic schema of the call. We will talk about this more in the future, but using it also requires the `skip_bad_requests` mechanism.

Note that irpc-schema just changes the way the protocol enums are serialized, so it is fully compatible with irpc 1.0.

### Tracing spans

Tracing is no longer an optional dependency. Despite it being 0.1, we decided to have it in the public API. This allowed us to simplify the feature flags. Tracing-subscriber is available via an optional feature flag, and opentelemetry has moved into a separate crate.

In terms of functionality, we now use the QUIC stream id as a request id, and create a span for each request on both the client and the server, so the log lines for a request can be matched up across both sides of the connection.

> [!NOTE]
> QUIC never reuses a stream id within a connection, but every connection starts counting from zero. So the request id is only unique per connection. On the server, the request span is nested in a connection span, so the two together identify a request.

## Next steps

Releasing 1.0 doesn't mean that irpc is done. We are confident that it does the job very well for many use cases, and we are committed to the wire format. But we already have some additional convenience functions planned that are purely additive and can be released later.

As always, the full set of changes is in the [changelog].

See you at the next release, and keep [filing] those bugs!

[`notify`]: https://docs.rs/irpc/1.0.0/irpc/struct.Client.html#method.notify
[`notify_streaming`]: https://docs.rs/irpc/1.0.0/irpc/struct.Client.html#method.notify_streaming
[`rpc`]: https://docs.rs/irpc/1.0.0/irpc/struct.Client.html#method.rpc
[`client_streaming`]: https://docs.rs/irpc/1.0.0/irpc/struct.Client.html#method.client_streaming
[`server_streaming`]: https://docs.rs/irpc/1.0.0/irpc/struct.Client.html#method.server_streaming
[`bidi_streaming`]: https://docs.rs/irpc/1.0.0/irpc/struct.Client.html#method.bidi_streaming
[`Handler::skip_bad_requests`]: https://docs.rs/irpc/1.0.0/irpc/rpc/struct.Handler.html#method.skip_bad_requests
[irpc-schema]: https://github.com/n0-computer/irpc-schema
[BLAKE3]: https://github.com/BLAKE3-team/BLAKE3
[COBS]: https://en.wikipedia.org/wiki/Consistent_Overhead_Byte_Stuffing
[postcard]: https://docs.rs/postcard/latest/postcard/
[changelog]: https://github.com/n0-computer/irpc/releases/tag/v1.0.0
[filing]: https://github.com/n0-computer/irpc/issues
[QUIC]: https://docs.iroh.computer/protocols/using-quic
[noq]: https://docs.rs/noq/latest/noq/
[cheap streams]: https://docs.iroh.computer/protocols/using-quic#multiple-requests-%26-responses
[encryption]: https://docs.iroh.computer/concepts/security-privacy#data-privacy-with-end-to-end-encryption
[termination signalling]: https://docs.iroh.computer/protocols/using-quic#aborting-streams
[stream multiplexing]: https://docs.iroh.computer/protocols/using-quic#multiple-requests-%26-responses
[IoT projects]: /blog/an-iroh-powered-smart-fan
