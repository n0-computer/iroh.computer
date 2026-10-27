//! Content for `/changelog`. Edit this Dioxus component directly.
use crate::contact::ContactButton;
use dioxus::prelude::*;
#[component]
pub(super) fn Changelog() -> Element {
    rsx! {
        h1 { id: "change-log", "Change Log" }
        div {
            h4 { "Subscribe for updates" }
            div {
                p {
                    "We'll send you an email with each new release of iroh & and a link to the blog post. Right now iroh is releasing roughly every 3 weeks."
                }
                ContactButton { source: "changelog", class: "button", "Subscribe" }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-33-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.33.0",
                        "0.33.0"
                    }
                }
                p { "Feb 24, 2025" }
            }
            div {
                h3 { id: "browsers-beta-discovery-and-0-rtt", "Browsers Beta, Discovery, and 0-RTT" }
                a { href: "https://iroh.computer/blog/iroh-0-33-0-browsers-and-discovery-and-0-RTT-oh-my",
                    "blog post"
                }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.33.0",
                    "github"
                }
                a { href: "https://github.com/n0-computer/iroh/blob/main/CHANGELOG.md#0330---2025-02-24",
                    "changelog"
                }
                ul {
                    li { "iroh compiles to Wasm" }
                    li { "Publish and resolve user-defined data in Discovery" }
                    li { "0-RTT connections" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-32-1",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.32.1",
                        "0.32.1"
                    }
                }
                p { "Feb 5, 2025" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.32.1",
                    "github"
                }
                a { href: "https://github.com/n0-computer/iroh/blob/main/CHANGELOG.md#0321---2025-02-05",
                    "changelog"
                }
                ul {
                    li { " Ensure passing a crypto provider to rustls clients" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-32-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.32.0",
                        "0.32.0"
                    }
                }
                p { "Feb 4, 2025" }
            }
            div {
                h3 { id: "browsers-alpha-qad-and-n0-future", "Browsers Alpha, QAD, and n0-future" }
                a { href: "/blog/iroh-0-32-0-browser-alpha-qad-and-n0-future", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.32.0",
                    "github"
                }
                a { href: "https://github.com/n0-computer/iroh/blob/main/CHANGELOG.md#0320---2025-02-04",
                    "changelog"
                }
                ul {
                    li { "browser support alpha release" }
                    li { "Quic Address Discovery (QAD) on relays" }
                    li { "n0-future crate" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-31-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.31.0",
                        "0.31.0"
                    }
                }
                p { "Jan 15, 2025" }
            }
            div {
                h3 { id: "back-at-fighting-fit", "Back At Fighting Fit" }
                a { href: "/blog/iroh-0-31-0-back-to-fighting-fit", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.31.0",
                    "github"
                }
                a { href: "https://github.com/n0-computer/iroh/blob/main/CHANGELOG.md#0310---2025-01-14",
                    "changelog"
                }
                ul {
                    li { "Auth on Relays" }
                    li { "relay-only mode for testing" }
                    li { "Connection flop fix" }
                    li { "DNS/Pkarr Segfault fix" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-30-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.30.0",
                        "0.30.0"
                    }
                }
                p { "Dec 17, 2024" }
            }
            div {
                h3 { id: "slimming-down", "Slimming Down" }
                a { href: "/blog/iroh-0-30-0-slimming-down", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.30.0",
                    "github"
                }
                a { href: "https://github.com/n0-computer/iroh/blob/main/CHANGELOG.md#0300---2024-12-16",
                    "changelog"
                }
                ul {
                    li { "Movin’ structs into their new homes" }
                    li { "New Watchable APIs" }
                    li { "Streamlined protocol setup" }
                    li { "Reduced Dependency Count" }
                    li { "Simpler ProtocolHandler API" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-29-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.29.0",
                        "0.29.0"
                    }
                }
                p { "Dec 2, 2024" }
            }
            div {
                h3 { id: "net-is-the-new-iroh", "net is the new iroh" }
                a { href: "/blog/iroh-0-29-net-is-the-new-iroh", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.29.0",
                    "github"
                }
                ul {
                    li { "iroh-net is now iroh" }
                    li { "CLI deprecated" }
                    li { "upgrade guide" }
                    li { "custom protocol guide" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-28-1",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.28.1",
                        "0.28.1"
                    }
                }
                p { "Nov 5, 2024" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.28.1",
                    "github"
                }
                ul {}
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-28-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.28.0",
                        "0.28.0"
                    }
                }
                p { "Nov 4, 2024" }
            }
            div {
                h3 { id: "let-them-have-crates", "Let them have crates" }
                a { href: "/blog/iroh-0-28-let-them-have-crates", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.28.0",
                    "github"
                }
                ul {
                    li {
                        "new crates: iroh-router, iroh-gossip, iroh-docs, iroh-blobs, pormapper, netwatcher"
                    }
                    li { "CLI deprecation notice" }
                    li { "deprecate RPC in core, move to protocols" }
                    li { "static discovery service" }
                    li { "iroh-dns rate limiting" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-27-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.27.0",
                        "0.27.0"
                    }
                }
                p { "Oct 21, 2024" }
            }
            div {
                h3 { id: "squashing-bugs-and-taking-names", "Squashing Bugs and Taking Names" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.27.0",
                    "github"
                }
                ul {
                    li { "better connection maintenance" }
                    li { "force_staging_infra for better default options" }
                    li { "streamlined discovery service setup" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-26-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.26.0",
                        "0.26.0"
                    }
                }
                p { "Sep 30, 2024" }
            }
            div {
                h3 { id: "say-hello-to-your-neighbors", "Say Hello to Your Neighbors" }
                a { href: "/blog/iroh-0-26-0-Say-Hello-to-Your-Neighbors", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.26.0",
                    "github"
                }
                ul {
                    li { "protocols spin out" }
                    li { "iroh-docs: disabled by default" }
                    li { "sources for addresses" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-25-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.25.0",
                        "0.25.0"
                    }
                }
                p { "Sep 16, 2024" }
            }
            div {
                h3 { id: "custom-protocols-for-all", "Custom Protocols For All!" }
                a { href: "/blog/iroh-0-25-0-custom-protocols-for-all", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.25.0",
                    "github"
                }
                ul {
                    li { "bind to a specific network interface" }
                    li { "Custom Protocols for all supported FFI languages" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-24-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.24.0",
                        "0.24.0"
                    }
                }
                p { "Sep 2, 2024" }
            }
            div {
                h3 { id: "upgrading-to-quinn-11", "Upgrading to Quinn 11" }
                a { href: "/blog/iroh-0-24-0-quinn-11", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.24.0",
                    "github"
                }
                ul {
                    li { "Upgrade to quinn v0.11.0" }
                    li { "performance improvements" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-23-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.23.0",
                        "0.23.0"
                    }
                }
                p { "Aug 20, 2024" }
            }
            div {
                h3 { id: "welcoming-node-js-to-the-family", "Welcoming Node.js to the family!" }
                a { href: "/blog/iroh-0-23-welcoming-nodejs-to-the-family", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.23.0",
                    "github"
                }
                ul {
                    li { "nodejs support via FFI" }
                    li { "refactor connections -> remotes" }
                    li { "net client api" }
                    li { "new blob APIs for batching & events" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-22-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.22.0",
                        "0.22.0"
                    }
                }
                p { "Aug 5, 2024" }
            }
            div {
                h3 { id: "clean-up-on-aisle-five", "Clean up on aisle five" }
                a { href: "/blog/iroh-0-22-cleanup-on-aisle-five", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.22.0",
                    "github"
                }
                ul {
                    li { "iroh-blobs: Improved Handling of Existing Local Content" }
                    li { "fix regression in direct dialing" }
                    li { "iroh-gossip: improved dispatcher" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-21-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.21.0",
                        "0.21.0"
                    }
                }
                p { "Jul 22, 2024" }
            }
            div {
                h3 { id: "fix-clean-and-polish", "Fix, Clean, and Polish" }
                a { href: "/blog/iroh-0-21-fix-clean-polish", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.21.0",
                    "github"
                }
                ul {
                    li { "custom LocalPool for improved drop/shutdown interaction" }
                    li { "publish images to docker hub" }
                    li { "align FFI apis across languages" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-20-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.20.0",
                        "0.20.0"
                    }
                }
                p { "Jul 9, 2024" }
            }
            div {
                h3 { id: "more-ways-to-connect", "More ways to connect" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.20.0",
                    "github"
                }
                ul {
                    li { "local network node discovery" }
                    li { "relay websocket support" }
                    li { "improved gossip API" }
                    li { "async FFI" }
                    li { "docker image publishing" }
                    li { "Pkarr publishing direct addresses" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-19-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.19.0",
                        "0.19.0"
                    }
                }
                p { "Jun 27, 2024" }
            }
            div {
                h3 { id: "make-it-your-own", "Make it your own" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.19.0",
                    "github"
                }
                ul {
                    li { "Custom Protocols" }
                    li { "iroh-docs: optional" }
                    li { "relay server cleanup" }
                    li { "Easier RPC in docker" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-18-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.18.0",
                        "0.18.0"
                    }
                }
                p { "Jun 7, 2024" }
            }
            div {
                h3 { id: "small-but-helpful", "Small, but helpful" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.18.0",
                    "github"
                }
                ul {
                    li { "client fields -> methods refactor" }
                    li { "iroh-gossip: larger messages" }
                    li { "faster netcheck" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-17-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.17.0",
                        "0.17.0"
                    }
                }
                p { "May 24, 2024" }
            }
            div {
                h3 { id: "everything-is-a-little-better", "Everything is a little better" }
                a { href: "/blog/iroh-0-17-0-everything-is-a-little-better", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.17.0",
                    "github"
                }
                ul {
                    li { "iroh-docs: default authors" }
                    li { "iroh-docs: document import" }
                    li { "HTTP Proxy Support" }
                    li { "OpenBSD & FreeBSD Support" }
                    li { "Better DNS Resolution" }
                    li { "MagicEndpoint -> Endpoint rename" }
                    li { "WASM Phase 0" }
                    li { "iroh-perf" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-16-2",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.16.2",
                        "0.16.2"
                    }
                }
                p { "May 13, 2024" }
            }
            div {
                h3 { id: "the-one-that-needed-patching", "The one that needed patching" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.16.2",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-16-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.16.0",
                        "0.16.0"
                    }
                }
                p { "May 13, 2024" }
            }
            div {
                h3 { id: "a-better-client", "A better client" }
                a { href: "/blog/iroh-0-16-a-better-client", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.16.0",
                    "github"
                }
                ul {
                    li { "Improved RPC API experience" }
                    li { "Cleaner Network APIs with Quinn fork" }
                    li { "iroh doctor subcommand" }
                    li { "iroh doctor plot" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-15-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.15.0",
                        "0.15.0"
                    }
                }
                p { "Apr 29, 2024" }
            }
            div {
                h3 { id: "shut-me-down", "Shut me down" }
                a { href: "/blog/iroh-0-15-0-shut-me-down", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.15.0",
                    "github"
                }
                ul {
                    li { "Graceful Shutdown" }
                    li { "iroh-blobs: integrated downloader" }
                    li { "Expanded Support for dialing by only NodeID" }
                    li { "DNS & Relay binaries with each release" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-14-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.14.0",
                        "0.14.0"
                    }
                }
                p { "Apr 15, 2024" }
            }
            div {
                h3 { id: "dial-the-world", "Dial the world" }
                a { href: "/blog/iroh-0-14-0-dial-the-world", "blog post" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.14.0",
                    "github"
                }
                ul {
                    li { "dial by NodeID only" }
                    li { "faster relay handshakes" }
                    li { "iroh-docs: basic author API" }
                    li { "redb 2.0 upgrade" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-13-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.13.0",
                        "0.13.0"
                    }
                }
                p { "Mar 25, 2024" }
            }
            div {
                h3 { id: "connect-store-repeat", "Connect, Store & Repeat" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.13.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-12-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.12.0",
                        "0.12.0"
                    }
                }
                p { "Dec 20, 2023" }
            }
            div {
                h3 { id: "derp-regions-are-dead-long-live-the-derpers",
                    "Derp Regions are dead, long live the derpers"
                }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.12.0",
                    "github"
                }
                ul {
                    li { "derp URLs instead of regions" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-11-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.11.0",
                        "0.11.0"
                    }
                }
                p { "Dec 20, 2023" }
            }
            div {
                h3 { id: "making-cli-life-a-little-easier", "Making CLI life a little easier" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.11.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-10-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.10.0",
                        "0.10.0"
                    }
                }
                p { "Nov 8, 2023" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.10.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-9-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.9.0",
                        "0.9.0"
                    }
                }
                p { "Oct 31, 2023" }
            }
            div {
                h3 { id: "stabilized-connections", "Stabilized Connections" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.9.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-8-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.8.0",
                        "0.8.0"
                    }
                }
                p { "Oct 23, 2023" }
            }
            div {
                h3 { id: "better-sync-faster-blobs", "Better sync, faster blobs" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.8.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-7-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.7.0",
                        "0.7.0"
                    }
                }
                p { "Oct 11, 2023" }
            }
            div {
                h3 { id: "syncing-intensifies", "Syncing intensifies" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.7.0",
                    "github"
                }
                ul {}
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-6-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.6.0",
                        "0.6.0"
                    }
                }
                p { "Sep 25, 2023" }
            }
            div {
                h3 { id: "let-that-sync-in", "Let that sync in" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.6.0",
                    "github"
                }
                ul {
                    li { "introduce documents" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-5-1",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.5.1",
                        "0.5.1"
                    }
                }
                p { "Jul 18, 2023" }
            }
            div {
                h3 { id: "connectivity-intensifies", "Connectivity Intensifies" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.5.1",
                    "github"
                }
                ul {
                    li { "initial holepunching implementation" }
                    li { "split iroh into crates" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-4-1",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.4.1",
                        "0.4.1"
                    }
                }
                p { "Apr 3, 2023" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.4.1",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-4-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.4.0",
                        "0.4.0"
                    }
                }
                p { "Mar 29, 2023" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.4.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-3-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.3.0",
                        "0.3.0"
                    }
                }
                p { "Feb 22, 2023" }
            }
            div {
                h3 { id: "a-new-beginning", "A New Beginning" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.3.0",
                    "github"
                }
                ul {
                    li { "drop IPFS interop" }
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-2-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.2.0",
                        "0.2.0"
                    }
                }
                p { "Dec 21, 2022" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.2.0",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-1-3",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.3",
                        "0.1.3"
                    }
                }
                p { "Nov 28, 2022" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.3",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-1-2",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.2",
                        "0.1.2"
                    }
                }
                p { "Nov 28, 2022" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.2",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-1-1",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.1",
                        "0.1.1"
                    }
                }
                p { "Nov 22, 2022" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.1",
                    "github"
                }
            }
        }
        div {
            div {
                svg {
                    xmlns: "http://www.w3.org/2000/svg",
                    view_box: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    "data-slot": "icon",
                    path {
                        fill_rule: "evenodd",
                        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
                        clip_rule: "evenodd",
                    }
                }
            }
            div {
                h2 { id: "0-1-0",
                    a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.0",
                        "0.1.0"
                    }
                }
                p { "Oct 28, 2022" }
            }
            div {
                h3 { id: "untitled", "untitled" }
                a { href: "https://github.com/n0-computer/iroh/releases/tag/v0.1.0",
                    "github"
                }
            }
        }
    }
}
