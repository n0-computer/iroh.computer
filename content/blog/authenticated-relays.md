+++
title = "Protect your relays"
description = "Managed relays are now authenticated by default, so the relay capacity you pay for is only ever used by your endpoints."
date = "2026-07-30"
author = "Rae McKelvey"
social_image = ""
+++

When two devices can't get a direct connection, a [relay](https://docs.iroh.computer/concepts/relays) carries the connection so data still flows. If the relay accepts anyone, then anyone who learns its URL can push traffic through it. And they will learn it: it ships inside every client you distribute and it's visible to anyone watching a connection get established.

Because of this, we've decided that [managed relays](https://docs.iroh.computer/iroh-services/relays/managed) on [Iroh Services](https://services.iroh.computer) are now **authenticated by default**. Only endpoints carrying a token issued by your project's API key can use them.

There's nothing to switch on. If you already connect through the [`iroh_services` preset](https://docs.iroh.computer/iroh-services/relays/managed), your endpoints authenticate themselves.

One caveat: this is the default for relays deployed from June 2026 onward. If you deployed a relay before then, it stays open, so nothing breaks for the endpoints already using it. To turn it on, head to your relay's [authentication settings](https://docs.iroh.computer/iroh-services/relays/managed#authentication) under Relays > Settings.

## The problem: a relay URL is a credential you can't revoke {#the-problem-a-relay-url-is-a-credential-you-can-t-revoke}

Someone finds your relay URL in a public repo, a client bundle, or a screenshot, and starts spamming your infrastructure until it falls over.

You spent effort spinning up your own relay, but someone else's traffic still competes with yours. A relay has finite bandwidth and finite connection slots, whether it's a box you're renting, a VM under your desk, or capacity you're paying us for, and whoever else found the URL is now using it.

If you run your own relays, you can build your own authentication scheme -- iroh is unopinionated about that. But if you're using our managed relays, until this month we didn't give you a way to easily control access. Now we have shipped the first piece of the authentication puzzle -- API keys. You can issue, rotate, and delete them without limits. These are the same API keys you already use to push metrics, so if you're on [Iroh Services](https://services.iroh.computer) you have one.

[Deploy a dedicated relay, free for 30 days](https://services.iroh.computer).

## How it works {#how-it-works}

Every relay connection starts with an HTTP handshake, the same one that upgrades to the websocket. Authentication travels in a standard header:

```
Authorization: Bearer <token>
```

The token is a signed [capability token](https://docs.rs/rcan). It carries four things:

-   who **issued** it: your project's API key
-   who it's **for**: the public key of the endpoint presenting it
-   what it **grants**: permission to use the relay, and nothing else
-   when it **expires**: can be set to a short time window, so if it is compromised it can't be used for long

When an endpoint connects, iroh's relay handshake first proves the endpoint actually owns its key. It does this for every connection, authenticated or not. Then the relay checks the token: is the signature valid, is it unexpired, does it grant relay use, is it addressed to this exact endpoint, and was it issued by one of your project's API keys? If every answer is yes, the endpoint is admitted.

Two properties fall out of this that we like.

**A leaked URL is harmless.** Without a token issued by your API key, dialing it gets you nothing.

**A leaked token enables connections, but not impersonations.** The token is addressed to one specific endpoint's public key, so presenting it from a different endpoint fails: the handshake would still have to prove ownership of that endpoint's secret key, which the token alone does not give you.

Revocation follows the same path. Your API key is the identity the relay recognizes, so rotating or deleting a key stops honoring tokens it issued, and connections riding those tokens are dropped.

## Connecting an endpoint {#connecting-an-endpoint}

You don't assemble any of this by hand. The [`iroh_services` preset](https://docs.iroh.computer/iroh-services/relays/managed) mints the token from your API secret and attaches it to every relay connection for you. Building an authenticated endpoint is the same few lines you would write anyway:

```rust
use iroh::Endpoint;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let preset = iroh_services::preset()
        .relays(["https://us-east1.your-project.iroh.link"])?
        .api_secret_from_env()? // reads IROH_SERVICES_API_SECRET
        .build()?;

    // The endpoint now reaches your managed relays, authenticated.
    let endpoint = Endpoint::bind(preset).await?;

    Ok(())
}
```

Your API secret never leaves your process. The preset uses it to derive a relay-scoped token, and that derived token is what travels to the relay. Point `.relays(...)` at the relay URLs from your project dashboard, set `IROH_SERVICES_API_SECRET`, and that's it.

## What's next {#what-s-next}

Today, each endpoint gets the same capabilities. In the future, we'll add the ability to mint tokens with different scopes, so you can grant some endpoints more permissions than others. Additionally, we will be allowing you to revoke access to endpoints individually, and an API to do all of this outside of the dashboard. If any of this sounds interesting to you, please reach out on [Discord](https://discord.com/invite/DpmJgtU7cW) and let us know.

If you're running relays today, deploy at least two in different regions so one region going down doesn't strand your endpoints. The [managed relays guide](https://docs.iroh.computer/iroh-services/relays/managed) walks through the full setup.

Questions, or want to talk through your relay setup? Join us on [Discord](https://discord.com/invite/DpmJgtU7cW) or [schedule a call](https://cal.com/team/number-0/iroh-services) with us. We love to talk about relays, and we want to make sure you get the most out of them.
