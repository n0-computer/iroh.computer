//! Content for `/docs/examples/todos`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsExamplesTodos() -> Element {
    rsx! {
        h1 { id: "todos-example", "TODOs example" }
        p {
            a { href: "https://github.com/n0-computer/iroh-tauri-todomvc",
                "https://github.com/n0-computer/iroh-tauri-todomvc"
            }
        }
        h2 { id: "tauri", "Tauri" }
    }
}
