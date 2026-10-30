//! Content for `/roadmap`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn Roadmap() -> Element {
    rsx! {
        header {
            h1 { id: "iroh-1-0-roadmap", "iroh 1.0 roadmap" }
            p {
                "Here's where we're headed, and progress we made against our goal to date. For more details see the "
                a { href: "/blog/road-to-1-0", "iroh 1.0 roadmap post" }
                ", and check past releases in the "
                a { href: "/changelog", "changelog" }
            }
            p { "Last Updated February 9, 2026" }
        }
        div {
            h1 { id: "" }
            p {}
        }
        div {
            div {
                button {
                    svg {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        view_box: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        stroke_width: "2",
                        stroke_linecap: "round",
                        stroke_linejoin: "round",
                        "aria-hidden": "true",
                        path { d: "m6 9 6 6 6-6" }
                    }
                }
                button {
                    h3 { id: "past-releases", "past releases" }
                    p { "15 releases: Sep 30, 2024 - Oct 20, 2025" }
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
                    h3 { id: "docs-are-disabled-by-default", "docs are disabled by default" }
                    p { "transition node builder away from assuming all users want the docs protocol" }
                    a { href: "https://github.com/n0-computer/iroh/pull/2748", "#2748" }
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
                    h2 { id: "v0-26-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-26-0-Say-Hello-to-Your-Neighbors",
                            "v0.26.0"
                        }
                    }
                    p { "Sep 30, 2024" }
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
                    h2 { id: "v0-27-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-27-0-Squashing-Bugs-And-Taking-Names",
                            "v0.27.0"
                        }
                    }
                    p { "Oct 21, 2024" }
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
                    h3 { id: "pull-custom-protocols-out-of-iroh", "pull custom protocols out of iroh" }
                    p { "pull custom protocols out of iroh and into separate repositories" }
                    ul {
                        li {
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
                            span { "iroh-blobs" }
                        }
                        li {
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
                            span { "iroh-docs" }
                        }
                        li {
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
                            span { "iroh-gossip" }
                        }
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
                    h3 { id: "blobs-docs-and-gossip-are-disabled-by-default",
                        "blobs, docs, and gossip are disabled by default"
                    }
                    p { "protocols remain in the codebase but must be explicitly enabled" }
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
                    h3 { id: "implement-quic-address-discovery", "Implement QUIC Address Discovery" }
                    p { "Add QUIC Address Discovery functionality to `iroh-quinn`" }
                    a { href: "https://github.com/n0-computer/quinn/pull/12", "#12" }
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
                    h3 { id: "iroh-cli-deprecation-warning", "Iroh CLI Deprecation Warning" }
                    p {
                        "warn users that the iroh CLI is deprecated and will be converted to an example in the next release"
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
                    h3 { id: "iroh-client-deprecation-warning", "Iroh client Deprecation Warning" }
                    p {
                        "warn users that the iroh client is deprecated and will be converted to an example in the next release"
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
                    h2 { id: "v0-28-1",
                        a { href: "https://iroh.computer/blog/iroh-0-28-let-them-have-crates",
                            "v0.28.1"
                        }
                    }
                    p { "Nov 4, 2024" }
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
                    h3 { id: "net-tools-repo", "net-tools repo" }
                    p { "factor a number of networking tools out of iroh and into a separate repo" }
                    ul {
                        li {
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
                            span { "netcheck" }
                        }
                        li {
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
                            span { "portmapper" }
                        }
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
                    h3 { id: "add-quic-address-discovery-to-iroh-relay",
                        "Add QUIC Address Discovery to iroh-relay"
                    }
                    p { "serve QUIC Address Discovery on the relay" }
                    a { href: "https://github.com/n0-computer/iroh/issues/2842", "#2842" }
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
                    h3 { id: "blobs-docs-and-gossip-are-removed-from-iroh",
                        "blobs, docs, and gossip are removed from iroh"
                    }
                    p { "protocols exist in their own repos and are published separately from iroh" }
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
                    h3 { id: "cli-is-removed-from-iroh", "CLI is removed from iroh" }
                    p {
                        "there is no more CLI or Node in iroh, look at the specific protocols to play with a CLI centered around that protocol"
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
                    h3 { id: "iroh-net-is-now-just-iroh", "iroh-net is now just iroh" }
                    p { "we no longer publish `iroh-net`, `iroh` contains all of `iroh-net`" }
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
                    h2 { id: "v0-29-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-29-net-is-the-new-iroh",
                            "v0.29.0"
                        }
                    }
                    p { "Dec 2, 2024" }
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
                    h3 { id: "add-quic-address-discovery-to-iroh-net-report",
                        "Add QUIC Address Discovery to `iroh-net-report`"
                    }
                    p { "net-report has QUIC Address Discovery probes" }
                    a { href: "https://github.com/n0-computer/iroh/issues/2842", "#2842" }
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
                    h2 { id: "v0-30-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-30-0-slimming-down",
                            "v0.30.0"
                        }
                    }
                    p { "Dec 16, 2024" }
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
                    h3 { id: "auth-on-relays", "Auth on Relays" }
                    p { "Blacklist or whitelist `NodeId`s on the relay" }
                    a { href: "https://github.com/n0-computer/iroh/pull/3086", "#3086" }
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
                    h3 { id: "iroh-doctor-cli-v0-1", "Iroh Doctor CLI v0.1" }
                    p {
                        "release the first version of the iroh doctor CLI as a standalone tool for diagnosing and reporting on connectivity"
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
                    h2 { id: "v0-31-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-31-0-back-to-fighting-fit",
                            "v0.31.0"
                        }
                    }
                    p { "Jan 14, 2025" }
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
                    h3 { id: "add-quic-address-discovery-to-iroh",
                        "Add QUIC Address Discovery to `iroh`"
                    }
                    p { "iroh can launch QUIC Address Discovery probes" }
                    a { href: "https://github.com/n0-computer/iroh/pull/3049", "#3049" }
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
                    h2 { id: "v0-32-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-32-0-browser-alpha-qad-and-n0-future",
                            "v0.32.0"
                        }
                    }
                    p { "Feb 3, 2025" }
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
                    h3 { id: "browser-support", "browser support" }
                    p { "iroh compiles to web assembly and runs in the browser" }
                    a { href: "https://github.com/n0-computer/iroh/issues/2799", "#2799" }
                    a { href: "https://www.iroh.computer/blog/iroh-and-the-web", "details" }
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
                    h3 { id: "user-defined-data-in-discovery", "User-defined data in Discovery" }
                    p { "Allow users to publish and resolve a user-defined data." }
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
                    h3 { id: "discovery-stream-subscription", "Discovery stream subscription" }
                    p { "Add simple API to allow users to subscribe to a stream of discoveries." }
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
                    h3 { id: "quic-connections-graceful-shutdown",
                        "QUIC connections: graceful shutdown"
                    }
                    p { "finalize our APIs for graceful shutdown of QUIC connections" }
                    a { href: "https://github.com/n0-computer/iroh/pull/3170", "#3170" }
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
                    h3 { id: "0-rtt", "0-RTT" }
                    p { "iroh QUIC connections can now leverage 0-RTT" }
                    a { href: "https://github.com/n0-computer/iroh/pull/3163", "#3163" }
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
                    h2 { id: "v0-33-0",
                        a { href: "https://iroh.computer/blog/iroh-0-33-0-browsers-and-discovery-and-0-RTT-oh-my",
                            "v0.33.0"
                        }
                    }
                    p { "Feb 24, 2025" }
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
                    h3 { id: "use-raw-public-keys-rfc-7250-in-tls",
                        "use Raw Public Keys (RFC 7250) in TLS"
                    }
                    p { "use Raw Public Keys instead of self-signed certificates in TLS" }
                    a { href: "https://github.com/n0-computer/iroh/issues/2798", "#2798" }
                    a { href: "https://datatracker.ietf.org/doc/html/rfc7250", "details" }
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
                    h3 { id: "improved-tags-api-for-iroh-blobs", "improved tags API for `iroh-blobs`" }
                    p { "expand tags API" }
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
                    h2 { id: "v0-34-1",
                        a { href: "https://www.iroh.computer/blog/iroh-0-34-0-raw-public-keys",
                            "v0.34.1"
                        }
                    }
                    p { "Mar 18, 2025" }
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
                    h3 { id: "relay-connections-over-websockets", "relay connections over websockets" }
                    p { "Connections to the relay happen over websockets" }
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
                    h3 { id: "metrics-are-collected-per-endpoint",
                        "metrics are collected per-endpoint"
                    }
                    p {
                        "Previously, metrics were collected globably. Now, each `iroh` endpoint collects metrics for itself."
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
                    h2 { id: "v0-35-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-35-prepping-for-1-0",
                            "v0.35.0"
                        }
                    }
                    p { "May 12, 2025" }
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
                    h3 { id: "formalize-error-responses", "Formalize Error Responses" }
                    p { "transition from anyhow to thiserror in all critical code paths" }
                    a { href: "https://github.com/n0-computer/iroh/issues/2741", "#2741" }
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
                    h3 { id: "iroh-blobs-1-0-candidate-api", "iroh-blobs 1.0 candidate API" }
                    p { "Overhaul the blobs API" }
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
                    h3 { id: "iroh-blobs-multiprovider-fan-in", "iroh-blobs: multiprovider fan-in" }
                    p { "Download data from multiple providers using the `SplitStrategy` enum" }
                    a { href: "https://github.com/n0-computer/iroh-blobs/issues/4",
                        "#4"
                    }
                    a { href: "https://docs.rs/iroh-blobs/latest/iroh_blobs/api/downloader/enum.SplitStrategy.html",
                        "details"
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
                    h2 { id: "v0-90-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-90-the-canary-series",
                            "v0.90.0"
                        }
                    }
                    p { "Jun 27, 2025" }
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
                    h3 { id: "deprecate-tcp-relay-connections", "deprecate TCP relay connections" }
                    p { "We no longer support connecting to the relays using raw TCP, only WebSockets" }
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
                    h3 { id: "overhaul-the-relay-protocol", "Overhaul the relay protocol" }
                    p { "Fix the relay handshake, clean up unused frames." }
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
                    h2 { id: "v0-91-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-91-0-the-last-relay-break",
                            "v0.91.0"
                        }
                    }
                    p { "Jul 30, 2025" }
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
                    h3 { id: "mdns-passive-mode", "mDNS passive mode" }
                    p { "Allow discovering local nodes without advertising your own." }
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
                    h3 { id: "mdns-expiry-events", "mDNS Expiry Events" }
                    p { "Emit expiry events in the `subscribe` stream." }
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
                    h2 { id: "v0-92-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-92-mdns-improvements",
                            "v0.92.0"
                        }
                    }
                    p { "Sep 18, 2025" }
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
                    h3 { id: "endpoint-online", "`Endpoint::online`" }
                    p { "Add method for determining if your endpoint is \"online\"." }
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
                    h3 { id: "dynamically-add-discovery-services",
                        "Dynamically add Discovery services"
                    }
                    p { "Add discovery services to an already running endpoint" }
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
                    h2 { id: "v0-93-0",
                        a { href: "https://www.iroh.computer/blog/iroh-0-93-iroh-online",
                            "v0.93.0"
                        }
                    }
                    p { "Oct 8, 2025" }
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
                    h3 { id: "use-endpoint-instead-of-node", "Use `endpoint` instead of `node`" }
                    p { "Replace references to `node` with `endpoint` in methods, structs, docs, etc" }
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
                    h3 { id: "dynamically-add-relayurl-s", "Dynamically add `RelayUrl`s" }
                    p { "Allow adding and removing `RelayUrl`s to your `RelayMap` in the endpoint" }
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
                    h3 { id: "introduce-endpoint-presets", "Introduce endpoint presets" }
                    p {
                        "Introducing presets, that allow you to easily set discovery and relay defaults for your project"
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
                    h3 { id: "move-tickets-into-their-own-crate",
                        "Move `Tickets` into their own crate"
                    }
                    p { "Tickets now exist in `iroh-ticket`" }
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
                    h2 { id: "v0-94-0", "v0.94.0" }
                    p { "Oct 20, 2025" }
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
                h3 { id: "switch-to-n0-error", "Switch to `n0-error`" }
                p { "Replace `snafu` and `n0-snafu` errors with `n0-error`" }
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
                h3 { id: "make-connection-alpn-and-connection-remote-id-infallible",
                    "Make `Connection::alpn` and `Connection::remote_id` infallible"
                }
                p { "Also adds additional APIs for working with 0-RTT connections" }
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
                h3 { id: "iroh-blobs-compiles-to-wasm", "`iroh-blobs` compiles to WASM" }
                p {}
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
                h2 { id: "v0-95-1", "v0.95.1" }
                p { "Nov 5, 2025" }
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
                h3 { id: "quic-multipath-support", "QUIC Multipath support" }
                p { "implement QUIC multipath" }
                ul {
                    li {
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
                        span { "quinn iroh fork" }
                    }
                    li {
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
                        span { "plumb into iroh" }
                    }
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
                h3 { id: "quic-nat-traversal", "QUIC NAT traversal" }
                p { "Using Quic to traverse NATs" }
                a { href: "https://www.ietf.org/archive/id/draft-seemann-quic-nat-traversal-01.html",
                    "details"
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
                h3 { id: "add-endpointhooks-to-enable-auth-and-connection-inspection",
                    "Add `EndpointHooks` to enable auth and connection inspection"
                }
                p {
                    "`EndpointHooks` allow adding callbacks to specific moments in a connection lifecycle, to give users more control over what happens during the connection and storing both incoming/outgoing connection information"
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
                h3 { id: "rename-discovery-to-addresslookup", "Rename `Discovery` to `AddressLookup`" }
                p { "Use `AddressLookup` rather than `Discovery` for clarity" }
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
                h2 { id: "v0-96-0", "v0.96.0" }
                p { "Jan 27, 2026" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "address-prioritization-in-addresslookup",
                    "Address prioritization in `AddressLookup`"
                }
                p {
                    "Allow users to prioritize which addresses get published in the address lookup system."
                }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "custom-transports", "Custom Transports" }
                p { "Allow users to add custom transports." }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "own-all-foreign-types", "Own all foreign types" }
                p { "Any types that are from dependencies need to be owned or made private" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h2 { id: "v0-97-0", "v0.97.0" }
                p { "2026-02-23" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "release-candidate", "release candidate" }
                p { "publish a release candidate, seeking feedback from the community" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h2 { id: "v1-0-0-rc-0", "v1.0.0-rc.0" }
                p { "Q1 2026" }
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
                    path { d: "M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" }
                }
            }
            div {
                p { "future work" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "draft-specification", "draft specification" }
                p {
                    "draft a specification for the iroh protocol, outlining all open standards iroh uses, noting any deviations"
                }
                ul {
                    li {
                        div {}
                        span { "self-signed TLS" }
                    }
                    li {
                        div {}
                        span { "QUIC" }
                    }
                    li {
                        div {}
                        span { "ICE over QUIC" }
                    }
                    li {
                        div {}
                        span { "STUN over QUIC" }
                    }
                    li {
                        div {}
                        span { "DNS Discovery" }
                    }
                    li {
                        div {}
                        span { "Pkarr" }
                    }
                    li {
                        div {}
                        span { "MDNs" }
                    }
                    li {
                        div {}
                        span { "WebSockets" }
                    }
                    li {
                        div {}
                        span { "iroh relay" }
                    }
                }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "finalize-1-0-spec", "finalize 1.0 spec" }
                p { "ratify the iroh 1.0 wire protocol" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "finalize-ffi-integration", "Finalize FFI integration" }
                p {
                    "protocol developers have a clear path for integrating rust protocols into other languages"
                }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h3 { id: "documentation-refinement", "documentation refinement" }
                p { "ensure documentation is accurate and robust" }
            }
        }
        div {
            div {
                div {}
            }
            div {
                h2 { id: "v1-0", "v1.0" }
                p { "Q1 2026" }
            }
        }
        div {
            div {
                a { href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    svg {
                        xmlns: "http://www.w3.org/2000/svg",
                        view_box: "0 0 20 20",
                        fill: "currentColor",
                        "aria-hidden": "true",
                        "data-slot": "icon",
                        path {
                            fill_rule: "evenodd",
                            d: "M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 1-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z",
                            clip_rule: "evenodd",
                        }
                    }
                }
            }
            div {
                h3 { id: "party", "Party" }
                p { "That's it. All done. no more work left to do, ever. :)" }
            }
        }
    }
}
