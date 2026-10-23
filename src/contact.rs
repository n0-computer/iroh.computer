//! The existing HubSpot contact form, rendered as a native Dioxus dialog.
use crate::Icon;
use dioxus::prelude::*;
const SUBMISSION_URL: &str = "https://api.hsforms.com/submissions/v3/integration/submit/245933953/a065ca9d-36ea-4e33-acf1-ecb95997d9a4";
pub type ContactState = Signal<Option<&'static str>>;
#[component]
pub fn ContactButton(
    children: Element,
    source: &'static str,
    #[props(default = "text-link")] class: &'static str,
) -> Element {
    let mut contact = use_context::<ContactState>();
    rsx! {
        button {
            r#type: "button",
            class: "{class} contact-trigger",
            "aria-haspopup": "dialog",
            onclick: move |_| contact.set(Some(source)),
            {children}
        }
    }
}
#[component]
pub fn ContactDialog(source: &'static str) -> Element {
    let mut contact = use_context::<ContactState>();
    let mut email = use_signal(String::new);
    let mut company = use_signal(String::new);
    let mut use_case = use_signal(String::new);
    let mut honeypot = use_signal(String::new);
    let mut sending = use_signal(|| false);
    let mut succeeded = use_signal(|| false);
    let mut error = use_signal(String::new);
    use_effect(move || {
        document::eval("document.getElementById('contact-dialog')?.showModal()");
    });
    rsx! {
        dialog {
            id: "contact-dialog",
            class: "contact-dialog",
            "aria-labelledby": "contact-heading",
            "aria-describedby": "contact-description",
            oncancel: move |event| {
                event.prevent_default();
                if !sending() { contact.set(None); }
            },
            onclick: move |_| {
                if !sending() {
                    contact.set(None);
                }
            },
            div {
                class: "contact-dialog-content",
                onclick: move |event| event.stop_propagation(),
                button {
                    class: "contact-close",
                    r#type: "button",
                    "aria-label": "Close contact form",
                    disabled: sending(),
                    onclick: move |_| contact.set(None),
                    "×"
                }
                p { class: "contact-kicker", "Let’s make a connection" }
                h2 { id: "contact-heading", "How can we help?" }
                p { id: "contact-description", "Drop your details and we’ll reach out." }
                if succeeded() {
                    div { class: "contact-success", role: "status",
                        h3 { "Thanks for saying hello." }
                        p { "Your details are with the iroh team. We’ll be in touch." }
                        button {
                            class: "button primary",
                            r#type: "button",
                            onclick: move |_| contact.set(None),
                            "Done"
                        }
                    }
                } else {
                    form {
                        onsubmit: move |event| {
                            event.prevent_default();
                            if sending() || email().trim().is_empty() { return; }
                            if !honeypot().is_empty() { succeeded.set(true); return; }
                            sending.set(true);
                            error.set(String::new());
                            let fields = crate::contact_fields::fields(&email(), &company(), &use_case(), source);
                            spawn(async move {
                                if submit(fields).await {
                                    succeeded.set(true);
                                } else {
                                    error.set("We couldn’t send your details. Please check your connection and try again.".into());
                                }
                                sending.set(false);
                            });
                        },
                        label { r#for: "contact-email",
                            "Email address "
                            span { "*" }
                        }
                        input {
                            id: "contact-email",
                            name: "email",
                            r#type: "email",
                            autocomplete: "email",
                            required: true,
                            autofocus: true,
                            disabled: sending(),
                            value: email,
                            oninput: move |e| email.set(e.value()),
                        }
                        label { r#for: "contact-company",
                            "Company "
                            span { class: "contact-optional", "(optional)" }
                        }
                        input {
                            id: "contact-company",
                            name: "company",
                            autocomplete: "organization",
                            disabled: sending(),
                            value: company,
                            oninput: move | e |
                                    company.set(e.value()),
                        }
                        label { r#for: "contact-use-case",
                            "Primary use case "
                            span { class: "contact-optional", "(optional)" }
                        }
                        select {
                            id: "contact-use-case",
                            name: "primary_use_case",
                            disabled: sending(),
                            value: use_case,
                            onchange: move |e| use_case.set(e.value()),
                            option { value: "", "Select an option" }
                            option { value: "networking_optimization", "Cloud networking optimization" }
                            option { value: "iot_embed", "IoT / Embedded" }
                            option { value: "pos_payments", "Point of Sale / Payments" }
                            option { value: "streaming", "Streaming (audio / video / data)" }
                            option { value: "agency", "User Agency" }
                            option { value: "other", "Other" }
                        }
                        div { class: "contact-honeypot", "aria-hidden": "true",
                            input {
                                r#type: "text",
                                name: "website",
                                tabindex: "-1",
                                autocomplete: "off",
                                value: honeypot,
                                oninput: move |e| honeypot.set(e.value()),
                            }
                        }
                        if !error().is_empty() {
                            p { class: "contact-error", role: "alert", "{error}" }
                        }
                        p { class: "contact-consent",
                            "n0.computer needs the contact information you provide to us to contact you about services. You may unsubscribe from these communications at any time."
                        }
                        button {
                            r#type: "submit",
                            class: "button primary contact-submit",
                            disabled: sending(),
                            if sending() {
                                "Sending…"
                            } else {
                                "Talk to us"
                                Icon { name: "arrow" }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Submission only runs in response to the visitor submitting the form.
async fn submit(fields: Vec<serde_json::Value>) -> bool {
    let fields_json = serde_json::to_string(&fields).unwrap();
    let script = format!(
        r#"
        try {{
            const response = await fetch('{SUBMISSION_URL}', {{
                method: 'POST',
                signal: AbortSignal.timeout(15000),
                headers: {{ 'Content-Type': 'application/json' }},
                body: JSON.stringify({{
                    fields: {fields_json},
                    context: {{ pageUri: window.location.href, pageName: document.title }}
                }})
            }});
            dioxus.send(response.ok);
        }} catch (_) {{ dioxus.send(false); }}
    "#
    );
    let mut request = document::eval(&script);
    request.recv::<bool>().await.unwrap_or(false)
}
