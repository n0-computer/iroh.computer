//! Content for `/docs/examples`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsExamplesIndex() -> Element {
    rsx! {
        h1 { id: "examples", "Examples" }
        p {
            "Learn by examining practical code examples. We try to collage together examples to show a broad range of platforms & techniques while working with iroh."
        }
        aside { class: "note",
            p {
                "The "
                a { href: "https://github.com/n0-computer/iroh-examples", "iroh examples repo" }
                " has a grab bag of extra examples. Post an issue there if you have a request for a specific example, or "
                a { href: "https://iroh.computer/discord", "join the discord" }
                "."
            }
        }
        div {
            div { class: "content-grid content-cards",
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_kf_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_kf_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1kf_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1kf_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "gossip-chat",
                            a { href: "/docs/examples/gossip-chat",
                                span {}
                                "Gossip Chat"
                            }
                        }
                        p { "A simple chat app using iroh-gossip topic swarms." }
                        ul {
                            span { "gossip" }
                            span { "CLI" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_kn_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_kn_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1kn_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1kn_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "todos",
                            a { href: "https://github.com/n0-computer/iroh-examples/tree/main/tauri-todos",
                                span {}
                                "Todos"
                            }
                        }
                        p { "See iroh in the classic TODO app example with a tauri desktop GUI." }
                        ul {
                            span { "data modeling" }
                            span { "CLI" }
                            span { "tauri" }
                            span { "desktop" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_kv_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_kv_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1kv_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1kv_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "sendme",
                            a { href: "https://github.com/n0-computer/sendme",
                                span {}
                                "Sendme"
                            }
                        }
                        p { "A file sharing CLI, built with iroh, fully open source!" }
                        ul {
                            span { "CLI" }
                            span { "file sharing" }
                            span { "blobs" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_l7_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_l7_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1l7_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1l7_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "dumbpipe",
                            a { href: "https://github.com/n0-computer/dumbpipe",
                                span {}
                                "Dumbpipe"
                            }
                        }
                        p {
                            "Need to connect two computers? Try a dumb pipe. Expose unix pipes or locally running TCP servers via iroh."
                        }
                        ul {
                            span { "CLI" }
                            span { "unix pipes" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_lf_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_lf_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1lf_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1lf_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "extism",
                            a { href: "https://github.com/n0-computer/iroh-examples/tree/main/extism",
                                span {}
                                "Extism"
                            }
                        }
                        p {
                            "Provide Iroh APIs to all kinds of languages with iroh extism host functions"
                        }
                        ul {
                            span { "plugins" }
                            span { "multi-language" }
                            span { "WASM" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_ln_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_ln_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1ln_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1ln_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "automerge",
                            a { href: "https://github.com/n0-computer/iroh-examples/tree/main/iroh-automerge",
                                span {}
                                "Automerge"
                            }
                        }
                        p { "Sync two automerge documents across machines via iroh connections." }
                        ul {
                            span { "protocol" }
                            span { "CRDTs" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_lv_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_lv_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1lv_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1lv_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "automerge-repo",
                            a { href: "https://github.com/n0-computer/iroh-examples/tree/main/iroh-automerge-repo",
                                span {}
                                "Automerge Repo"
                            }
                        }
                        p { "Sync and gossip repositories of Automerge documents peer to peer." }
                        ul {
                            span { "protocol" }
                            span { "CRDTs" }
                            span { "automerge-repo" }
                        }
                    }
                }
                div {
                    div {
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_m7_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_m7_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                        div {}
                        div {
                            svg { "aria-hidden": "true",
                                defs {
                                    pattern {
                                        id: "_R_1m7_",
                                        width: "72",
                                        height: "56",
                                        pattern_units: "userSpaceOnUse",
                                        x: "50%",
                                        y: "16",
                                        path { d: "M.5 56V.5H72", fill: "none" }
                                    }
                                }
                                rect {
                                    width: "100%",
                                    height: "100%",
                                    stroke_width: "0",
                                    fill: "url(#_R_1m7_)",
                                }
                                svg {
                                    x: "50%",
                                    y: "16",
                                    "aria-hidden": "true",
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "0",
                                        y: "56",
                                    }
                                    rect {
                                        stroke_width: "0",
                                        width: "73",
                                        height: "57",
                                        x: "72",
                                        y: "168",
                                    }
                                }
                            }
                        }
                    }
                    div {}
                    div {
                        h3 { id: "swarmie",
                            a { href: "https://github.com/n0-computer/swarmie",
                                span {}
                                "Swarmie"
                            }
                        }
                        p {
                            "A proof of concept tool to use iroh global content discovery using the bittorrent mainline DHT."
                        }
                        ul {
                            span { "CLI" }
                            span { "DHTs" }
                            span { "content discovery" }
                        }
                    }
                }
            }
        }
    }
}
