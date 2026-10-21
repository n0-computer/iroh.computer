//! Content for `/legal`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn Legal() -> Element {
    rsx! {
        div {
            div {
                section {
                    div {
                        h1 { id: "legal", "Legal" }
                        p { "Privacy policy and terms of service for Iroh and Iroh Services." }
                    }
                }
                section {
                    div {
                        h2 { id: "privacy-policy", "Privacy Policy" }
                        div {
                            div {
                                h3 { id: "data-collection", "Data Collection" }
                                p {
                                    "Iroh Services collects aggregated metrics about network performance. This includes connection counts, latency measurements, throughput statistics, and error rates."
                                }
                            }
                            div {
                                h3 { id: "how-we-use-data", "How We Use Data" }
                                p {
                                    "Collected metrics are used solely to provide and improve the observability features of networks. Data is never sold to third parties and is not used for advertising purposes."
                                }
                            }
                            div {
                                h3 { id: "data-retention", "Data Retention" }
                                p {
                                    "Aggregated metrics are retained for the duration of your subscription."
                                }
                            }
                            div {
                                h3 { id: "third-party-services", "Third-Party Services" }
                                p {
                                    "We use Plausible Analytics for website analytics. Plausible does not use cookies and does not collect personal data. We do not use any other third-party analytics or tracking services."
                                }
                            }
                            div {
                                h3 { id: "contact", "Contact" }
                                p {
                                    "For privacy-related questions, contact us at "
                                    a { href: "mailto:hello@n0.computer", "hello@n0.computer" }
                                    "."
                                }
                            }
                        }
                    }
                }
                section { id: "iroh-doctor",
                    div {
                        h2 { id: "iroh-doctor-app-privacy-policy", "iroh doctor (App) Privacy Policy" }
                        p { "Last updated: 2026-06-10" }
                        div {
                            p {
                                "iroh doctor is a peer-to-peer network-diagnostics tool published by number 0, Inc. (“number 0”, “we”, “us”). It helps you measure the quality of a direct connection to another peer and inspect your local network environment. It does not require an account, and we do not collect personal information for advertising or analytics. By default the app sends anonymous connection diagnostics to help improve iroh; you can turn this off at any time (see Connection Diagnostics below)."
                            }
                            div {
                                h3 { id: "information-stored-on-your-device",
                                    "Information Stored on Your Device"
                                }
                                p {
                                    "On first launch the app generates a cryptographic key pair and stores the secret key in its private storage on your device to identify your node to peers; it never leaves the device. Saved peer identifiers, diagnostic logs (kept on your device and, on iOS, in the system log), and any exported diagnostics bundle are also kept in the app’s storage on your device and are shared only if you choose to share them. Uninstalling the app removes this data."
                                }
                            }
                            div {
                                h3 { id: "information-shared-over-the-network",
                                    "Information Shared Over the Network"
                                }
                                p {
                                    "To connect you to a peer, the app uses the same public iroh infrastructure (relay and discovery servers) operated by number 0 that any iroh application uses. As an inherent part of establishing a connection, your public node identifier and network addresses (including IP addresses) may be visible to that infrastructure and to the peer you connect to. When connected, you and that peer exchange connection measurements (such as round-trip latency and throughput) and any messages you send over the gossip feature. Only connect to peers you trust. We do not use this connection information to build advertising or marketing profiles."
                                }
                            }
                            div {
                                h3 { id: "connection-diagnostics-on-by-default-can-be-turned-off",
                                    "Connection Diagnostics (On by Default, Can Be Turned Off)"
                                }
                                p {
                                    "iroh doctor sends anonymous connection diagnostics to iroh-services, a service operated by number 0, to help us analyze connectivity and improve iroh. This is on by default. The data sent is: a short device name the app generates from your public node id (a platform tag plus the first eight hexadecimal characters of the id, for example "
                                    code { "dx-1a2b3c4d" }
                                    "), and aggregate connection performance metrics from the iroh networking layer — socket and transport counters, net-report connectivity results, and port-mapping (UPnP, PCP, NAT-PMP) counters, sent about once a minute. These are numeric counters and gauges. We do not send the contents of your connections, message or file data, your contacts, or your location, and the metrics are not linked to your identity or used for tracking. We do not use these diagnostics for advertising and do not share them with advertising partners. You can turn this off at any time from the Diagnostics tab. See the "
                                    a { href: "https://services.iroh.computer/legal/privacy",
                                        "iroh-services privacy terms"
                                    }
                                    ". Advanced users can point this at their own iroh-services account by supplying an API key in the same place; the key is stored only on your device."
                                }
                            }
                            div {
                                h3 { id: "third-party-services-children",
                                    "Third-Party Services & Children"
                                }
                                p {
                                    "The app talks only to number 0 infrastructure (relay, discovery, and iroh-services, which receives the connection diagnostics unless you turn them off) and to the peers you connect with. It does not include third-party advertising or analytics SDKs. iroh doctor is a developer and network tool and is not directed to children under 13; we do not knowingly collect personal information from children."
                                }
                            }
                            div {
                                h3 { id: "data-retention-deletion", "Data Retention & Deletion" }
                                p {
                                    "Data stored on your device remains until you delete it or uninstall the app. We do not maintain user accounts, so there is no server-side profile to delete. Diagnostics sent to iroh-services are retained as described in the iroh-services privacy policy: for as long as needed to provide and improve the Services and for the other purposes set out in that policy."
                                }
                            }
                            div {
                                h3 { id: "changes-contact", "Changes & Contact" }
                                p {
                                    "We may update this policy; material changes will be posted at this URL with an updated date. Questions about this policy can be sent to "
                                    a { href: "mailto:support@iroh.computer", "support@iroh.computer" }
                                    "."
                                }
                            }
                        }
                    }
                }
                section {
                    div {
                        h2 { id: "terms-of-service", "Terms of Service" }
                        div {
                            div {
                                h3 { id: "acceptance", "Acceptance" }
                                p {
                                    "By using Iroh Services, you agree to these terms. If you do not agree, do not use the service."
                                }
                            }
                            div {
                                h3 { id: "use-of-service", "Use of Service" }
                                p {
                                    "Iroh Services is provided for lawful use only. You may not use the service to transmit illegal content, conduct denial-of-service attacks, or otherwise harm other users or the network."
                                }
                            }
                            div {
                                h3 { id: "service-availability", "Service Availability" }
                                p {
                                    "We aim for high availability but do not guarantee uninterrupted service. Planned maintenance will be communicated in advance where possible."
                                }
                            }
                            div {
                                h3 { id: "limitation-of-liability", "Limitation of Liability" }
                                p {
                                    "Iroh Services is provided “as is.” Number Zero is not liable for any damages arising from use of the service, including loss of data or business interruption."
                                }
                            }
                            div {
                                h3 { id: "changes-to-terms", "Changes to Terms" }
                                p {
                                    "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms."
                                }
                            }
                            div {
                                h3 { id: "contact", "Contact" }
                                p {
                                    "Questions about these terms? Reach us at "
                                    a { href: "mailto:hello@n0.computer", "hello@n0.computer" }
                                    "."
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
