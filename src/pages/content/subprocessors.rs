//! Download page for the current subprocessor list.
use dioxus::prelude::*;

#[component]
pub(super) fn Subprocessors() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/subprocessors.css") }
        main { id: "content", class: "wrap subprocessor-page",
            nav { class: "content-breadcrumb mono", "aria-label": "Breadcrumb",
                Link { to: "/legal", "Legal" }
                span { "aria-hidden": "true", "/" }
                span { "Subprocessors" }
            }
            article {
                h1 { "Subprocessor List" }
                p { class: "subprocessor-intro",
                    "The subprocessors we engage to help provide Iroh Services are listed in the PDF below, along with their processing activities. We update this list as our subprocessors change."
                }
                a {
                    class: "subprocessor-download",
                    href: "/legal/subprocessor-list.pdf",
                    div {
                        span { class: "subprocessor-document-title", "Subprocessor List" }
                        span { class: "subprocessor-document-date",
                            "Updated "
                            time { datetime: "2026-11-11", "November 11, 2026" }
                        }
                    }
                    span { class: "subprocessor-document-format mono", "PDF" }
                    span { class: "subprocessor-document-arrow", "aria-hidden": "true", "↗" }
                }
            }
        }
    }
}
