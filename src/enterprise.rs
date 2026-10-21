//! Enterprise page: copy, sections, and support details are authored here.
use crate::contact::ContactButton;
use crate::{Icon, Route};
use dioxus::prelude::*;
#[component]
pub fn Enterprise() -> Element {
    rsx! {
        document::Title { "Enterprise — iroh" }
        document::Meta {
            name: "description",
            content: "Take peer-to-peer to production with custom metrics, network diagnostics, and direct access to the team building iroh.",
        }
        document::Stylesheet { href: asset!("/assets/enterprise.css") }
        main { id: "content", class: "enterprise-page",
            section { class: "enterprise-hero wrap",
                div { class: "enterprise-hero-copy",
                    p { class: "enterprise-label", "iroh for your next big thing" }
                    h1 {
                        "Built with iroh."
                        br {}
                        em { "Backed by its makers." }
                    }
                    p { class: "enterprise-lede",
                        "Take peer-to-peer to production with the people who build it. Get a clear view of your network, help when you need it, and an experienced team in your corner."
                    }
                    div { class: "enterprise-actions",
                        ContactButton { class: "button primary", source: "enterprise-hero",
                            "Tell us what you’re building"
                            Icon { name: "arrow" }
                        }
                        a { class: "text-link", href: "#enterprise-support",
                            "Explore support"
                            span { "↓" }
                        }
                    }
                    p { class: "enterprise-footnote",
                        "Open-source foundations. A direct line to the core team."
                    }
                }
                TeamConnection {}
            }
            section {
                class: "enterprise-proof wrap",
                "aria-label": "Teams building with iroh",
                p { "in prod" }
                div {
                    a { href: "https://strada.tech", class: "enterprise-strada",
                        img {
                            src: "/img/user-logos/strada.png",
                            alt: "",
                        }
                        span { "strada" }
                    }
                    a { href: "https://rave.io",
                        img { src: "/img/user-logos/rave.png", alt: "Rave" }
                    }
                    a { href: "https://paycode.com.mx",
                        img {
                            src: "/img/user-logos/paycode.svg",
                            alt: "Paycode",
                        }
                    }
                    a { href: "https://datum.net",
                        img { src: "/img/user-logos/datum.svg", alt: "Datum" }
                    }
                }
            }
            section { class: "enterprise-testimonial wrap", "aria-label": "From the team at Strada",
                figure {
                    blockquote {
                        p { "“As early adopters of Iroh (v.35), we knew we were taking a technological risk building on top of iroh, but the Iroh team made that not just possible but easy. They are responsive and they are informative. They know peer-to-peer and they are people you want to have by your side when its foundational to your business”" }
                    }
                    figcaption {
                        div { class: "enterprise-strada",
                            img { src: "/img/user-logos/strada.png", alt: "", width: 40, height: 40 }
                            span { "strada" }
                        }
                        strong { "Austin Case" }
                        span { "Director of Engineering" }
                    }
                }
            }
            section { class: "enterprise-section wrap", id: "enterprise-support",
                div { class: "enterprise-section-heading",
                    div {
                        p { class: "enterprise-label", "A little more peace of mind" }
                        h2 {
                            "Less guesswork."
                            br {}
                            "More forward motion."
                        }
                    }
                    p {
                        "When a connection misbehaves, you need a useful starting point. We help you understand what’s happening and work through it with the people who know iroh best."
                    }
                }
                div { class: "enterprise-benefits",
                    article {
                        span {
                            class: "enterprise-feature-mark",
                            "aria-hidden": "true",
                            "◉"
                        }
                        h3 { "See how things are going." }
                        p {
                            "Custom health metrics bring connection quality, latency, and throughput into view. Monitor the performance and experience that matter to your app."
                        }
                        Link { to: "/services/observability", class: "text-link",
                            "Explore observability"
                            span { "↗" }
                        }
                    }
                    article {
                        span {
                            class: "enterprise-feature-mark",
                            "aria-hidden": "true",
                            "↗"
                        }
                        h3 { "Find a way through." }
                        p {
                            "Network diagnostics help you distinguish an iroh issue from an integration problem or a tricky network, so you can focus your investigation."
                        }
                        a {
                            href: "https://docs.iroh.computer/iroh-services/net-diagnostics/quickstart",
                            class: "text-link",
                            "See network diagnostics"
                            span { "↗" }
                        }
                    }
                    article {
                        span {
                            class: "enterprise-feature-mark",
                            "aria-hidden": "true",
                            "✳"
                        }
                        h3 { "Talk to the people building it." }
                        p {
                            "Your private Slack or Discord channel connects you with the Number0 core team. Bring your questions, architectural decisions, bugs, and ideas."
                        }
                        a {
                            href: "https://n0.computer/people/",
                            class: "text-link",
                            "Meet the team"
                            span { "↗" }
                        }
                    }
                }
            }
            section { class: "enterprise-team-band",
                div { class: "wrap enterprise-team-layout",
                    div {
                        p { class: "enterprise-label", "Your team, a little bigger" }
                        h2 {
                            "An iroh expert."
                            br {}
                            em { "In your corner." }
                        }
                        p {
                            "Building iroh into the heart of your product? A dedicated engineer works directly with your team and your codebase, from architecture to the details of your next release."
                        }
                        ContactButton { class: "button primary", source: "enterprise-engineer",
                            "Talk about a dedicated engineer"
                            Icon { name: "arrow" }
                        }
                    }
                    div { class: "enterprise-collaboration",
                        p { class: "enterprise-label", "Room to build together" }
                        ul {
                            li {
                                span { "↗" }
                                div {
                                    h3 { "Code reviews & collaboration" }
                                    p {
                                        "Work through your integration with someone who knows the internals."
                                    }
                                }
                            }
                            li {
                                span { "↗" }
                                div {
                                    h3 { "Custom feature development" }
                                    p {
                                        "Bring the capabilities your product needs into the conversation."
                                    }
                                }
                            }
                            li {
                                span { "↗" }
                                div {
                                    h3 { "Architecture & upgrade guidance" }
                                    p {
                                        "Make informed decisions, with the core team’s experience to draw on."
                                    }
                                }
                            }
                            li {
                                span { "↗" }
                                div {
                                    h3 { "Our highest level of support" }
                                    p {
                                        "Source-level collaboration and dedicated-engineer SLA guarantees."
                                    }
                                }
                            }
                        }
                    }
                }
            }
            section { class: "enterprise-section wrap enterprise-platforms",
                div {
                    p { class: "enterprise-label", "At home on your hardware" }
                    h2 {
                        "Bring your devices."
                        br {}
                        "We’ll bring the test bench."
                    }
                    p {
                        "Every commit to iroh runs through a growing set of simulations and tests. Deploy across desktop, mobile, servers, and embedded hardware."
                    }
                    p {
                        "Running on an unusual device? Send it to us. We can add it to our test lab and work with you on support for your platform."
                    }
                    ContactButton { class: "button primary", source: "enterprise-testing",
                        "Get help with testing"
                        Icon { name: "arrow" }
                    }
                }
                div { class: "enterprise-platform-grid",
                    for (label, file) in [
                        ("Linux", "Linux"),
                        ("Windows", "Windows"),
                        ("macOS & iOS", "Apple"),
                        ("Android", "Android"),
                        ("Raspberry Pi", "RaspberryPi"),
                        ("Espressif", "Espressif"),
                    ]
                    {
                        div {
                            img {
                                src: "/img/platform-logos/{file}.svg",
                                alt: "",
                                width: 40,
                                height: 40,
                            }
                            span { "{label}" }
                        }
                    }
                    ContactButton { source: "enterprise-platform",
                        "Something different? Let’s talk."
                        span { "↗" }
                    }
                }
            }
            section {
                class: "enterprise-section enterprise-response wrap",
                id: "response-times",
                div { class: "enterprise-section-heading",
                    div {
                        p { class: "enterprise-label", "Know what to expect" }
                        h2 {
                            "Support with"
                            br {}
                            "a response time."
                        }
                    }
                    p {
                        "Enterprise response times are measured from first contact, through your dedicated channel. Pro support is provided on a best-effort basis."
                    }
                }
                div { class: "enterprise-response-details",
                    div {
                        class: "enterprise-table-scroll",
                        tabindex: "0",
                        role: "region",
                        "aria-label": "Support response times",
                        table { class: "enterprise-table",
                            caption { "Support response times by severity" }
                            thead {
                                tr {
                                    th { scope: "col", "When something goes wrong" }
                                    th { scope: "col", "Pro" }
                                    th { scope: "col", "Enterprise" }
                                }
                            }
                            tbody {
                                for (severity, description, response) in [
                                    ("Critical", "System down, no workaround", "4 hours"),
                                    ("Standard", "Degraded, operations impacted", "1 business day"),
                                    ("Minor", "Limited impact, workaround exists", "2 business days"),
                                ]
                                {
                                    tr {
                                        th { scope: "row",
                                            "{severity}"
                                            span { "{description}" }
                                        }
                                        td { "Best effort" }
                                        td {
                                            strong { "{response}" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ContactButton { class: "text-link", source: "enterprise-sla",
                        "Talk through the SLA details"
                        span { "↗" }
                    }
                }
            }
            SupportPlans {}
            section { class: "enterprise-section wrap enterprise-stories",
                div { class: "enterprise-section-heading",
                    div {
                        p { class: "enterprise-label", "Already out in the world" }
                        h2 {
                            "Good company."
                            br {}
                            "Real applications."
                        }
                    }
                    Link { class: "text-link", to: Route::Solutions {},
                        "More ways to build"
                        span { "↗" }
                    }
                }
                div { class: "enterprise-story-grid",
                    for (name, logo, title, description, route) in [
                        (
                            "Rave",
                            "rave.png",
                            "A shared screen, across the world.",
                            "Peer-to-peer video streaming between devices.",
                            "/solutions/video",
                        ),
                        (
                            "Strada",
                            "strada.png",
                            "Remote media. Direct access.",
                            "Direct file transfers connecting editors to remote media drives.",
                            "/solutions/data-sync",
                        ),
                        (
                            "Paycode",
                            "paycode.svg",
                            "Payments that keep moving.",
                            "Direct connections between payment terminals and point-of-sale systems.",
                            "/solutions/pos",
                        ),
                    ]
                    {
                        Link { to: route, class: "enterprise-story",
                            if name == "Strada" {
                                div { class: "enterprise-strada",
                                    img { src: "/img/user-logos/{logo}", alt: "" }
                                    span { "strada" }
                                }
                            } else {
                                img { src: "/img/user-logos/{logo}", alt: name }
                            }
                            h3 { "{title}" }
                            p { "{description}" }
                            span { class: "text-link",
                                "Explore the use case"
                                span { "↗" }
                            }
                        }
                    }
                }
            }
            section { class: "enterprise-closing wrap",
                div {
                    p { class: "enterprise-label", "A good place to start" }
                    h2 {
                        "What are you"
                        br {}
                        em { "working on?" }
                    }
                    p { "Tell us where you want to go. Let’s figure out how to get there together." }
                    ContactButton { class: "button primary", source: "enterprise-footer",
                        "Chat with the iroh team"
                        Icon { name: "arrow" }
                    }
                }
                span { class: "enterprise-closing-star", "aria-hidden": "true", "✳" }
            }
        }
    }
}
#[component]
fn TeamConnection() -> Element {
    rsx! {
        figure {
            class: "enterprise-team-art",
            "aria-label": "Your team and the iroh core team working together on your application",
            svg {
                view_box: "0 0 520 430",
                fill: "none",
                "aria-hidden": "true",
                path {
                    d: "M130 115 C130 25 425 20 425 155 C425 240 160 210 160 315 C160 440 425 440 425 315",
                    class: "team-orbit",
                }
                path {
                    d: "M130 115 C30 195 95 340 260 325 C405 310 515 235 425 155",
                    class: "team-orbit team-orbit-secondary",
                }
                path {
                    d: "M130 115 Q270 160 260 325 M425 155 Q340 160 260 325",
                    class: "team-connection-line",
                }
                circle {
                    cx: "130",
                    cy: "115",
                    r: "7",
                    fill: "#bca4ed",
                }
                circle {
                    cx: "425",
                    cy: "155",
                    r: "7",
                    fill: "#85c7ac",
                }
                circle {
                    cx: "260",
                    cy: "325",
                    r: "7",
                    fill: "#bca4ed",
                }
            }
            div { class: "team-art-card team-art-yours",
                span { class: "team-art-symbol", "↗" }
                strong { "Your team" }
                small { "The big idea" }
            }
            div { class: "team-art-card team-art-iroh",
                span { class: "team-art-symbol", "✳" }
                strong { "Our team" }
                small { "A little backup" }
            }
            div { class: "team-art-card team-art-app",
                span { class: "team-art-symbol", "{{ }}" }
                strong { "Your application" }
                small { "Built together" }
            }
            figcaption { "A direct connection to the people behind iroh." }
        }
    }
}
#[component]
fn SupportPlans() -> Element {
    rsx! {
        section { class: "enterprise-section enterprise-plans-band",
            div { class: "wrap",
                div { class: "enterprise-section-heading",
                    div {
                        p { class: "enterprise-label", "Find your fit" }
                        h2 {
                            "The right amount"
                            br {}
                            "of together."
                        }
                    }
                    p {
                        "Start with managed services, add a direct line to the core team, or bring an iroh engineer into your project."
                    }
                }
                div { class: "enterprise-plan-grid",
                    article {
                        p { class: "enterprise-label", "For teams getting started" }
                        h3 { "Pro" }
                        p { "Managed infrastructure and support as you build." }
                        ul {
                            li { "Support tickets" }
                            li { "Best-effort response times" }
                            li { "Pay-as-you-go managed relays" }
                        }
                        Link { class: "text-link", to: Route::Pricing {},
                            "Explore Pro"
                            span { "↗" }
                        }
                    }
                    article { class: "enterprise-plan-featured",
                        p { class: "enterprise-label", "For teams in production" }
                        h3 { "Enterprise" }
                        p { "Visibility, guidance, and the core team on hand." }
                        ul {
                            li { "Everything in Pro, with custom relay options" }
                            li { "Private channel & response-time SLAs" }
                            li { "Custom metrics & network diagnostics" }
                            li { "Architecture, training & device testing" }
                        }
                        ContactButton { class: "button primary", source: "enterprise-plan",
                            "Let’s talk"
                            Icon { name: "arrow" }
                        }
                    }
                    article {
                        p { class: "enterprise-label", "For building side by side" }
                        h3 { "Dedicated engineer" }
                        p { "An iroh expert working directly with your team." }
                        ul {
                            li { "Everything in Enterprise" }
                            li { "Code reviews & source-level collaboration" }
                            li { "Custom feature development" }
                            li { "Our highest-tier SLA guarantees" }
                        }
                        ContactButton { class: "text-link", source: "enterprise-dedicated",
                            "Build with us"
                            span { "↗" }
                        }
                    }
                }
                details { class: "enterprise-comparison",
                    summary {
                        "Compare all support features"
                        span { "⌄" }
                    }
                    div {
                        class: "enterprise-table-scroll",
                        tabindex: "0",
                        role: "region",
                        "aria-label": "Complete support plan comparison",
                        table { class: "enterprise-table",
                            caption { "What’s included in each support plan" }
                            thead {
                                tr {
                                    th { scope: "col", "Service" }
                                    th { scope: "col", "Pro" }
                                    th { scope: "col", "Enterprise" }
                                    th { scope: "col", "Dedicated engineer" }
                                }
                            }
                            tbody {
                                for (feature, pro, enterprise, dedicated) in [
                                    ("Support tickets", "Included", "Included", "Included"),
                                    ("SLAs", "Best effort", "Included", "Included"),
                                    ("Managed relays", "Pay as you go", "Custom", "Custom"),
                                    ("Dedicated private channel", "—", "Included", "Included"),
                                    ("Custom metrics & monitoring", "—", "Included", "Included"),
                                    ("Network diagnostics", "—", "Included", "Included"),
                                    ("Issue & feature prioritization", "—", "Included", "Included"),
                                    ("Early access to new features", "—", "Included", "Included"),
                                    ("Training sessions", "—", "Included", "Included"),
                                    ("Architectural guidance", "—", "Included", "Included"),
                                    ("Self-hosted relay guidance", "—", "Included", "Included"),
                                    ("Device testing", "—", "Included", "Included"),
                                    ("Code reviews", "—", "—", "Included"),
                                    ("Custom feature development", "—", "—", "Included"),
                                    ("Source code access & collaboration", "—", "—", "Included"),
                                ]
                                {
                                    tr {
                                        th { scope: "row", "{feature}" }
                                        td { "{pro}" }
                                        td { "{enterprise}" }
                                        td { "{dedicated}" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
