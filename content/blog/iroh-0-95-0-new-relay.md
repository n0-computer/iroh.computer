+++
title = "iroh 0.95.0 - A New Relay, Error Handling, and Connection API Improvements"
description = "Release of iroh v0.95"
date = "2025-11-05"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a library for building direct connections between devices, putting more control in the hands of your users.

We've been busy shipping improvements across the iroh stack, from infrastructure updates to major API refinements.

First, we're expanding our relay infrastructure with a new west coast US region, giving you more options for potential low latency home relays.

We're also excited to share `n0-error`, our new error handling crate that strikes a better balance between the complexity needed for stack traces and the ergonomics we need for daily development.

On the API front, we've made important improvements to the connection lifecycle, especially around 0-RTT connections. The `iroh::Connection` type now provides infallible access to the remote endpoint ID and ALPN information, and we've restructured the 0-RTT API with clearer types and semantics. These changes make the API more intuitive and help prevent common usage errors.

## 🏋️‍♂️ NA West relay {#na-west-relay}

We’ve added another region to our default public relays! We now host a relay, currently running with `v0.95.0`, on the west coast of the US.

This relay will continue to update alongside the other canary relays.

The canary relays are still valid for versions `v0.93.0` and newer.

Public relays running versions `v0.35.0` , `v0.91.0`, and `v0.92.0` are still up.

## ❌ n0-error {#n0-error}

