//! Content for `/sendme`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn Sendme() -> Element {
    rsx! {
        div {
            div {
                div {
                    p { "Need to send files? Try" }
                    h1 { id: "sendme", "Sendme" }
                    p { "Free. Open source. No account required." }
                }
                img {
                    src: "/img/sendme/sendme_hero_1.svg",
                    alt: "one computer sending files to another computer through a pipe",
                    width: "1600",
                    height: "900",
                    "loading": "lazy",
                }
                div {}
                div {
                    div {
                        div {
                            h2 { id: "file-transferdoesn-t-need-to-be-complicated",
                                "File transfer"
                                br {}
                                "doesn't need to be complicated"
                            }
                            p {
                                "It's like "
                                span { "scp" }
                                " without needing to know the IP address. Add some files to sendme, and it will give you a pastable ticket that you can give to anyone who needs your files. Sendme will connect your devices directly & transfer the data without any accounts or configuration."
                            }
                        }
                        div {
                            h3 { id: "install", "Install" }
                            p { "Add sendme to your machine using bash:" }
                            button {
                                div { "$ curl -fsSL https://iroh.computer/sendme.sh | sh" }
                                span {}
                                svg {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    view_box: "0 0 24 24",
                                    stroke_width: "1.5",
                                    stroke: "currentColor",
                                    "aria-hidden": "true",
                                    "data-slot": "icon",
                                    path {
                                        stroke_linecap: "round",
                                        stroke_linejoin: "round",
                                        d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z",
                                    }
                                }
                            }
                            p { "On windows with PowerShell:" }
                            button {
                                div { "$ iwr https://www.iroh.computer/sendme.ps1 -useb | iex" }
                                span {}
                                svg {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    view_box: "0 0 24 24",
                                    stroke_width: "1.5",
                                    stroke: "currentColor",
                                    "aria-hidden": "true",
                                    "data-slot": "icon",
                                    path {
                                        stroke_linecap: "round",
                                        stroke_linejoin: "round",
                                        d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z",
                                    }
                                }
                            }
                            div {
                                p {
                                    "This will copy the sendme binary to the path you ran the script from."
                                    br {}
                                    "Run it with "
                                }
                                pre { "./sendme" }
                                " on unix systems"
                                p {}
                            }
                        }
                    }
                }
                div {}
                div {
                    div {
                        h3 { id: "using-sendme", "USING SENDME:" }
                    }
                    div {
                        div {
                            div {
                                div {
                                    div {}
                                    div {}
                                    div {}
                                }
                                p { "> $ sendme send ~/great_photos" }
                                p { "content added" }
                                p { "run sendme receive blobQmFoo..." }
                            }
                            h3 { id: "1-setup", "1. Setup" }
                            p {
                                "pass a file or folder you want to share to sendme. It'll spit out a ticket."
                            }
                        }
                        div {
                            div {
                                svg {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    view_box: "0 0 24 24",
                                    stroke_width: "1.5",
                                    stroke: "currentColor",
                                    "aria-hidden": "true",
                                    "data-slot": "icon",
                                    path {
                                        stroke_linecap: "round",
                                        stroke_linejoin: "round",
                                        d: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
                                    }
                                }
                                div { "hey here have some great photos: blobQmFoo..." }
                            }
                            h3 { id: "2-paste", "2. Paste" }
                            p { "copy-paste the ticket to your friend." }
                        }
                        div {
                            div {
                                div {
                                    div {}
                                    div {}
                                    div {}
                                }
                                p { "> $ sendme receive blobQmFoo..." }
                                p { "fetched to great_photos" }
                            }
                            h3 { id: "3-download", "3. Download" }
                            p { "run get to fetch data directly from your friend." }
                        }
                    }
                }
                div {}
                div {
                    div {
                        div {
                            h3 { id: "free-for-files-folders-of-any-size",
                                "Free, for files & folders of any size"
                            }
                            p {
                                "sendme works by connecting sender and receiver directly, so there's no need to upload to a server, which means no cost!"
                            }
                        }
                        div {
                            div {
                                h3 { id: "fast", "Fast" }
                                p { "Sendme can saturate a 4Gbps connection." }
                            }
                            div {
                                h3 { id: "resumable-fetching", "Resumable fetching" }
                                p { "Interrupted downloads pick up where they left off." }
                            }
                            div {
                                h3 { id: "integrity-checks", "Integrity checks" }
                                p {
                                    "Data is automatically verified for correctness on both send and receive."
                                }
                            }
                        }
                    }
                    div {
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
                        a { href: "/", "BUILD ON IROH" }
                    }
                }
                div {}
            }
        }
    }
}
