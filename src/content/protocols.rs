//! Editable protocols used by the Dioxus site.
use super::Protocol;

pub(super) fn load() -> Vec<Protocol> {
    vec![
        // Import metadata: {"featured": 1, "icon": "iconOpen", "version": "v0.35.0"}
        Protocol {
            title: "Blobs".into(),
            tagline: "Resumable, verifiable data transfer".into(),
            slug: "iroh-blobs".into(),
            repository: "https://github.com/n0-computer/iroh-blobs".into(),
            href: "https://docs.iroh.computer/protocols/blobs/".into(),
            documentation: "https://docs.rs/iroh-blobs/latest/iroh_blobs/".into(),
        },
        // Import metadata: {"featured": 2, "icon": "iconPlatforms", "version": "v0.35.0"}
        Protocol {
            title: "Gossip".into(),
            tagline: "Broadcast messages to groups of endpoints by topic.".into(),
            slug: "iroh-gossip".into(),
            repository: "https://github.com/n0-computer/iroh-gossip".into(),
            href: "https://docs.iroh.computer/connecting/gossip/".into(),
            documentation: "https://docs.rs/iroh-gossip/latest/iroh_gossip/".into(),
        },
        // Import metadata: {"featured": 3, "icon": "iconFaster", "version": "v0.35.0"}
        Protocol {
            title: "Documents".into(),
            tagline: "Realtime, multiwriter, key-value sync".into(),
            slug: "iroh-docs".into(),
            repository: "https://github.com/n0-computer/iroh-docs".into(),
            href: "https://docs.iroh.computer/protocols/kv-crdts/".into(),
            documentation: "https://docs.rs/iroh-docs/latest/iroh_docs/".into(),
        },
        // Import metadata: {"icon": "", "version": "v0.1.0"}
        Protocol {
            title: "iroh-roq".into(),
            tagline: "RTP over QUIC implemented as iroh protocol".into(),
            slug: "iroh-roq".into(),
            repository: "https://github.com/n0-computer/iroh-roq".into(),
            href: "https://docs.iroh.computer/protocols/roq/".into(),
            documentation: "https://docs.rs/iroh-roq/latest/iroh_roq/".into(),
        },
        // Import metadata: {"icon": "", "version": "v0.1.5"}
        Protocol {
            title: "Godot iroh".into(),
            tagline: "A peer-to-peer multiplayer extension for Godot based on Iroh.".into(),
            slug: "godot-iroh".into(),
            repository: "https://github.com/tipragot/godot-iroh".into(),
            href: "https://github.com/tipragot/godot-iroh".into(),
            documentation: "https://godotengine.org/asset-library/asset/3948".into(),
        },
        // Import metadata: {"icon": "", "readmePath": "content-discovery/README.md", "version": "v0.1.0"}
        Protocol {
            title: " Iroh Content Discovery".into(),
            tagline: "A protocol to communicate with a content tracker for iroh-blobs.".into(),
            slug: "iroh-content-discovery".into(),
            repository: "https://github.com/n0-computer/iroh-experiments/".into(),
            href: "https://github.com/n0-computer/iroh-experiments/".into(),
            documentation: "https://docs.rs/iroh-content-discovery/latest/iroh_content_discovery/"
                .into(),
        },
        // Import metadata: {"icon": "", "version": "v0.2.0"}
        Protocol {
            title: "Iroh ping".into(),
            tagline: "A minimal protocol to ping iroh endpoints.".into(),
            slug: "iroh-ping".into(),
            repository: "https://github.com/n0-computer/iroh-ping".into(),
            href: "https://docs.iroh.computer/quickstart/".into(),
            documentation: "https://docs.rs/iroh-ping/latest/iroh_ping/".into(),
        },
    ]
}
