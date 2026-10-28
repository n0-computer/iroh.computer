+++
title = "Announcing the iroh-blobs canary series"
description = "iroh-blobs 0.104: bug fixes, and the start of the road to 1.0"
date = "2026-10-28"
author = "Rüdiger Klaehn"
social_image = ""
draft = false
+++

Today we are releasing iroh-blobs 0.104. It contains a number of bugfixes but only a tiny number of API changes that most users won't be affected by.

This will be the last release before we start doing larger API changes to prepare for iroh-blobs 1.0. The process will be somewhat similar to the [canary series] we did for iroh itself, but much shorter.

Since irpc is a public dependency of blobs, we will also release a 1.0 version of irpc soon.

Several of the fixes, such as hash sequences not being loaded lazily, were long-standing issues that have become more urgent to fix now that there are applications such as [iroh global content discovery] that publish an endpoint id globally, and that we can finally fix now that iroh itself is at 1.0.

Others were discovered by the many external users of iroh-blobs. Iroh-blobs was originally a core part of iroh and was used in [iroh-docs] and [sendme], but these days there are so many external projects that it is hard to keep track. Fortunately that means that not just obvious bugs but also rare corner cases get found.

## Projects using iroh-blobs

Here are a few of the projects that use iroh-blobs today:

- [deCDN] is a peer-to-peer CDN for large files such as AI models and datasets. Nodes cache and serve content-addressed blobs over iroh. The deCDN team also sent us the most comprehensive list of bugs for this release, thank you!
- [DashBeam], previously AltSendme, is a cross-platform file transfer app with no accounts and no size limits, inspired by sendme.
- [Flipflop] does file sharing over persistent iroh tunnels between trusted devices.
- [Dash Chat] by darksoil studio is an offline-first peer-to-peer messenger built on p2panda and iroh.
- [Radicle], the peer-to-peer code collaboration stack, uses iroh-blobs to seed artifacts.

## What is next

The next step is to make sure the public API of iroh-blobs is minimal, so we can support iroh-blobs 1.0 for a long time without breaking changes.

Also we want to do some internal refactorings prior to 1.0 and also add an abstraction to make it easier to write new sync or async blob stores. The latter may or may not make it into 1.0, possibly under an experimental feature.

## The changes in detail

### New features