We recently wrote a blog post [describing our struggle to get backtraces in rust errors right](https://www.iroh.computer/blog/error-handling-in-iroh).

After using our proposed strategy for a few releases now, we realized it wasn't working for us. It was often clunky and confusing to use, and worst of all, because of the ergonomics (or lack thereof) for errors in rust, we were still not actually able to get a full backtrace for all errors in a stack.

We settled on writing our own crate, called `n0-error` that had two main focuses:

-   we wanted errors with call-site location data for the entire error stack for easier debugging
-   we wanted it to be as ergonomic as we could make it, for example, we wanted it to:
    -   be simple to create error enums and structs
    -   be easy to use with `anyhow` for example crates and binaries
    -   work well with IDEs, for example, making it easy to jump to definitions while coding

One important thing to note: `n0-error`s implement `std::error::Error`, so you don't have to adopt `n0-error` in your codebase if you are using `iroh`, unless you need an advanced feature.

Take a look at the [crate](https://crates.io/crates/n0-error) and [docs](https://docs.rs/n0-error/latest/n0_error/) for `n0-error` for more details.

We will do a follow up blog post in the coming weeks that goes into more detail about `n0-error`.

### ❗ error basics {#error-basics}

The main points of focus here are the `StackError`s and `AnyError`s.

`StackError` s contain additional methods beyond the normal `std::error::Error`, including the `meta` method, that reports call-site location data.

An `AnyError` can wrap both a `StackError` and `std::error::Error`, but has the added benefit of not erasing access to the extra meta data in the `StackError`. Unfortunately, converting from a `StackError` to a `std::error::Error` would remove the ability to get any meta data from the `StackError`.

### 🔎 displaying `n0-error`s {#displaying-n0-errors}

-   Display impl (`{error}`) prints only the message of the outermost error `failed to process input`

-   Alternate display impl (`{error:#}`) prints the message for each error in the chain, in a single line `failed to process input: invalid input: wanted 23 but got 13`

-   Debug impl (`{error:?}`) prints the message and each source, on separate lines.

    ```
    failed to process input
    Caused by:
        invalid input
        wanted 23 but got 13
    ```

    If `RUST_BACKTRACE=1` or `RUST_ERROR_LOCATION=1`, then call-site location data will also be collected. This will also print the call site of each error:

    ```
    failed to process input (examples/basic.rs:61:17)
    Caused by:
         invalid input (examples/basic.rs:36:5)
         wanted 23 but got 13 (examples/basic.rs:48:13)
    ```


## 📞 Connections {#connections}

The connection API now has infallible  `Connection::remote_id()` and `Connection::alpn()` methods. Previously, these methods could fail if called before the handshake completed or if the handshake data was unavailable. Now, `Connection` guarantees that it represents a fully authenticated connection with verified remote identity and ALPN protocol, since it now can only be constructed after successful handshake completion and authentication, eliminating the need for fallible accessors.

### 🔧 **0-RTT API Improvements** {#0-rtt-api-improvements}

The 0-RTT API has been restructured with clearer types and semantics:

-   Use `Incoming::accept` to return an `Accepting`. Use `Accepting::into_0rtt` to return an `IncomingZeroRttConnection`
-   Use `Connecting::into_0rtt` to return a `OutgoingZeroRttConnection`
-   **`OutgoingZeroRttConnection`**: Represents client-side 0-RTT connections created via `Connecting::into_0rtt()`. Allows sending 0-RTT data before the handshake completes. Call `handshake_completed()` to get a `ZeroRttStatus` indicating whether the 0-RTT data was accepted or rejected by the server.
-   **`IncomingZeroRttConnection`**: Represents server-side 0-RTT/0.5-RTT connections created via `Accepting::into_0rtt()`. Allows receiving 0-RTT data from clients or sending 0.5-RTT data before the handshake completes. Call `handshake_completed()` to get a fully authenticated `Connection`.
-   **`ZeroRttStatus` enum**: Returned by `OutgoingZeroRttConnection::handshake_completed()` to indicate whether the server accepted or rejected the 0-RTT data:
    -   `ZeroRttStatus::Accepted(Connection)`: 0-RTT data was accepted, streams opened before handshake remain valid
    -   `ZeroRttStatus::Rejected(Connection)`: 0-RTT data was rejected, pre-handshake streams will error and data must be resent

These types replace the previous version of `Connection` & the `ZeroRttAccepted` type and provide a more explicit API for handling 0-RTT connection states and outcomes.

## 💡 Note to protocol developers {#note-to-protocol-developers}

Adding an `Accepting` type, now means that the `ProtocolHandler` trait is different.

Rather than implementing `ProtocolHandler::on_connecting`, that accepts a `Connecting`, you now must implement `ProtocolHandler::on_accepting`, that accepts an `Accepting`.

This is largely just a name change unless you were using 0-RTT connections. In which case, it's possible you may want to handle your entire protocol in `ProtocolHandler::on_accepting`. This is fine, since `on_accepting` can handle long-running processes. If you choose to go down this path, it’s acceptable for the `ProtocolHandler::accept` method to be empty except for a `return Ok(());`.

See the [documentation](https://docs.rs/iroh/latest/iroh/protocol/trait.ProtocolHandler.html#method.on_accepting) for more details.

## ⚠️ Breaking Changes {#breaking-changes}

-   `iroh-dns-server`
    -   upgraded to redb version 3 - you must run with version 0.93 at least once to upgrade the database
-   `iroh`
    -   changed
        -   All errors have changed from `snafu` errors to `n0-error` errors.
        -   `ConnectError::Connection` - fields changed
        -   `AcceptError::Connection` - fields changed
        -   `AcceptError::MissingRemoteEndpointId` - fields changed
        -   `AcceptError::NotAllowed` - fields changed
        -   `AcceptError::User` - fields changed
        -   `Connecting::into_0rtt` -> returns `Result<OutgoingZeroRttConnection, Connecting>`
    -   `removed`
        -   `ProtocolHandler::on_connecting()` removed - implement `on_accepting()` instead, which takes `Accepting` rather than `Connecting`
        -   `DynProtocolHandler::on_connecting()` removed - implement `on_accepting()` instead
        -   `iroh::endpoint::IncomingFuture` - use `Accepting` instead
        -   `iroh::endpoint::ZeroRttAccepted` - replaced by explicit 0-RTT connection types

## 🎉 The end of the (0.)90s is coming {#the-end-of-the-0-90s-is-coming}

We have been working on these releases for quite a while now, and are excited to let you know that we expect only one more release in the 9Xs canary series. `0.96` will bring you multipath, finally, and once all critical issues are fixed, we expect to publish our first release candidate `1.0.0-rc.0` later this year

All the nitty and gritty details can be found in the [updated roadmap](https://iroh.computer/roadmap), and in [our milestones on github](https://github.com/n0-computer/iroh/milestones), which we will keep updating as we go

### But wait, there's more! {#but-wait-there-s-more}

Many bugs were squashed, and smaller features were added. For all those details, check out the full changelog: [https://github.com/n0-computer/iroh/releases/tag/v0.95.0](https://github.com/n0-computer/iroh/releases/tag/v0.95.0).

If you want to know what is coming up, check out the [v0.96.0 milestone](https://github.com/n0-computer/iroh/milestone/50), and if you have any wishes, let us know about the [issues](https://github.com/n0-computer/iroh/issues)! If you need help using iroh or just want to chat, please join us on [discord](https://discord.com/invite/DpmJgtU7cW)! And to keep up with all things iroh, check out our [Twitter](https://x.com/iroh_n0), [Mastodon](https://mastodon.social/@n0iroh), and [Bluesky](https://bsky.app/profile/iroh.computer).
