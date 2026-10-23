+++
title = "The new BLAKE3 hazmat API"
description = "The new BLAKE3 hazmat API, or why we can retire our BLAKE3 fork"
date = "2025-04-08"
author = "Rüdiger Klaehn"
social_image = ""
+++

In [iroh-blobs](https://github.com/n0-computer/iroh-blobs), we are using the [BLAKE3](https://github.com/BLAKE3-team/BLAKE3) hash function for content-addressing. To allow verified streaming, we need to access some internals of the hash function. For the last 18 months we have maintained a [fork](https://github.com/n0-computer/iroh-blake3) of the BLAKE3 crate to allow us to access some internals of the hash function. With the latest release of BLAKE3, there is a new *hazmat* API that allows us to retire this fork.

This blog post goes into a lot of detail on the previous *guts* API, the new *hazmat* API, and how we use these APIs in blobs. It will be of interest to other advanced users of the BLAKE3 hash function.

# Short summary of BLAKE3 {#short-summary-of-blake3}

The BLAKE3 hash function is a *tree* hash function. Briefly, the data gets divided into 1024 byte chunks, and each chunk is then hashed individually.

To compute a root hash, pairs of hashes are combined with a binary combine function until just a single hash remains. To provide [domain separation](https://en.wikipedia.org/wiki/Domain_separation), ***only*** the final root hash gets computed with a special flag is\_root set to true.

<img src="/blog/blake3-hazmat-api/blake-tree-6.png" alt="BLAKE3 forks" width="800" height="600" class="theme-light">

<img src="/blog/blake3-hazmat-api/blake-tree-6-dark.png" alt="BLAKE3 forks" width="800" height="600" class="theme-dark">

# Why does iroh-blobs need internals access {#why-does-iroh-blobs-need-internals-access}

The `iroh-blobs` protocol allows for verified streaming of data, just like the [bao](https://crates.io/crates/bao) crate. In order to do so we need to be able to compute *intermediate results* of the computation described above.

<img src="/blog/blake3-hazmat-api/blake-tree-21.png" alt="BLAKE3 forks" width="800" height="600" class="theme-light">

<img src="/blog/blake3-hazmat-api/blake-tree-21-dark.png" alt="BLAKE3 forks" width="800" height="600" class="theme-dark">

> [!NOTE]
> Most users are only interested in the root hash, and won't *ever* have to deal with intermediate results.

# Minimal internals API {#minimal-internals-api}

At a minimum, we need the ability to hash individual chunks, as well as the ability to combine chunks to build the binary tree up to the root.

Previously, the BLAKE3 crate provided exactly this functionality in an undocumented and unstable *guts* API that was also used by the [bao](https://crates.io/crates/bao) crate.

A function `parent_cv` provided the ability to combine two non-root hashes (also called continuation values) to another continuation value or root hash.

```rust
pub fn parent_cv(left_child: &Hash, right_child: &Hash, is_root: bool) -> Hash
```

And the `ChunkState` struct provided a builder-like API to compute a (root or non-root) hash for any chunk.

# Why the fork? {#why-the-fork}

One reason for the very good performance of the BLAKE3 hash function is the ability to compute chunk hashes in parallel. BLAKE3 is using instruction level parallelism (SIMD) to the greatest extent possible, and on top of that optionally uses thread level parallelism using the [rayon](https://docs.rs/rayon/latest/rayon/) crate.

When computing a hash from a large blob, the [Hasher](https://docs.rs/blake3/latest/blake3/struct.Hasher.html) can perform chunk hash computations in any order, and it makes use of this to use SIMD.

But if you only ever ask the poor thing for hashes of *individual* chunks, there is nothing it can do!

So to get the benefit of this awesomeness, we need to give the hash function multiple chunks to work with, even when computing subtree hashes.

`iroh-blobs` works with *chunk groups* of 16 chunks. When sending or receiving data, the most expensive hashing related computation going on in `iroh-blobs` is computing the hash of a subtree consisting of 16 chunks.

You can of course compute this sequentially using the primitives exposed by the guts API. But you only benefit from the parallelism of BLAKE3 if you give all chunks to the hasher all at once. This is exactly what our fork does. it added a fn to the guts api to hash an entire subtree:

```rust
pub fn hash_subtree(start_chunk: u64, data: &[u8], is_root: bool) -> Hash
```

But using and maintaining this fork caused quite some complexity. There were build issues due to symbol collisions when people had both the original BLAKE3 crate and our fork in their dependencies. And we did not stay up to date with the improvements of the upstream crate.

# The new hazmat API {#the-new-hazmat-api}

The biggest change of the new hazmat API compared to the guts API is that this is a [public API](https://docs.rs/blake3/latest/blake3/hazmat/index.html) that has the same stability guarantees as anything else in a 1.x rust crate.

> [!NOTE]
> There is a convention in the rust-crypto collection of cryptography crates to name such useful but potentially dangerous APIs hazmat APIs, hence the name.

To hash subtrees, the hazmat API has an extension trait [HasherExt](https://docs.rs/blake3/latest/blake3/hazmat/trait.HasherExt.html) that allows [setting the input offset](https://docs.rs/blake3/latest/blake3/hazmat/trait.HasherExt.html#tymethod.set_input_offset) on the standard [Hasher](https://docs.rs/blake3/latest/blake3/struct.Hasher.html). In addition, it adds the ability to finalize the computation to a *non-root* hash or chaining value.

The ability to combine two non-root hashes or chaining values is given using two functions [merge\_subtree\_root](https://docs.rs/blake3/latest/blake3/hazmat/fn.merge_subtrees_root.html) and [merge\_subtree\_non\_root](https://docs.rs/blake3/latest/blake3/hazmat/fn.merge_subtrees_non_root.html).

A change from the old guts API is that chaining values are now a separate [type alias](https://docs.rs/blake3/latest/blake3/hazmat/type.ChainingValue.html) to distinguish them from root hashes.

There are also a number of functions to use a BLAKE3 hash as an [extendable output function](https://en.wikipedia.org/wiki/Extendable-output_function), which we don't use in iroh-blobs.

> [!NOTE]
> Despite this attempt to make the distinction between chaining values and root hashes more clear, it is still very easy to use the hazmat API in a way that does not result in correct hashes. Hence the large disclaimers in the docs. So be careful!

# Other forks {#other-forks}

Due to it's useful tree structure, high performance and built in parallelism, the BLAKE3 hashing function is quite popular. Several other projects like [fleek](https://fleek.network/) or [fluence](https://www.fluence.network/) also forked the BLAKE3 crate, often for very similar reasons.

<img src="/blog/blake3-hazmat-api/crates.png" alt="BLAKE3 forks" width="800" height="600" class="theme-light">

<img src="/blog/blake3-hazmat-api/crates.png" alt="BLAKE3 forks" width="800" height="600" class="theme-dark">

These are just the public forks from [crates.io](https://crates.io/search?q=blake3), there are probably more private or less visible forks. For example, the [s5 project](https://docs.sfive.net/) also uses BLAKE3 with chunk groups, but with a larger chunk group size than iroh-blobs.

I hope that some of these other projects will take a look at the new *hazmat* API and will possibly be able to retire their forks as well!

> [!NOTE]
> Thanks to [Jack O'Connor](https://jacko.io/) for BLAKE3 and for providing the new *hazmat* API!
