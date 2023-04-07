+++
title = "Data Transfer Protocol"
description = ""
template="design/page.html"
[extra]
section="4."
+++

# Abstract

This page describes the network protocol as implemented in iroh v0.3.0.  This protocol is known by it Application Layer Protocol Negotiation (ALPN) string `n0/iroh/1`.

# High Level Description

The `n0/iroh/1` protocol is used to transfer collections of blobs from a *provider* to a *getter*.

- The *provider* takes the server role and accepts incoming connections.
- The *getter* takes the client role and initiates a connection which can make one or more requests
- Each request-response uses a separate QUIC stream.
- The request is the Blake3 hash of the desired **collection of blobs**.
- The *provider* responds by sending the collection metadata as a bao verified stream.  This metadata contains the hash of each blob contained in the collection.
- The *provider* sends each blob of the collection in sequence.  Each blob is sent as a small metadata structure and a bao verified stream of the contents.

# Protocol

## Transport

The `n0/iroh/1` protocol uses QUIC as network transport.

## Connection Establishment

Both the *getter* and *provider* use `n0/iroh/1` as ALPN.

Both the getter and provider generate a ed25519 keypair and use a variation of the [libp2p TLS handshake](https://github.com/libp2p/specs/blob/master/tls/tls.md) to generate and verify TLS certificates.


## Message Encodings

### Framing

The protocol makes use of *length-prefixed* message framing.

- The length prefix is written as a `u64` in **little endian** byte order.
- The length indicates the number of bytes in the message frame, excluding the length-prefix itself.

### Data Encoding

While some messages contain raw blob data, when messages contain other data which need to be encoded and decoded.  For this [the Postcard Wire Specification](https://postcard.jamesmunns.com/) is used.

## Request Handling

Each request from the *getter* must be in a new QUIC bi-directional stream.

### Handshake Message

The first message of each request is a `Handshake` message sent by the *getter*:

```rust
struct Handshake {
    version: u64,
    token: AuthToken,
}

struct AuthToken {
    bytes: [u8; 32]
}
```

- `version` is set to `1` indicating this protocol.
- `token` are some random bytes used to authenticate the *getter* to the *provider*.  The *provider* could use this to only allow requests from authorised tokens.

The message is sent as a Postcard-encoded length-prefixed frame as described in [Data Encoding](https://www.notion.so/Data-Encoding-bacc8298c5be4c56b100dd08c3391ad6).

### Request Message

The second message in the stream is the request, sent by the getter:

```rust
struct Request {
    name: Hash
}

struct Hash([u8; 32])
```

- `name` contains the Blake3 hash of the collection requested.

The message is sent as a Postcard-encoded length-prefixed frame as described in [Data Encoding](https://www.notion.so/Data-Encoding-bacc8298c5be4c56b100dd08c3391ad6).

After having sent the request the *getter* should finish the send-half of the stream, signalling that no more data will be sent over it.  The *provider* should read to the end of this stream.

## Response Handling

After receiving the request, the *provider* sends a first response message.  This either indicates the collection is available and will be returned, or it was not available.  The response message looks like this:

```rust
struct Response {
    data: Res,
}

struct Res {
    NotFound,
    Found,
    FoundCollection {
        total_blobs_size: u64,
    }
}
```

- `NotFound` means the *provider* does not have the requested item, this is used for both blobs (see later) or collections.
- `Found` is only used for transferring blobs to the client, see later.
- `FoundCollection` is used in the first response message if the collection can be transferred.
- `total_blobs_size` indicates the sum of all the raw sizes of the blobs in the collection.  This is not the same as the size that will flow over the network due to encoding overheads.

The message is sent as a Postcard-encoded length-prefixed frame as described in [Data Encoding](https://www.notion.so/Data-Encoding-bacc8298c5be4c56b100dd08c3391ad6).

### Collection Not Found

If a collection is not found the *provider* responds with a `Res::NotFound` message wrapped in a `Response`.  After this it finishes it’s send-half of the stream.  It can now close the stream as it is fully done.

The *getter* should read to the end of the stream.

### Collection Found

If a collection is available the *provider* responds with a `Res::FoundCollection` message wrapped in a `Response`.

### Collection Payload

After the *provider* sent the `Res::FoundCollection` message it sends the **bao encoded** collection metadata.  This is **not** sent as a length-prefixed message but directly as the bao **Combined Encoding Format**.  The client must read to the end of this bao data and can verify it using the hash it sent in the request.

Once the collection payload is decoded from the bao encoding it can be decoded using postcard and contains:

```rust
struct Collection {
    name: String,
    blobs: Vec<Blob>,
    total_blobs_size: u64,
}

struct Blob {
    name: String,
    hash: Hash,
}
```

- `Collection::name`contains an arbitrary name for the collection.  Not used by the protocol.
- `blobs` contains an **ordered** sequence of blobs in the collection.  Blobs can be referred to by their index in this sequence.
- `total_blobs_size` indicates the sum of all the raw sizes of the blobs in the collection.  This is not the same as the size that will flow over the network due to encoding overheads.
- `Blob::name` contains an arbitrary name for the blob.  Not used by the protocol.
- `hash` contains the Blake3 hash of the blob.

### Blob Messages

Next, the *provider* sends all the blobs in the collection on the stream.  Blobs are sent in the order they appear in the `Collection` structure.  For each blob two items are sent:

- A framed `Response` message with the `Res::Found` item as described here: [https://www.notion.so/number-zero/n0-iroh-1-network-protocol-f4f6d840f82e413f98dfc7bae527f3ec?pvs=4#d184b709cbd74bd1b1f4f04f0e062bac](https://www.notion.so/n0-iroh-1-network-protocol-f4f6d840f82e413f98dfc7bae527f3ec)
- The blob payload.  **Not* snt as a length-prefixed message but directly as the boa Combined Encoding Format.  The client must read to the end of this bao data and can verify it using the hash extracted from the collection metadata.

During sending a *provider* could discover does not have the data for one of the blobs.  In this case it will send a `Response` containing `Res::NotFound` instead of `Res::Found`.  After that it will finish the stream and not send further blobs.

# Fix Proposals

We fully admit: this is a bit clunky in places.

## Remove `Res` struct

Currently `Response` just wraps `Res`.  We can rename `Res` to `Response` and remove the former `Response`.  It is an unneeded indirection.

I think originally `Response` included a `request_id` field.  But that is no longer used.

## Remove duplication of `total_blobs_size`

The `total_blobs_size` is sent back twice:

- In the `Collection` struct containing collection metadata.
- In the `Res::FoundCollection` response.

Removing it from `Res::FoundCollection` may make the most sense, because `Res::Found` also does not mention the size.  The other option is to add it to `Res::Found` but that’s not very useful since the first thing the bao encoding sends is the size.

## Remove `Res` entirely

It does not provide much functionality because if we do not find something, the blob or the collection, we simply end up closing the stream.  So instead we can use `SendStream::reset` with a new `CloseReason::NotFound`.   This would communicate the same but simpler and fewer packets.

(`SendStream` and `CloseReason` are code references, not mentioned in the protocol description here.)

Already `Res::NotFound` does not include any information about which hash was not found.  This you have to deduce from when you receive it.  However, if we instead reset the stream we **do lose information** we had before: resetting the stream means all buffers are dropped on the floor, no more retransmitting etc.  So you won’t be able the know **which** blob the provider doesn’t have.  I don’t think this is a problem at all, you don’t really need to know this.

Possibly you could distinguish between `CloseReason::BlobNotFound` and `CloseReason::CollectionNotFound`.  However I don’t think this really gives you much extra information so I would avoid this.

## Remove `Handshake::version`

We already use the ALPN. This is redundant.

This would mean each request stream starts with a handshake package looking like this:

```rust
struct Handshake {
    token: Authtoken,
}
```

(`AuthToken` is basically an array - we need to check serde/postcard if we can just use the array inplace there for this doc.)

I think that is fine, it allows the *provider* to use different auth tokens for different collections.

# Problems

## No request by Blake3 hash

Our protocol in it's current state can not really do content addressing. We can not retrieve something by knowing the Blake3 hash because we need to know the hash of the `Collection` which wraps it. But this has an arbitrary `name` field in it as well as arbitrary names for each blob. So even if you know the hash of a blob you can not retrieve it.

# References

1. **Transport Layer Security (TLS) Application-Layer Protocol Negotiation Extension** <br />
[https://datatracker.ietf.org/doc/html/rfc7301](https://datatracker.ietf.org/doc/html/rfc7301)
2. **bao**<br />
[https://github.com/oconnor663/bao](https://github.com/oconnor663/bao)
3. **QUIC, RFC9000:**<br />
[https://www.rfc-editor.org/rfc/rfc9000.html](https://www.rfc-editor.org/rfc/rfc9000.html)
4. **libp2p TLS handshake:**<br />
[https://github.com/libp2p/specs/blob/master/tls/tls.md](https://github.com/libp2p/specs/blob/master/tls/tls.md)
5. **The Postcard Wire Specification:**<br />
[https://postcard.jamesmunns.com/](https://postcard.jamesmunns.com/)
