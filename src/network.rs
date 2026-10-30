use dioxus::prelude::*;

const LOCAL_LEFT: &str = "M120 125 C120 175 160 195 220 195";
const LOCAL_RIGHT: &str = "M425 240 C480 240 520 260 520 310";
const DIRECT: &str = "M220 195 C290 85 380 110 425 240";
const LAPTOP_DIRECT: &str = "M120 125 C220 25 365 30 425 240";
const RELAY: &str = "M220 195 C200 260 215 335 275 335 C350 335 405 320 425 240";
const CELLULAR_RELAY: &str = "M150 280 C175 310 215 335 275 335 C350 335 405 320 425 240";

// The timer belongs to the component's future, so navigation drops it. Respect
// reduced motion and hidden tabs, and let either illustration be paused.
fn use_route_cycle(durations_ms: &'static [u32]) -> (Signal<usize>, Signal<bool>) {
    let mut active = use_signal(|| 0usize);
    let mut playing = use_signal(|| false);
    use_future(move || async move {
        let mut preference = document::eval("dioxus.send(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)");
        playing.set(preference.recv::<bool>().await.unwrap_or(false));
        loop {
            let delay = durations_ms[active()];
            let mut tick = document::eval(&format!("await new Promise(resolve => setTimeout(resolve, {delay})); dioxus.send(document.visibilityState === 'visible' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)"));
            let Ok(can_advance) = tick.recv::<bool>().await else { break; };
            if !can_advance { continue; }
            if playing() { active.set((active() + 1) % durations_ms.len()); }
        }
    });
    (active, playing)
}

#[component]
pub fn Network() -> Element {
    let (active, mut playing) = use_route_cycle(&[4500, 4500, 500]);
    let mode = if active() == 1 { "cellular" } else { "wifi" };
    let path = if active() == 0 { "direct" } else { "relay" };
    let relay_route = if active() == 1 { CELLULAR_RELAY } else { RELAY };
    let path_label = if active() == 0 { "Direct · encrypted" } else { "Via relay · encrypted" };

    rsx! {
        document::Stylesheet { href: asset!("/assets/network.css") }
        figure {
            class: "peer-explorer",
            "data-path": path,
            "data-network": mode,
            "data-playing": playing(),
            "aria-label": "A connection that adapts as networks change",

            div { class: "peer-scene", role: "img", "aria-label": match active() {
                0 => "The laptop and phone each connect directly to the remote tablet. BLE links the nearby devices, and LAN links the tablets.",
                1 => "The laptop stays directly connected to the remote tablet. The phone moves from Wi-Fi to cellular and connects to both the laptop and tablet through a relay.",
                _ => "The laptop stays directly connected to the tablet. The phone returns to Wi-Fi, using the encrypted relay to reach both peers until its direct connections are restored.",
            },
                div { class: "peer-neighborhood peer-neighborhood-home",
                    span { "Same room" }
                }
                div { class: "peer-neighborhood peer-neighborhood-cellular",
                    span { "Cellular" }
                }
                div { class: "peer-neighborhood peer-neighborhood-away",
                }
                div { class: "peer-distance-note", span { "Across the hall." } span { "Across time zones." } }

                svg { class: "peer-routes", view_box: "0 0 600 400", fill: "none", "aria-hidden": "true",
                    path { class: "peer-route peer-route-local peer-route-ble peer-wifi-only", d: LOCAL_LEFT }
                    path { class: "peer-route peer-route-local", d: LOCAL_RIGHT }
                    path { class: "peer-route peer-route-laptop", d: LAPTOP_DIRECT }
                    path { class: "peer-route peer-route-direct", d: DIRECT }
                    path { class: "peer-route peer-route-relay", d: relay_route }
                    Packet { route: LOCAL_LEFT, class: "peer-packet peer-packet-local peer-packet-ble peer-wifi-only", delay: "0s" }
                    Packet { route: LOCAL_RIGHT, class: "peer-packet peer-packet-local", delay: "-1.2s" }
                    Packet { route: LAPTOP_DIRECT, class: "peer-packet peer-packet-laptop", delay: "-1.5s" }
                    Packet { route: DIRECT, class: "peer-packet peer-packet-direct", delay: "-.8s" }
                    Packet { route: DIRECT, class: "peer-packet peer-packet-direct", delay: "-2.8s" }
                    Packet { route: relay_route, class: "peer-packet peer-packet-relay", delay: "-.8s" }
                    Packet { route: relay_route, class: "peer-packet peer-packet-relay", delay: "-2.8s" }
                }

                div { class: "peer-local-label peer-local-label-ble peer-wifi-only", "BLE" }
                div { class: "peer-local-label peer-local-label-lan", "LAN" }
                div { class: "peer-laptop-path-label", "Direct" }
                Peer { class: "peer-device peer-laptop", letter: "A", name: "Laptop" }
                Peer { class: "peer-device peer-phone", letter: "B", name: "Phone" }
                Peer { class: "peer-device peer-remote-tablet", letter: "C", name: "Tablet" }
                Peer { class: "peer-device peer-tablet", letter: "D", name: "Tablet" }
                div { class: "peer-relay", span { "R" } small { "Relay" } }
            }

            div { class: "peer-explorer-controls",
                div { class: "peer-path-label", "{path_label}" }
                button { r#type: "button", "aria-label": "Pause automatic network switching", "aria-pressed": !playing(), onclick: move |_| playing.toggle(),
                    svg { view_box: "0 0 12 12", fill: "currentColor", "aria-hidden": "true",
                        if playing() {
                            path { d: "M2 1h3v10H2zM7 1h3v10H7z" }
                        } else {
                            path { d: "M3 1l8 5-8 5z" }
                        }
                    }
                    if playing() { "Pause" } else { "Play" }
                }
            }
        }
    }
}

