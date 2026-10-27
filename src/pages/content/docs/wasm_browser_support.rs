//! Content for `/docs/wasm-browser-support`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsWasmBrowserSupport() -> Element {
    rsx! {
        h1 { id: "webassembly-and-browser-support-in-iroh", "WebAssembly and Browser support in Iroh" }
        p { "Iroh can be compiled to WebAssembly for use in browsers!" }
        p {
            "We first announced work on iroh in browsers via WebAssembly in a "
            a { href: "/blog/iroh-and-the-web", "blog post" }
            {EXAMPLE_1}
            code { "iroh" }
            " to your browser project's dependencies and keep building it using "
            a { href: "https://github.com/rustwasm/wasm-bindgen/", "wasm-bindgen" }
            "."
        }
        p {
            "For end-to-end examples of integrating iroh into a browser page, see these examples on our "
            a { href: "https://github.com/n0-computer/iroh-examples", "iroh-examples repository" }
            ":"
        }
        ul {
            li {
                "An "
                a { href: "https://github.com/n0-computer/iroh-examples/tree/main/browser-echo",
                    "iroh echo server in the browser"
                }
                ". Check it out "
                a { href: "https://n0-computer.github.io/iroh-examples/main/browser-echo/index.html",
                    "in action"
                }
            }
            li {
                "An "
                a { href: "https://github.com/n0-computer/iroh-examples/tree/main/browser-chat",
                    "browser chat room UI"
                }
                " based on the "
                a { href: "/docs/examples/gossip-chat", "iroh gossip chat example" }
                ". Check it out "
                a { href: "https://n0-computer.github.io/iroh-examples/main/browser-chat/index.html",
                    "in action"
                }
            }
        }
        h2 { id: "limitations", "Limitations" }
        p { {EXAMPLE_2} }
        p {
            "We envision that most applications will use iroh browser support as an additional feature to complement existing deployments to desktops, native apps or servers, where they'll be able to make use of everything that iroh offers."
        }
        h3 { id: "no-direct-connections", "No direct connections" }
        p {
            strong { "All connections from browsers to somewhere else need to flow via a relay server" }
            {EXAMPLE_3}
        }
        p {
            "Keep in mind that "
            em { "connections are end-to-end encrypted" }
            {EXAMPLE_4}
        }
        p {
            "There are other ways of getting peer-to-peer connections going, such as WebTransport with "
            code { "serverCertificateHashes" }
            {EXAMPLE_5}
        }
        h3 { id: "iroh-crate-features",
            code { "iroh" }
            " crate features"
        }
        p {
            {EXAMPLE_6}
            code { {"iroh = { version = \"0.33\", default-features = false }"} }
            {EXAMPLE_7}
            code { "metrics" }
            {EXAMPLE_8}
            code { "discovery-local-network" }
            " or "
            code { "discovery-dht" }
            " will likely never be available in browsers, unless browser APIs making them possible are added."
        }
        h3 { id: "npm-package", "npm package" }
        p {
            {EXAMPLE_9}
            a { href: "https://github.com/rustwasm/wasm-bindgen/", "wasm-bindgen" }
            "."
        }
        h3 { id: "use-in-node-js-bun-js-deno", "Use in node.js/bun.js/deno" }
        p { {EXAMPLE_10} }
        p {
            {EXAMPLE_11}
            a { href: "https://napi.rs", "NAPI" }
            " or "
            a { href: "https://wasi.dev/", "WASI" }
            {EXAMPLE_12}
            a { href: "https://github.com/n0-computer/iroh-ffi/", "iroh-ffi" }
            " and feel free to adapt it to your needs or newer iroh versions."
        }
        h2 { id: "troubleshooting", "Troubleshooting" }
        p {
            {EXAMPLE_13}
            a { href: "https://github.com/n0-computer/iroh/discussions/3200", "discussion on github" }
            {EXAMPLE_14}
        }
        h2 { id: "future-plans", "Future Plans" }
        p {
            {EXAMPLE_15}
            a { href: "https://www.iroh.computer/proto/iroh-gossip", "iroh-gossip" }
            " already supports being built for browsers starting with version 0.33."
        }
    }
}
const EXAMPLE_1: &str = r###".
As of the iroh 0.33 release, iroh can be used in projects that compile to WebAssembly.
Add "###;
const EXAMPLE_2: &str = r###"When you're in a browser context - as opposed to in a native app or on desktop, you're in a strict "sandbox" that disallows a few things iroh relies upon, e.g. sending UDP packets directly.
Thus, we need to work around these limitations and can't provide you with the full magic of iroh just yet."###;
const EXAMPLE_3: &str = r###".
This is because we can't port our hole-punching logic in iroh to browsers: They don't support sending UDP packets to IP addresses from inside the browser sandbox."###;
const EXAMPLE_4: &str = r###", as always with iroh.
So even though traffic from browsers is always relayed, it can't be decrypted by the relay."###;
const EXAMPLE_5: &str = r###", or WebRTC.
We may expand iroh's browser support to make use of these to try to generate fully peer-to-peer connections even when a browser node is involved in the connection."###;
const EXAMPLE_6: &str = r###"As of iroh version 0.33, you need to disable all optional features on iroh for the Wasm build to succeed.
To do so, depend on iroh via "###;
const EXAMPLE_7: &str = r###".
This will install a version of iroh with default features, except it doesn't track "###;
const EXAMPLE_8: &str = r###" locally.
We'll get rid of this limitation very soon (likely with iroh version 0.34).
Non-default features like "###;
const EXAMPLE_9: &str = r###"Currently we don't bundle iroh's Wasm build as an NPM package.
There is no technical limitation for this: You could build this today!
Should you need javascript APIs, we recommend that you write an application-specific rust wrapper crate that depends on iroh and exposes whatever the javascript side needs via "###;
const EXAMPLE_10: &str = r###"We check that the browser version of iroh works in node.js regularly.
And it's likely that Deno will work out of the box, too, given it closely resembles the browser's Web APIs.
We haven't checked if bun.js works right now, and don't have plans to check that continually."###;
const EXAMPLE_11: &str = r###"As these runtimes are outside the browser sandbox, it would technically be possible to ship bigger parts of iroh to these environments, such as all hole-punching related functionality.
However, we currently don't plan to expand the browser-related WebAssembly work to integrate with that.
In the future, it's more likely we'll use "###;
const EXAMPLE_12: &str = r###" to make these integrations possible.
If you want to try this today, take a look at our existing code at "###;
const EXAMPLE_13: &str = r###"Getting rust code to successfully build for browsers can be tricky.
We've started a "###;
const EXAMPLE_14: &str = r###" to collect common issues hit when trying to compile iroh or projects using iroh to WebAssembly.
Take a look at answers in that discussion for any clues if you're encountering build issues.
Otherwise feel free to open a discussion or a thread on that discussion with your specific issue."###;
const EXAMPLE_15: &str = r###"We're expanding browser support from the iroh crate to our off-the-shelf protocols.
"###;
