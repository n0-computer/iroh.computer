//! Content for `/sendme`. Edit this Dioxus component directly.
//!
//! The page keeps the layout of the pre-Dioxus design: a bordered sheet with a
//! Koulen display face, terminal-style walkthrough cards, and a closing
//! "built on iroh" panel. Styles live in `assets/sendme.css`.
use dioxus::prelude::*;

const INSTALL_SH: &str = "curl -fsSL https://iroh.computer/sendme.sh | sh";
const INSTALL_PS: &str = "iwr https://www.iroh.computer/sendme.ps1 -useb | iex";
const CLIPBOARD_ICON: &str = "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z";
const CLIPBOARD_CHECK_ICON: &str = "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75";
const CHAT_ICON: &str = "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z";

#[component]
pub(super) fn Sendme() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/sendme.css") }
        // The page keeps its original white design regardless of the site theme.
        main { id: "content", class: "sendme-page",
          div { class: "sendme-inner wrap",
            div { class: "sendme-hero",
                p { class: "sendme-kicker", "Need to send files? Try" }
                h1 { id: "sendme", "Sendme" }
                p { class: "sendme-tagline", "Free. Open source. No account required." }
            }
            img {
                class: "sendme-hero-art",
                src: "/img/sendme/sendme_hero_1.svg",
                alt: "one computer sending files to another computer through a pipe",
                width: "1600",
                height: "900",
            }

            div { class: "sendme-spacer sendme-spacer-hero" }
            section { class: "sendme-sheet", "aria-labelledby": "file-transferdoesn-t-need-to-be-complicated",
                div { class: "sendme-split",
                    div { class: "sendme-cell sendme-intro",
                        h2 { id: "file-transferdoesn-t-need-to-be-complicated",
                            "File transfer"
                            br {}
                            "doesn't need to be complicated"
                        }
                        p {
                            "It's like "
                            code { "scp" }
                            " without needing to know the IP address. Add some files to sendme, and it will give you a pastable ticket that you can give to anyone who needs your files. Sendme will connect your devices directly & transfer the data without any accounts or configuration."
                        }
                    }
                    div { class: "sendme-cell sendme-install",
                        h3 { id: "install", "Install" }
                        p { "Add sendme to your machine using bash:" }
                        CopyCommand { command: INSTALL_SH }
                        p { "On windows with PowerShell:" }
                        CopyCommand { command: INSTALL_PS }
                        p { class: "sendme-install-note",
                            "This will copy the sendme binary to the path you ran the script from."
                            br {}
                            "Run it with "
                            code { "./sendme" }
                            " on unix systems"
                        }
                    }
                }
            }

            div { class: "sendme-spacer" }
            section { class: "sendme-sheet", "aria-labelledby": "using-sendme",
                div { class: "sendme-section-title",
                    h3 { id: "using-sendme", "USING SENDME:" }
                }
                div { class: "sendme-steps",
                    div { class: "sendme-step",
                        div { class: "sendme-terminal",
                            div { class: "sendme-terminal-dots", div {} div {} div {} }
                            p { class: "sendme-terminal-cmd", "> $ sendme send ~/great_photos" }
                            p { "content added" }
                            p { "run sendme receive blobQmFoo..." }
                        }
                        h3 { id: "1-setup", "1. Setup" }
                        p { "pass a file or folder you want to share to sendme. It'll spit out a ticket." }
                    }
                    div { class: "sendme-step",
                        div { class: "sendme-chat",
                            svg {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                view_box: "0 0 24 24",
                                stroke_width: "1.5",
                                stroke: "currentColor",
                                "aria-hidden": "true",
                                path { stroke_linecap: "round", stroke_linejoin: "round", d: CHAT_ICON }
                            }
                            div { class: "sendme-bubble", "hey here have some great photos: blobQmFoo..." }
                        }
                        h3 { id: "2-paste", "2. Paste" }
                        p { "copy-paste the ticket to your friend." }
                    }
                    div { class: "sendme-step",
                        div { class: "sendme-terminal",
                            div { class: "sendme-terminal-dots", div {} div {} div {} }
                            p { class: "sendme-terminal-cmd", "> $ sendme receive blobQmFoo..." }
                            p { "fetched to great_photos" }
                        }
                        h3 { id: "3-download", "3. Download" }
                        p { "run get to fetch data directly from your friend." }
                    }
                }
            }

            div { class: "sendme-spacer" }
            section { class: "sendme-sheet", "aria-labelledby": "free-for-files-folders-of-any-size",
                div { class: "sendme-cell",
                    h3 { id: "free-for-files-folders-of-any-size", class: "sendme-feature-lead",
                        "Free, for files & folders of any size"
                    }
                    p {
                        "sendme works by connecting sender and receiver directly, so there's no need to upload to a server, which means no cost!"
                    }
                }
                div { class: "sendme-features",
                    div { class: "sendme-cell",
                        h3 { id: "fast", "Fast" }
                        p { "Sendme can saturate a 4Gbps connection." }
                    }
                    div { class: "sendme-cell",
                        h3 { id: "resumable-fetching", "Resumable fetching" }
                        p { "Interrupted downloads pick up where they left off." }
                    }
                    div { class: "sendme-cell",
                        h3 { id: "integrity-checks", "Integrity checks" }
                        p { "Data is automatically verified for correctness on both send and receive." }
                    }
                }
                div { class: "sendme-built-on",
                    h2 { id: "sendme-is-built-on-iroh",
                        "Sendme is built on "
                        a { href: "/", "iroh" }
                    }
                    p {
                        "Just like "
                        a { href: "https://dumbpipe.dev", "dumbpipe" }
                        ", sendme is built on iroh. Sendme uses "
                        a { href: "/docs/overview", "iroh" }
                        " to establish direct links between devices for data transfer, and "
                        a { href: "/proto/iroh-blobs", "iroh-blobs" }
                        " to send and verify your files. Check out the sendme "
                        a { href: "https://github.com/n0-computer/sendme", "repository" }
                        "."
                    }
                    a { class: "button primary", href: "/", "BUILD ON IROH" }
                }
            }
            div { class: "sendme-spacer sendme-spacer-end" }
          }
        }
    }
}

/// A one-line install command with a copy-to-clipboard button.
#[component]
fn CopyCommand(command: &'static str) -> Element {
    let mut copied = use_signal(|| false);
    rsx! {
        button {
            class: "sendme-copy",
            r#type: "button",
            title: "Copy to clipboard",
            onclick: move |_| async move {
                let json = serde_json::to_string(command).unwrap();
                let mut eval = document::eval(&format!("dioxus.send(await window.iroh.copy({json}))"));
                let ok = eval.recv::<bool>().await.unwrap_or(false);
                copied.set(ok);
                if ok {
                    let _ = document::eval("await new Promise(r => setTimeout(r, 1300))").await;
                    copied.set(false);
                }
            },
            span { class: "sendme-copy-cmd", "$ {command}" }
            span { class: "sendme-copy-status", "aria-live": "polite",
                if copied() { "copied!" }
            }
            svg {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                view_box: "0 0 24 24",
                stroke_width: "1.5",
                stroke: "currentColor",
                "aria-hidden": "true",
                path {
                    stroke_linecap: "round",
                    stroke_linejoin: "round",
                    d: if copied() { CLIPBOARD_CHECK_ICON } else { CLIPBOARD_ICON },
                }
            }
        }
    }
}