const TRANSPORTS: [(&str, &str, &str, &str); 5] = [
    ("ble", "BLE", "M80 190 C155 190 135 60 270 60 S430 240 520 190", "Bluetooth nearby"),
    ("lan", "LAN", "M80 190 C170 290 175 120 300 120 S440 75 520 190", "Across the local network"),
    ("lora", "LoRa", "M80 190 C195 110 210 190 300 190 S435 270 520 190", "Direct over LoRa"),
    ("cellular", "Cellular", "M80 190 C165 80 175 260 300 260 S445 320 520 190", "Direct over cellular"),
    ("relay", "Relay", "M80 190 C160 190 140 325 300 325 S440 190 520 190", "An encrypted relay fallback"),
];

#[component]
pub fn AdaptivePaths() -> Element {
    let (active, mut playing) = use_route_cycle(&[4500; 5]);
    let (name, label, _, description) = TRANSPORTS[active()];
    rsx! {
        figure { class: "adaptive-paths", "data-active": name, "data-playing": playing(),
            "aria-label": "Five possible paths between the same two devices",
            div { class: "adaptive-heading", span { "A few ways to stay in touch" } }
            div { class: "adaptive-scene", role: "img", "aria-label": "BLE, LAN, LoRa, cellular, and relay connect two devices. The highlighted path is {label}.",
                svg { view_box: "0 0 600 380", fill: "none", "aria-hidden": "true",
                    for (i, (transport, _, route, _)) in TRANSPORTS.iter().enumerate() {
                        g { class: "adaptive-route transport-{transport}", "data-selected": active() == i,
                            path { class: "adaptive-wire", d: *route }
                            Packet { route: *route, class: "peer-packet adaptive-packet", delay: "0s" }
                            Packet { route: *route, class: "peer-packet adaptive-packet", delay: "-2s" }
                        }
                    }
                    g { class: "adaptive-device",
                        rect { x: "40", y: "154", width: "40", height: "72", rx: "7" }
                        path { d: "M53 164 H67 M55 216 H65" }
                        rect { x: "520", y: "163", width: "58", height: "42", rx: "4" }
                        path { d: "M515 214 H583 L578 205 H520 Z" }
                    }
                }
                div { class: "adaptive-device-label adaptive-device-label-left", "You" }
                div { class: "adaptive-device-label adaptive-device-label-right", "Your peer" }
                for (i, (transport, title, _, _)) in TRANSPORTS.iter().enumerate() {
                    span { class: "adaptive-route-label transport-{transport}", "data-selected": active() == i, "{title}" }
                }
            }
            figcaption {
                div { strong { "{description}" } span { "A new path. The same connection." } }
                button { r#type: "button", class: "adaptive-play", "aria-label": "Pause automatic path switching", "aria-pressed": !playing(), onclick: move |_| playing.toggle(), if playing() { "Pause" } else { "Play" } }
            }
        }
    }
}

#[component]
fn Peer(class: &'static str, letter: &'static str, name: &'static str) -> Element {
    rsx! { div { class, span { "{letter}" } strong { "{name}" } } }
}

#[component]
fn Packet(route: &'static str, class: &'static str, delay: &'static str) -> Element {
    rsx! { circle { class, r: "3", style: "offset-path: path('{route}'); animation-delay: {delay};" } }
}
