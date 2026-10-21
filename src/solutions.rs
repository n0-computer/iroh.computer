use crate::contact::ContactButton;
use crate::network::Network;
use crate::Route;
use dioxus::prelude::*;

#[derive(Clone, PartialEq)]
pub struct UseCase {
    slug: &'static str,
    number: &'static str,
    label: &'static str,
    title: &'static str,
    emphasis: &'static str,
    description: &'static str,
    summary: &'static str,
    tags: [&'static str; 3],
    diagram_caption: &'static str,
    features: [(&'static str, &'static str); 3],
    resources: [(&'static str, &'static str, &'static str); 3],
}

static USE_CASES: [UseCase; 6] = [
    UseCase {
        slug: "vpn",
        number: "01",
        label: "Remote access",
        title: "Reach the device.",
        emphasis: "Skip the detour.",
        description: "Connect to a device by public key. Iroh handles encryption, NAT traversal, and relay fallback.",
        summary: "Build remote access into your app, without asking users to install a separate VPN client.",
        tags: [
            "Public-key identity",
            "NAT traversal",
            "Embedded in your app",
        ],
        diagram_caption: "An app-to-device connection. Direct when possible, relayed when needed.",
        features: [
            (
                "Identity over location",
                "Reach the same device even when its IP address changes.",
            ),
            (
                "Connectivity built in",
                "Connect directly when possible, with relay fallback when needed.",
            ),
            (
                "Part of your product",
                "Embed iroh in your app. No separate VPN client for users.",
            ),
        ],
        resources: [
            (
                "Quickstart",
                "Make your first connection",
                "https://docs.iroh.computer/quickstart",
            ),
            (
                "Pigeons",
                "SSH by endpoint identity",
                "https://pigeons.computer",
            ),
            (
                "Relay infrastructure",
                "Understand the fallback path",
                "https://docs.iroh.computer/concepts/relays",
            ),
        ],
    },
    UseCase {
        slug: "distributed-ai",
        number: "02",
        label: "Distributed AI",
        title: "Compute is everywhere.",
        emphasis: "Connect it.",
        description: "Connect GPUs across clouds and homes for distributed training and inference.",
        summary: "Pool GPUs across providers and spend less on training.",
        tags: ["Distributed training", "Peer inference", "Gossip + blobs"],
        diagram_caption: "A peer network for coordination and data transfer across infrastructure boundaries.",
        features: [
            (
                "Coordinate the swarm",
                "Use gossip to coordinate peers across providers.",
            ),
            (
                "Move the heavy parts",
                "Transfer model data with blobs. Your app handles scheduling.",
            ),
            (
                "Keep another path open",
                "Relay fallback keeps otherwise unreachable peers connected.",
            ),
        ],
        resources: [
            (
                "Nous Research",
                "Explore distributed training in practice",
                "https://nousresearch.com",
            ),
            (
                "Mesh LLM",
                "Distributed inference in practice",
                "/blog/mesh-llm",
            ),
            (
                "Iroh gossip",
                "Coordinate a network of peers",
                "https://docs.iroh.computer/proto/iroh-gossip",
            ),
        ],
    },
    UseCase {
        slug: "video",
        number: "03",
        label: "Video streaming",
        title: "Across the room.",
        emphasis: "Across the world.",
        description: "Stream encrypted video between devices with iroh and Media over QUIC.",
        summary: "Bring real-time media directly to viewers, with encrypted connections and relay fallback.",
        tags: ["Media over QUIC", "On-demand streams", "Encrypted delivery"],
        diagram_caption: "Viewers request media from a publisher. Relays provide an alternate connection path.",
        features: [
            (
                "Stream on demand",
                "Send video only when a viewer requests it.",
            ),
            (
                "Control access",
                "Encrypt each connection and choose who can watch.",
            ),
            (
                "Adapt to the network",
                "Use direct connections, with relays when needed.",
            ),
        ],
        resources: [
            (
                "Streaming docs",
                "Build with the media stack",
                "https://docs.iroh.computer/protocols/streaming",
            ),
            (
                "Media over QUIC",
                "Explore MoQ’s design",
                "https://doc.moq.dev/",
            ),
            (
                "Secure video everywhere",
                "Read the technical deep dive",
                "/blog/secure-video-everywhere",
            ),
        ],
    },
    UseCase {
        slug: "data-sync",
        number: "04",
        label: "Data sync",
        title: "Build direct.",
        emphasis: "Create an advantage.",
        description: "Give users access to files on remote devices, without requiring a cloud copy first. Build new workflows around direct, encrypted connections.",
        summary: "Build new workflows around direct access. Strada connects editors to media on remote drives.",
        tags: ["Remote workflows", "File transfer", "Multi-device sync"],
        diagram_caption: "Devices exchange data directly when possible. A relay is the fallback, not the destination.",
        features: [
            (
                "Skip the cloud upload",
                "Let users transfer files from the device that already has them, without staging a copy in cloud storage.",
            ),
            (
                "Keep contents private",
                "End-to-end encryption keeps file contents private, including from relays.",
            ),
            (
                "Build beyond files",
                "Use the same connection for setup, messages, and app state.",
            ),
        ],
        resources: [
            (
                "Iroh blobs",
                "Transfer and verify content",
                "https://docs.iroh.computer/proto/iroh-blobs",
            ),
            (
                "Delta Chat",
                "Read about real-time webxdc apps",
                "https://delta.chat/en/2024-11-20-webxdc-realtime",
            ),
            (
                "Pricing",
                "Estimate hosting and metrics",
                "/pricing#estimate-your-monthly-cost",
            ),
        ],
    },
    UseCase {
        slug: "pos",
        number: "05",
        label: "Payments & point of sale",
        title: "Keep the checkout",
        emphasis: "connected.",
        description: "Connect your POS app to payment terminals over local networks or Bluetooth, without a local message broker.",
        summary: "Connect tills and terminals directly. Paycode brought this approach to highway toll booths.",
        tags: ["Local connectivity", "Cross-platform", "Direct commands"],
        diagram_caption: "The POS exchanges commands and status with the terminal. Payment processing stays with the payment system.",
        features: [
            (
                "Remove the local broker",
                "Send commands and results directly between the POS and terminal.",
            ),
            (
                "Work across platforms",
                "Connect Kotlin Android apps to .NET terminals, as Paycode did.",
            ),
            (
                "Keep local paths local",
                "Local device links can work offline. Payment authorization still depends on your provider.",
            ),
        ],
        resources: [
            (
                "Paycode case study",
                "From Android to .NET terminals",
                "/blog/paycode",
            ),
            (
                "Local discovery",
                "Find peers on the local network",
                "https://docs.iroh.computer/connecting/local-discovery",
            ),
            (
                "Bluetooth transport",
                "Connect nearby devices",
                "https://docs.iroh.computer/transports/bluetooth",
            ),
        ],
    },
    UseCase {
        slug: "iot",
        number: "06",
        label: "IoT & embedded",
        title: "Small devices.",
        emphasis: "Direct connections.",
        description: "Connect embedded devices to each other and your app, on the same LAN or across the internet.",
        summary: "Connect ESP32, Raspberry Pi, and Linux devices with the same networking approach.",
        tags: ["Local discovery", "Embedded devices", "QUIC"],
        diagram_caption: "Local peers discover one another and connect directly. Each device keeps its own identity.",
        features: [
            (
                "Discover nearby peers",
                "Find devices on the same LAN without tracking IP addresses.",
            ),
            (
                "Give devices an identity",
                "Recognize a device by its public key, wherever it connects.",
            ),
            (
                "Bridge different hardware",
                "Connect supported microcontrollers, Linux boards, and mobile apps.",
            ),
        ],
        resources: [
            (
                "Iroh on ESP32",
                "Read the embedded deep dive",
                "/blog/iroh-on-esp32",
            ),
            (
                "Compatibility matrix",
                "Check your target platform",
                "https://docs.iroh.computer/compatibility",
            ),
            (
                "Local discovery",
                "Connect devices on a LAN",
                "https://docs.iroh.computer/connecting/local-discovery",
            ),
        ],
    },
];

pub fn find(slug: &str) -> Option<&'static UseCase> {
    USE_CASES.iter().find(|solution| solution.slug == slug)
}

#[component]
pub fn Solutions() -> Element {
    rsx! {
        document::Title { "Solutions & use cases — iroh" }
        document::Stylesheet { href: asset!("/assets/solutions.css") }
        main { id: "content", class: "wrap use-cases-page",
            header { class: "use-cases-intro",
                p { class: "uc-kicker", "IROH / IN THE FIELD" }
                div { class: "uc-index-heading",
                    h1 { "Less infrastructure." br {} span { "More possibilities." } }
                    p { "See what teams build with direct connections." }
                }
            }
            section { "aria-label": "Explore use cases",
                div { class: "uc-rule", span { "01—06 / USE CASES" } span { "ONE NETWORKING FOUNDATION" } }
                div { class: "uc-directory",
                    for solution in &USE_CASES {
                        Link { class: "uc-directory-card", to: format!("/solutions/{}", solution.slug),
                            div { class: "uc-card-top", span { "[{solution.number}]" } span { "↗" } }
                            p { class: "uc-kicker", "{solution.label}" }
                            h2 { "{solution.title}" br {} span { "{solution.emphasis}" } }
                            p { class: "uc-card-description", "{solution.summary}" }
                            div { class: "uc-card-bottom", span { "{solution.tags[0]}" } span { "Explore use case →" } }
                        }
                    }
                }
            }
            BuildNext { heading: "What are you connecting?", description: "Start with the quickstart, or work with the iroh team on your deployment." }
        }
    }
}

#[component]
pub fn SolutionPage(solution: &'static UseCase) -> Element {
    rsx! {
        document::Title { "{solution.label} — iroh" }
        document::Stylesheet { href: asset!("/assets/solutions.css") }
        main { id: "content", class: "wrap use-case-page",
            nav { class: "uc-breadcrumb", "aria-label": "Breadcrumb",
                Link { to: Route::Solutions {}, "← All use cases" }
                span { "/" } span { "{solution.label}" }
            }
            header { class: "uc-hero",
                div { class: "uc-hero-copy",
                    p { class: "uc-kicker", "USE CASE / {solution.number}" }
                    h1 { "{solution.title}" br {} span { "{solution.emphasis}" } }
                    p { class: "uc-lede", "{solution.description}" }
                    div { class: "uc-actions",
                        a { class: "button primary", href: solution.resources[0].2, "{solution.resources[0].0}" span { "↗" } }
                        a { class: "text-link", href: "#in-practice", "See it in practice" span { "↓" } }
                    }
                }
                if solution.slug == "vpn" {
                    Network {}
                } else if solution.slug == "pos" {
                    figure { class: "uc-demo-video",
                        video { src: "/img/pos-demo.mov", controls: true, playsinline: true, preload: "metadata", "aria-label": "Paycode point-of-sale demonstration", "aria-describedby": "pos-demo-caption",
                            a { href: "/img/pos-demo.mov", "Download the Paycode demonstration video" }
                        }
                        figcaption { id: "pos-demo-caption", "Paycode’s point-of-sale integration in action." }
                    }
                } else if solution.slug == "video" {
                    figure { class: "uc-demo-video uc-streaming-video",
                        iframe {
                            src: "https://www.youtube-nocookie.com/embed/GKvSE2g_Yss",
                            title: "Video streaming with iroh",
                            allow: "encrypted-media; fullscreen; picture-in-picture",
                            allowfullscreen: true,
                            referrerpolicy: "strict-origin-when-cross-origin",
                        }
                        figcaption {
                            a { class: "text-link", href: "https://youtu.be/GKvSE2g_Yss", "Watch on YouTube" span { "↗" } }
                        }
                    }
                } else if solution.slug == "iot" {
                    figure { class: "uc-embedded-photo",
                        img { src: "/img/embedded-device-zoo.jpg", alt: "ESP32 and Pi Pico development boards on breadboards, connected to a USB hub and running iroh", width: 1255, height: 937 }
                        figcaption {
                            span { "The device zoo. All running iroh." }
                            a { href: "https://bsky.app/profile/rklaehn.bsky.social/post/3mwn7ibiw3s2i", "From the workbench ↗" }
                        }
                    }
                } else if solution.slug == "data-sync" { StradaQuote {} } else if solution.slug == "distributed-ai" { NousQuote {} } else { ConnectionDiagram { solution } }
            }
            section { class: "uc-benefits", id: "architecture", "aria-label": "What iroh enables",
                div { class: "uc-feature-grid",
                    for (i, (title, description)) in solution.features.iter().enumerate() {
                        article { span { class: "uc-feature-number", "[{i + 1:02}]" } h3 { "{title}" } p { "{description}" } }
                    }
                }
            }

            if solution.slug == "vpn" { VpnComparison {} }

            section { class: "uc-section uc-in-practice", id: "in-practice", "aria-labelledby": "practice-heading",
                div { class: "uc-rule", span { "IN PRACTICE" } }
                CaseStudy { solution }
            }

            if solution.slug == "data-sync" {
                section { class: "uc-build-next uc-product-cta", "aria-labelledby": "blobs-heading",
                    div {
                        h2 { id: "blobs-heading", "Big files. Meet blobs." }
                        p { "Send files directly between devices, resume interrupted transfers, and verify what arrives." }
                    }
                    div { class: "uc-actions",
                        a { class: "button primary", href: "https://docs.iroh.computer/proto/iroh-blobs", "Build with iroh blobs" span { "↗" } }
                    }
                }
            } else if solution.slug == "distributed-ai" {
                section { class: "uc-build-next uc-product-cta", "aria-labelledby": "ai-deployment-heading",
                    div {
                        h2 { id: "ai-deployment-heading", "Need a hand with the network?" }
                        p { "You build the AI. We can run your relays and help tune your deployment for performance and reliability." }
                    }
                    div { class: "uc-actions",
                        ContactButton { class: "button primary", source: "solutions-distributed-ai-deployment",
                            "Talk to the team" span { "↗" }
                        }
                    }
                }
            } else if solution.slug != "vpn" {
                section { class: "uc-section", id: "build", "aria-labelledby": "resources-heading",
                    div { class: "uc-resources-heading", h2 { id: "resources-heading", "Start building." } }
                    div { class: "uc-resources",
                        for (title, description, href) in solution.resources {
                            a { href, div { h3 { "{title}" } p { "{description}" } } span { "↗" } }
                        }
                    }
                }
            }

            if solution.slug == "iot" {
                section { class: "uc-build-next uc-product-cta", "aria-labelledby": "device-testing-heading",
                    div {
                        h2 { id: "device-testing-heading", "Want help deploying to your device?" }
                        p { "Take your device from prototype to production. Work with our team on platform support, hardware testing, and deployment." }
                    }
                    div { class: "uc-actions",
                        ContactButton { class: "button primary", source: "solutions-iot-deployment",
                            "Talk about your deployment" span { "↗" }
                        }
                    }
                }
            }
        }
    }
}

#[component]
fn VpnComparison() -> Element {
    rsx! {
        section { class: "uc-section uc-vpn-comparison", "aria-labelledby": "vpn-comparison-heading",
            div { class: "uc-comparison-intro",
                div {
                    p { class: "uc-kicker", "iroh vs. Tailscale" }
                    h2 { id: "vpn-comparison-heading", "Your app." br {} "Your rules." }
                }
                p { "Build remote access around your users. iroh gives you direct connections to shape into your own product. Tailscale gives you a private network to connect devices and services." }
            }
            div { class: "uc-comparison-scroll", role: "region", tabindex: "0", "aria-label": "iroh and Tailscale comparison, scroll horizontally on small screens",
                table {
                    caption { "Comparing app connectivity with iroh and Tailscale" }
                    thead { tr { th { scope: "col", "What you need" } th { scope: "col", "iroh" } th { scope: "col", "Tailscale" } } }
                    tbody {
                        for (feature, iroh, tailscale) in [
                            ("What you’re building", "Remote access as a feature of your product", "Access to devices and services on a private network"),
                            ("Customer onboarding", "Your sign-in, your pairing flow. No iroh account required for peers", "Enroll devices or embedded apps into a tailnet; automate through APIs"),
                            ("Native mobile integration", "Rust core with first-party Swift and Kotlin bindings", "tsnet embeds Go; libtailscale adds a C bridge and Go runtime"),
                            ("Who can connect", "Your app decides which endpoint identities to trust and what they can do", "Tailnet membership and centrally managed access policies"),
                            ("What you build on", "QUIC streams and datagrams for your own application protocol", "IP networking for TCP and UDP services, including through tsnet"),
                            ("What your users install", "Your app, with iroh inside", "Tailscale’s client, or your app with an embedded Tailscale library"),
                        ] {
                            tr { th { scope: "row", "{feature}" } td { "{iroh}" } td { "{tailscale}" } }
                        }
                    }
                }
            }
            div { class: "uc-comparison-takeaway",
                p { strong { "Make connectivity part of your product." } " Keep onboarding and access rules in your app. Let iroh handle the connection." }
                div { class: "uc-actions",
                    a { class: "button", href: "https://docs.iroh.computer/quickstart", "Build with iroh" span { "↗" } }
                    ContactButton { class: "button primary", source: "solutions-vpn-comparison", "Contact us" span { "↗" } }
                }
            }
        }
    }
}

#[component]
fn ConnectionDiagram(solution: &'static UseCase) -> Element {
    rsx! {
        figure { class: "uc-diagram uc-diagram-{solution.slug}",
            div { class: "uc-diagram-top", span { "{solution.label}" } span { "CONNECTION MODEL" } }
            div { class: "uc-diagram-canvas",
                if solution.slug == "distributed-ai" {
                    div { class: "uc-mesh",
                        div { class: "uc-mesh-row", DiagramNode { name: "Cloud A", detail: "TRAINING PEER" } DiagramNode { name: "Cloud B", detail: "TRAINING PEER" } }
                        div { class: "uc-mesh-center", span { "↕" } div { strong { "gossip + blobs" } small { "COORDINATION / TRANSFER" } } span { "↕" } }
                        div { class: "uc-mesh-row", DiagramNode { name: "Self-hosted", detail: "TRAINING PEER" } DiagramNode { name: "Edge GPU", detail: "TRAINING PEER" } }
                    }
                } else if solution.slug == "video" {
                    div { class: "uc-broadcast",
                        DiagramNode { name: "Publisher", detail: "MEDIA OVER QUIC" }
                        div { class: "uc-vertical-link", span { "VIEWER SUBSCRIPTIONS" } }
                        div { class: "uc-viewers", for name in ["Viewer 01", "Viewer 02", "Viewer 03"] { DiagramNode { name, detail: "ENCRYPTED" } } }
                    }
                } else if solution.slug == "iot" {
                    div { class: "uc-device-mesh",
                        div { class: "uc-mesh-row", DiagramNode { name: "ESP32", detail: "ENDPOINT A" } DiagramNode { name: "Raspberry Pi", detail: "ENDPOINT B" } }
                        div { class: "uc-mesh-center", span { "↕" } div { strong { "local discovery" } small { "PEERS ON THE SAME LAN" } } span { "↕" } }
                        DiagramNode { name: "Your app", detail: "ENDPOINT C" }
                    }
                } else {
                    div { class: "uc-peer-path",
                        DiagramNode {
                            name: if solution.slug == "pos" { "Point of sale" } else if solution.slug == "data-sync" { "Source device" } else { "Your app" },
                            detail: if solution.slug == "pos" { "COMMANDS" } else if solution.slug == "data-sync" { "FILES + APP DATA" } else { "LOCAL ENDPOINT" },
                        }
                        div { class: "uc-peer-link", span { "ENCRYPTED" } strong { "↔" } small { "DIRECT PATH" } }
                        DiagramNode {
                            name: if solution.slug == "pos" { "Terminal" } else if solution.slug == "data-sync" { "Peer device" } else { "Remote device" },
                            detail: if solution.slug == "pos" { "STATUS + RESULTS" } else if solution.slug == "data-sync" { "FILES + APP DATA" } else { "PUBLIC-KEY ID" },
                        }
                    }
                    if solution.slug == "pos" {
                        div { class: "uc-payment-boundary", span { "PAYMENT PROCESSING" } p { "Terminal ↔ payment backend" } small { "Card handling stays in the payment system" } }
                    } else {
                        div { class: "uc-relay-path", span { "└" } div { strong { "Relay fallback" } small { "WHEN A DIRECT PATH IS UNAVAILABLE" } } span { "┘" } }
                    }
                }
            }
            figcaption { "{solution.diagram_caption}" }
        }
    }
}

#[component]
fn DiagramNode(name: String, detail: String) -> Element {
    rsx! { div { class: "uc-node", span { class: "uc-node-mark", "aria-hidden": "true", "+" } strong { "{name}" } small { "{detail}" } } }
}

#[component]
fn CaseStudy(solution: &'static UseCase) -> Element {
    rsx! {
        match solution.slug {
            "vpn" => rsx! {
                div { class: "uc-case-heading", h2 { id: "practice-heading", "Built with iroh." } }
                div { class: "uc-projects",
                    for (name, description, href, label) in [
                        ("TunTun", "Connect machines into a private mesh.", "https://github.com/orielhaim/TunTun", "MESH NETWORKING"),
                        ("Pigeons", "SSH by device identity, even behind NAT.", "https://pigeons.computer", "REMOTE SHELL"),
                        ("Rayfish", "Private connections between your devices.", "https://rayfish.xyz/", "PRIVATE NETWORKS"),
                    ] {
                        a { href, p { class: "uc-kicker", "{label}" } h3 { "{name}" } p { "{description}" } span { class: "uc-project-link", "Explore project ↗" } }
                    }
                }
                p { class: "uc-context-note", "Iroh connects apps. These projects build network overlays and remote access on top." }
            },
            "distributed-ai" => rsx! {
                div { class: "uc-case-heading",
                    h2 { id: "practice-heading", "Built with iroh." }
                }
                article { class: "uc-ai-case", "aria-labelledby": "psyche-case-heading",
                    div { class: "uc-ai-story",
                        div { class: "uc-ai-story-copy",
                            p { class: "uc-kicker", "Use case · Distributed training" }
                            h3 { id: "psyche-case-heading", "Nous Research / Psyche" }
                            p { "Psyche brings GPUs across clouds and homes together to train models. Nous Research uses iroh gossip to coordinate the peers and blobs to move training data." }
                            a { class: "text-link", href: "https://nousresearch.com", "Explore Nous Research" span { "↗" } }
                        }
                        a { class: "uc-ai-image", href: "https://nousresearch.com", "aria-label": "Explore Nous Research",
                            img { src: "/img/psyche-training.webp", alt: "Psyche’s distributed training dashboard, showing its compute pool, contributor globe, and model training runs", loading: "lazy", width: 2590, height: 2036 }
                        }
                    }
                }
                article { class: "uc-ai-case", "aria-labelledby": "buzz-case-heading",
                    div { class: "uc-ai-story",
                        div { class: "uc-ai-story-copy",
                            p { class: "uc-kicker", "Use case · Shared inference" }
                            h3 { id: "buzz-case-heading", "Block / Buzz" }
                            p { "Buzz brings people and agents into one workspace. MeshLLM is built into Buzz, letting community members opt in to share spare compute and run open models together over iroh." }
                            Link { class: "text-link", to: "/blog/buzz-agent-workspaces", "Read the Buzz story" span { "↗" } }
                        }
                        Link { class: "uc-ai-image", to: "/blog/buzz-agent-workspaces", "aria-label": "Read how Buzz connects people, agents, and shared compute",
                            img { src: "/blog/buzz-agent-workspaces/channel-agents.png", alt: "People and agents collaborating in a Buzz engineering channel", loading: "lazy", width: 2000, height: 1299 }
                        }
                    }
                    figure { class: "uc-ai-testimonial",
                        blockquote { p { "“With iroh, every node is just a public key. We pool GPUs across clouds and closets into one mesh. No central server, no NAT config.”" } }
                        figcaption {
                            img { src: "/img/user-logos/block-dark.png", alt: "Block", width: 40, height: 40 }
                            div { strong { "Michael Neale" } span { "Principal Engineer at Block" } }
                        }
                    }
                }
            },
            "video" => rsx! {
                div { class: "uc-story",
                    div { p { class: "uc-kicker", "RAVE / VIDEO AT SCALE" } h2 { id: "practice-heading", "A watch party" br {} span { "without borders." } }
                        p { "Rave streams between millions of devices, using iroh and self-hosted relays around the world." }
                        a { class: "text-link", href: "https://rave.io", "Meet Rave ↗" }
                    }
                    div { class: "uc-stats-panel", p { class: "uc-kicker", "RAVE DEPLOYMENT" }
                        div { strong { "600k" } span { "concurrent connections per relay" } }
                        div { strong { "5" } span { "global relay locations" } }
                        a { href: "/blog/secure-video-everywhere", "Read the streaming deep dive ↗" }
                    }
                }
            },
            "data-sync" => rsx! {
                div { class: "uc-story",
                    div { p { class: "uc-kicker", "Strada / remote media workflows" } h2 { id: "practice-heading", "A product built" br {} span { "around direct access." } }
                        p { "Strada gives editors direct access to remote media drives, with peer-to-peer built in from day one." }
                        a { class: "text-link", href: "https://strada.tech", "Meet Strada ↗" }
                    }
                    StradaTraffic {}
                }
            },
            "pos" => rsx! {
                div { class: "uc-story",
                    div { p { class: "uc-kicker", "PAYCODE / HIGHWAY TOLL BOOTHS" } h2 { id: "practice-heading", "New connections." br {} span { "Existing hardware." } }
                        p { "Paycode connected Android POS apps to existing Windows toll terminals, without adding local servers." }
                        a { class: "text-link", href: "/blog/paycode", "Read the Paycode case study ↗" }
                    }
                    blockquote { class: "uc-quote", span { class: "uc-quote-mark", "aria-hidden": "true", "“" } p { "“iroh was super easy to use… I started hacking and was able to integrate it into our Kotlin PoS app and have a published .NET NuGet package for our client to use in that month.”" } footer { "— Paycode" a { href: "/blog/paycode", "Read the Paycode story ↗" } } }
                }
                div { class: "uc-support-note", strong { "A clear boundary around card data." } p { "Iroh carries commands and results. Card data and payment authorization stay within the payment system." } ContactButton { source: "solutions-pos", "Talk through your architecture ↗" } }
            },
            _ => rsx! {
                div { class: "uc-case-heading", h2 { id: "practice-heading", "From the board" br {} span { "to the rest of your stack." } } p { "Start with the hardware you need. Check the compatibility matrix for platform and transport support." } }
                div { class: "uc-hardware-grid",
                    for (platform, target, description) in [("ESP32", "MICROCONTROLLER", "4 MiB flash / 2 MiB RAM"),("Raspberry Pi", "SINGLE-BOARD COMPUTER", "Connect local devices and apps"),("Linux", "x86_64 / ARM", "Run on boards, gateways, and servers"),("FreeRTOS", "EMBEDDED", "Microcontroller-class environments")] {
                        div { p { class: "uc-kicker", "{target}" } h3 { "{platform}" } p { "{description}" } }
                    }
                }
                div { class: "uc-secondary-story", div { p { class: "uc-kicker", "THE BROKER QUESTION" } h3 { "Let nearby devices talk." } }
                    div { p { "Exchange data directly between nearby devices instead of routing it through a broker." }
                        a { class: "text-link", href: "https://docs.iroh.computer/compatibility", "Check platform compatibility ↗" }
                    }
                }
            },
        }
    }
}

#[component]
fn BuildNext(heading: &'static str, description: &'static str) -> Element {
    rsx! {
        section { class: "uc-build-next",
            div { p { class: "uc-kicker", "YOUR NEXT STEP" } h2 { "{heading}" } p { "{description}" } }
            div { class: "uc-actions", a { class: "button primary", href: "https://docs.iroh.computer/quickstart", "Start building" span { "↗" } } Link { class: "button", to: "/services/enterprise", "Work with the team" span { "↗" } } }
        }
    }
}

#[component]
fn StradaQuote() -> Element {
    rsx! {
        figure { class: "uc-hero-quote uc-strada-quote",
            blockquote {
                p { "“As early adopters of Iroh (v.35), we knew we were taking a technological risk building on top of iroh, but the Iroh team made that not just possible but easy. They are responsive and they are informative. They know peer-to-peer and they are people you want to have by your side when its foundational to your business”" }
            }
            figcaption {
                div { class: "uc-strada-brand",
                    img { src: "/img/user-logos/strada.png", alt: "", width: 32, height: 32 }
                    b { "strada" }
                }
                strong { "Austin Case" }
                span { "Director of Engineering" }
            }
        }
    }
}

#[component]
fn NousQuote() -> Element {
    rsx! {
        figure { class: "uc-hero-quote",
            span { class: "uc-quote-mark", "aria-hidden": "true", "“" }
            blockquote { p { "“Doubling the network speed halves our compute budget. That’s the difference between a $1M model and a $500K model.”" } }
            figcaption { strong { "Ari Lotter" } span { "Nous Research" } }
        }
    }
}

#[component]
fn StradaTraffic() -> Element {
    rsx! {
        figure { class: "uc-savings-panel uc-strada-traffic", "aria-label": "Strada’s July 2026 traffic: 90.7 percent traveled directly between devices",
            p { class: "uc-kicker", "Strada / July 2026" }
            div { class: "uc-savings-headline", strong { "90.7%" } span { "of traffic traveled directly between devices" } }
            div { class: "uc-traffic-split", "aria-hidden": "true", span {} span {} }
            div { class: "uc-savings-facts",
                div { strong { "136.1 TB" } span { "direct, device to device" } }
                div { strong { "13.9 TB" } span { "through central servers" } }
            }
            figcaption { "150 TB of transfer traffic in July. Strada was built around direct transfers from the start; 13.9 TB needed central infrastructure." }
            details { class: "uc-egress-scenario",
                summary { "What if every byte went through a server?" }
                p { "A hypothetical cost comparison for the same July workload, using the case study’s benchmark egress rates." }
                div { class: "uc-cost-row",
                    div { span { "Hypothetical: all 150 TB through servers" } strong { "$11,571.20 / mo" } }
                    div { class: "uc-cost-track", span { style: "width: 100%" } }
                }
                div { class: "uc-cost-row uc-cost-after",
                    div { span { "Estimate for the 13.9 TB actually relayed" } strong { "$1,261.06 / mo" } }
                    div { class: "uc-cost-track", span { style: "width: 10.9%" } }
                }
                p { "About $10,310 less in modeled monthly egress costs. These are estimates for two architectures, not Strada’s bills before and after adopting iroh." }
            }
        }
    }
}
