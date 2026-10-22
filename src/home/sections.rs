//! Homepage copy and markup. Edit these components directly; no HTML import step.
use dioxus::prelude::*;
use crate::Icon;
#[component]
pub(super) fn CustomerLogos() -> Element {
    rsx! {
        div {
            div {
                div {
                    div {
                        a {
                            href: "https://cmux.com/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/cmux-light.png",
                                alt: "cmux logo",
                                width: "100",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/cmux-dark.png",
                                alt: "cmux logo",
                                width: "100",
                                height: "100",
                                class: "theme-dark",
                            }
                            span { "cmux" }
                        }
                        a {
                            href: "https://www.spacedrive.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/spacedrive.png",
                                alt: "spacedrive logo",
                                width: "220.00000000000003",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/spacedrive.png",
                                alt: "spacedrive logo",
                                width: "220.00000000000003",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://nousresearch.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/nous.png",
                                alt: "nous logo",
                                width: "140",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/nous.png",
                                alt: "nous logo",
                                width: "140",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://meshllm.cloud",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/meshllm.svg",
                                alt: "meshllm logo",
                                width: "140",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/meshllm.svg",
                                alt: "meshllm logo",
                                width: "140",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://strada.tech",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/strada.png",
                                alt: "strada logo",
                                width: "100",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/strada.png",
                                alt: "strada logo",
                                width: "100",
                                height: "100",
                                class: "theme-dark",
                            }
                            span { "strada" }
                        }
                        a {
                            href: "https://www.paycode.com.mx",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/paycode.svg",
                                alt: "paycode logo",
                                width: "140",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/paycode.svg",
                                alt: "paycode logo",
                                width: "140",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://rave.io",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/rave.png",
                                alt: "rave logo",
                                width: "140",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/rave.png",
                                alt: "rave logo",
                                width: "140",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        Link { to: "/blog/buzz-agent-workspaces",
                            img {
                                src: "/img/user-logos/block-light.png",
                                alt: "block logo",
                                width: "160",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/block-dark.png",
                                alt: "block logo",
                                width: "160",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://delta.chat",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/delta_chat.png",
                                alt: "delta_chat logo",
                                width: "220.00000000000003",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/delta_chat.png",
                                alt: "delta_chat logo",
                                width: "220.00000000000003",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://ottomatic.io",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/ottomatic.png",
                                alt: "ottomatic logo",
                                width: "100",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/ottomatic.png",
                                alt: "ottomatic logo",
                                width: "100",
                                height: "100",
                                class: "theme-dark",
                            }
                            span { "Ottomatic" }
                        }
                        a {
                            href: "https://rayfish.xyz",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/rayfish.png",
                                alt: "rayfish logo",
                                width: "100",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/rayfish.png",
                                alt: "rayfish logo",
                                width: "100",
                                height: "100",
                                class: "theme-dark",
                            }
                            span { "Rayfish" }
                        }
                        a {
                            href: "https://outl.app",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            span { "Outl" }
                        }
                        a {
                            href: "https://www.datum.net",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/datum.svg",
                                alt: "datum logo",
                                width: "140",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/datum.svg",
                                alt: "datum logo",
                                width: "140",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://fedimint.org",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/fedimint.png",
                                alt: "fedimint logo",
                                width: "140",
                                height: "100",
                                class: "theme-light",
                            }
                            img {
                                src: "/img/user-logos/fedimint.png",
                                alt: "fedimint logo",
                                width: "140",
                                height: "100",
                                class: "theme-dark",
                            }
                        }
                        a {
                            href: "https://terraclear.com/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            img {
                                src: "/img/user-logos/terraclear.svg",
                                alt: "TerraClear",
                                width: 289,
                                height: 24,
                            }
                        }
                    }
                }
            }
        }
    }
}
#[component]
pub(super) fn Testimonials() -> Element {
    rsx! {
        figure {
            blockquote {
                p {
                    "“Iroh is the magic behind our ability to facilitate millions of private backbones in minutes. Impossible with traditional networks.”"
                }
            }
            figcaption {
                img {
                    src: "/img/user-logos/datum.svg",
                    alt: "",
                    "aria-hidden": "true",
                }
                div {
                    div { "Drew Raines" }
                    div { "Head of Engineering at Datum" }
                }
            }
        }
        figure {
            blockquote {
                p { "“Using iroh halved our compute budget.”" }
            }
            figcaption {
                img {
                    src: "/img/user-logos/nous.png",
                    alt: "",
                    "aria-hidden": "true",
                }
                div {
                    div { "Ari Lotter" }
                    div { "Principal Engineer at Nous" }
                }
            }
        }
        figure {
            blockquote {
                p {
                    "“With iroh, every node is just a public key. We pool GPUs across clouds and closets into one mesh. No central server, no NAT config.”"
                }
            }
            figcaption {
                img {
                    src: "/img/user-logos/block-dark.png",
                    alt: "",
                    "aria-hidden": "true",
                }
                div {
                    div { "Michael Neale" }
                    div { "Principal Engineer at Block" }
                }
            }
        }
    }
}
#[component]
pub(super) fn ConnectionFeatures() -> Element {
    rsx! {
        li {
            span { FeatureCheck {} }
            div {
                h3 { id: "use-all-the-paths", "Use all the paths" }
                p {
                    "iroh's QUIC multipath implementation automatically switches between Wi-Fi, cellular, ethernet, LAN, LoRa, HaLow, Tor, "
                    a { href: "https://docs.iroh.computer/transports/bluetooth", "Bluetooth" }
                    "—or bring your own transport."
                }
            }
        }
        li {
            span { FeatureCheck {} }
            div {
                h3 { id: "lean-on-the-cloud-less", "Lean on the cloud less" }
                p {
                    "Direct links bypass NATs and firewalls, with "
                    a { href: "https://docs.iroh.computer/concepts/relays", "stateless relays" }
                    " as fallback. No data is stored on the cloud, unless you explicitly choose to store it there."
                }
            }
        }
        li {
            span { FeatureCheck {} }
            div {
                h3 { id: "encrypted-and-observable", "Encrypted and observable" }
                p {
                    "Secure end-to-end encryption with optional "
                    a { href: "https://docs.iroh.computer/iroh-services/metrics",
                        "observability"
                    }
                    " to diagnose issues and improve performance."
                }
            }
        }
    }
}
#[component]
pub(super) fn SavingsContent() -> Element {
    rsx! {
        div { class: "content-grid",
            div {
                p { "Lower infrastructure costs" }
                h2 { id: "move-data-directly-pay-the-cloud-less",
                    "Move data directly. Pay the cloud less."
                }
                p {
                    "Your application data stays on your endpoints. No cloud storage required. Relays only forward end-to-end encrypted packets when a direct path is unavailable, cutting cloud egress costs."
                }
                div {
                    div {
                        p { "No cloud storage required" }
                        p { "data can stay on endpoints" }
                    }
                    div {
                        p { "Relays only forward" }
                        p { "encrypted packets as fallback" }
                    }
                }
                Link { to: "/blog/shared-relays",
                    "See the full cost breakdown "
                    Icon { name: "arrow" }
                }
            }
            div {
                div {
                    div {
                        p { "Example workload" }
                        p { "2,000 devices × 10 GB/month" }
                    }
                }
                div {
                    div {
                        div {
                            p { "Centralized server on AWS" }
                            p { "20 TB crosses provider infrastructure" }
                        }
                        div {
                            p { "~$1,742/mo" }
                            p { "plus compute" }
                        }
                    }
                    div {
                        div {
                            p { "Iroh Pro at 95% direct" }
                            p { "Only 1 TB traverses the relay" }
                        }
                        div {
                            p { "~$100/mo" }
                            p { "Pro plus egress" }
                        }
                    }
                }
                div {
                    p { "Estimated monthly savings" }
                    p { "$1,642" }
                }
                p {
                    "Illustrative estimate based on 95% direct traffic. Actual direct rates and costs vary by network conditions, usage, and region."
                }
            }
        }
    }
}
#[component]
pub(super) fn OpenSourceCopy() -> Element {
    rsx! {
        "iroh is an "
        a { href: "https://github.com/n0-computer/iroh", "open source" }
        " peer-to-peer networking stack built on open standards, so you're never locked in. Connect over our free community "
        a { href: "https://docs.iroh.computer/concepts/relays", "infrastructure" }
        ", self-host your own, let us "
        Link { to: "/services/hosting", "host services for you" }
        ", and switch between them anytime."
    }
}
#[component]
pub(super) fn UseCaseCards() -> Element {
    rsx! {
        Link { to: "/solutions/vpn",
            UseCaseMark { kind: "access" }
            div {
                div {
                    p { "Remote access" }
                    Icon { name: "arrow" }
                }
                p {
                    "Embed direct, encrypted connections right in your app and create tunnels for remote access instead of third-party VPNs."
                }
            }
        }
        Link { to: "/solutions/distributed-ai",
            UseCaseMark { kind: "ai" }
            div {
                div {
                    p { "Distributed AI training" }
                    Icon { name: "arrow" }
                }
                p {
                    "Train foundation LLMs with compute distributed around the world, across AWS, GCP, Azure, and self-hosted infrastructure."
                }
            }
        }
        Link { to: "/solutions/video",
            UseCaseMark { kind: "video" }
            div {
                div {
                    p { "Video streaming" }
                    Icon { name: "arrow" }
                }
                p {
                    "Stream video between devices, using peer to peer technology. Create encrypted connections built on open standards, across the globe or across the room."
                }
            }
        }
        Link { to: "/solutions/data-sync",
            UseCaseMark { kind: "sync" }
            div {
                div {
                    p { "Data sync & device backup" }
                    Icon { name: "arrow" }
                }
                p {
                    "Powers apps for hundreds of thousands of devices around the world, even when internet access is precarious."
                }
            }
        }
        Link { to: "/solutions/pos",
            UseCaseMark { kind: "payments" }
            div {
                div {
                    p { "Point of sale payments" }
                    Icon { name: "arrow" }
                }
                p {
                    "Connect payment terminals directly to point of sale systems over Bluetooth, LAN, or Wi-Fi with full PCI compliance and no additional servers."
                }
            }
        }
        Link { to: "/solutions/iot",
            UseCaseMark { kind: "devices" }
            div {
                div {
                    p { "IoT & embedded devices" }
                    Icon { name: "arrow" }
                }
                p {
                    "Run iroh on ESP32, Raspberry Pi, and Linux with the same API. Devices discover each other automatically. No brokers, no gateways."
                }
            }
        }
    }
}
#[component]
fn UseCaseMark(kind: &'static str) -> Element {
    let path = match kind {
        "access" => "M9 15l6-6M10 7l2-2a5 5 0 0 1 7 7l-2 2M14 17l-2 2a5 5 0 0 1-7-7l2-2",
        "ai" => "M12 3v4m0 10v4M3 12h4m10 0h4M5 5l3 3m8 8 3 3M19 5l-3 3M8 16l-3 3M12 7l5 5-5 5-5-5Z",
        "video" => "M8 5l11 7-11 7Z",
        "sync" => "M4 10a8 8 0 0 1 14-4l2 2M20 3v5h-5M20 14a8 8 0 0 1-14 4l-2-2M4 21v-5h5",
        "payments" => "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM3 10h18M7 15h3",
        _ => "M8 8h8v8H8ZM8 3v3m8-3v3M8 18v3m8-3v3M3 8h3m12 0h3M3 16h3m12 0h3",
    };
    rsx! {
        span { class: "use-case-mark", "aria-hidden": "true",
            svg {
                view_box: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                stroke_width: "1.5",
                stroke_linecap: "round",
                stroke_linejoin: "round",
                path { d: path }
            }
        }
    }
}
#[component]
pub(super) fn ProductionFeatures() -> Element {
    rsx! {
        li {
            span { FeatureCheck {} }
            div {
                h3 { id: "performant", "Performant" }
                p {
                    "Every commit to iroh's main branch runs through a growing set of "
                    a { href: "https://perf.iroh.computer", target: "_blank", "simulations & tests" }
                    "."
                }
            }
        }
        li {
            span { FeatureCheck {} }
            div {
                h3 { id: "monitored", "Monitored" }
                p {
                    a { href: "https://docs.iroh.computer/iroh-services/metrics",
                        "Observability"
                    }
                    " and "
                    a { href: "https://docs.iroh.computer/iroh-services/net-diagnostics/quickstart",
                        "network diagnostics"
                    }
                    " track connection health and throughput."
                }
            }
        }
        li {
            span { FeatureCheck {} }
            div {
                h3 { id: "supported", "Supported" }
                p {
                    "Every major release is "
                    a { href: "https://docs.iroh.computer/about/release-policy",
                        "supported for multiple years"
                    }
                    " with extended support contracts available."
                }
            }
        }
    }
}
#[component]
fn FeatureCheck() -> Element {
    rsx! {
        svg {
            width: "24",
            height: "24",
            view_box: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            stroke_width: "2",
            stroke_linecap: "round",
            stroke_linejoin: "round",
            "aria-hidden": "true",
            rect {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
            }
            path { d: "m9 12 2 2 4-4" }
        }
    }
}