- [#283] `Downloader::builder` allows connecting to providers with a custom ALPN, e.g. for protocols like p2panda that derive ALPNs from a private network ID. `Downloader::new_with_opts` is deprecated in favor of the builder. Based on work by @maackle.

### Fixes

- [#275] Reading the children of a hash seq loaded the entire root blob into memory, so a peer could make a provider run out of memory by requesting the children of a large blob. Provider and client get and push now read hash seqs lazily, one 1 KiB chunk at a time. Stores now also send `ExportRangesItem::Size` first, as documented.
- [#309] Decoding a `RangeSpecSeq` accepted non-canonical forms. Zero deltas produced duplicate offsets, and large deltas or widths overflowed, which panics in debug builds and wraps in release builds. Non-canonical encodings are now rejected. Our own encoders never produce them, so well-behaved peers are not affected.
- [#295] A get into a local store could report success even though the store failed to import the data, e.g. when writing the final batch failed. This affected `fetch`, `execute_get`, `execute_get_many` and the downloader. The store error is now reported as `GetError::LocalFailure`.
- [#297] A truncated `export_ranges` stream, e.g. because the store shut down mid-export, looked like a complete one, so `concatenate()` returned `Ok` with truncated data. The end of the stream is now inferred from the size and the requested ranges, and a stream that ends early is an error.
- [#298] The same for `export_bao`: `data_to_vec`, `data_to_bytes`, `write` and `stream()` could silently return truncated data. The end is now inferred from the requested ranges instead of relying on the `Done` item.
- [#293] Since tokio 1.53, dropping the fs store deadlocked, because the store's private runtime was dropped from one of its own threads. The runtime is now shut down in the background.
- [#294] Observing a poisoned entry in the fs store, e.g. one whose data file was deleted, panicked and killed the entity actor for that hash until the store was restarted. Writing to a poisoned entry reported success while storing nothing. Observe streams now end for poisoned entries, writes fail with the actual io error, and the cause of poisoning is logged.
- [#296] Re-adding the content of a poisoned entry reported success, but the blob stayed unreadable. A finished import now replaces a poisoned entry.
- [#302] An entry with external data only tried the first of its paths, so it stayed poisoned if that file was deleted, even when the same content was available at another path. All paths are now tried.
- [#299] `Blobs::add_stream` hung forever when the source stream yielded an error. The source error is now returned to the caller.
- [#282] `Hash::from_str` panicked on base32 input that does not decode to exactly 32 bytes. This was fixed before, but the fix got lost when the crate was replaced with the blobs2 code.
- [#313] `Bitfield::total_bytes` underflowed for a range starting past the size: a panic in debug builds, a huge value in release builds.
- [#285] The fs store used `max_read_duration` instead of `max_write_duration` to limit write batches, so changing `max_write_duration` had no effect. Thanks to Parth Sarthi Mishra!
- [#280] iroh-blobs without the `rpc` feature failed to build when another crate in the build enabled `irpc/rpc`, e.g. in a wasm browser client using irpc-iroh.

### Breaking changes

- [#304] `Hash::fmt_short` now returns `impl Display + Copy + 'static` instead of `arrayvec::ArrayString<10>`, the same way `iroh_base::PublicKey::fmt_short` does. This removes the pre-1.0 `arrayvec` crate from our public API. If you used the result as a `&str`, add `.to_string()`.
- [#312] Update iroh-util to 0.7. `iroh_blobs::util::connection_pool` re-exports `iroh_util::connection_pool`, so its changes are visible to blobs users: `Options` and the error enums are now `#[non_exhaustive]`, `on_connected` is set via `Options::with_on_connected`, connection attempts count against `max_connections`, and the new `max_pending_connections` (default 64) limits concurrent attempts, failing with `PoolConnectError::TooManyPendingConnections` at the cap.
- [#307] Update bao-tree to 0.17. The serde impl of `Parent` announced a sequence of 2 elements but wrote 3, which broke `export_bao` and `import_bao` over rpc for blobs larger than 16 KiB. The fix changes the rpc wire format of `Parent` and of the io error in `EncodeError`, so rpc clients and servers need to be updated together.

[#304]: https://github.com/n0-computer/iroh-blobs/commit/abe564b9208a06dc327ad476bc61765ad326a275
[#312]: https://github.com/n0-computer/iroh-blobs/commit/36cdbd0b4000b0b9f444187daada3df00bc36756
[#307]: https://github.com/n0-computer/iroh-blobs/commit/b30515934b48575ef5ec44f24fd17e13fef9f1b7
[#283]: https://github.com/n0-computer/iroh-blobs/commit/1ff1585abaa84d18678f984e8ef95c440b9e8b25
[#275]: https://github.com/n0-computer/iroh-blobs/commit/10fec96dad8168c99d8945253cd024b20c270343
[#309]: https://github.com/n0-computer/iroh-blobs/commit/b85f24b2a58bf5cacd11497d73481354515cf63a
[#295]: https://github.com/n0-computer/iroh-blobs/commit/27789ab90b502d0422b85ea7b0e6542d7428eb40
[#297]: https://github.com/n0-computer/iroh-blobs/commit/3369597fa5d35804f1634d4a6be7c3ed3a7f05f6
[#298]: https://github.com/n0-computer/iroh-blobs/commit/2cd6ed8e7bbbd14fd713419cb88a5b8c09a35889
[#293]: https://github.com/n0-computer/iroh-blobs/commit/572750398ef6af36d6de939cdf29540fd4c4692e
[#294]: https://github.com/n0-computer/iroh-blobs/commit/b1dee5e6c54ec888bb6754a65d7d31099baeb456
[#296]: https://github.com/n0-computer/iroh-blobs/commit/55f9c06ddcf4dc67d4901bff65023e43dea80521
[#302]: https://github.com/n0-computer/iroh-blobs/commit/75d40f1d231e0ba8f44b86ff924472ca8c569f63
[#299]: https://github.com/n0-computer/iroh-blobs/commit/2e9dfc3ac7e9e39df6d5f1bb43974b78b7dd59b5
[#282]: https://github.com/n0-computer/iroh-blobs/commit/2b8021482e133c8ab12cc9c53fb10029734f9136
[#313]: https://github.com/n0-computer/iroh-blobs/commit/cd2780e8e878f0dc12e64e2e68f77542f44a6c13
[#285]: https://github.com/n0-computer/iroh-blobs/commit/dda1d5e270da119df23b9cdd1afe831eb238cc6a
[#280]: https://github.com/n0-computer/iroh-blobs/commit/8368de668ac67e85c9134c4386b17f20b87a6e05
[canary series]: /blog/iroh-0-90-the-canary-series
[iroh global content discovery]: /blog/iroh-global-content-discovery
[iroh-docs]: /proto/iroh-docs
[sendme]: /sendme
[deCDN]: https://decdn.org
[DashBeam]: https://dashbeam.net
[Flipflop]: https://github.com/andunieee/flipflop
[Dash Chat]: https://darksoil.studio/dashchat
[Radicle]: https://radicle.xyz
