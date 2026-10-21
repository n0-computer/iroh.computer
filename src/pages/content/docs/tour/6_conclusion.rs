//! Content for `/docs/tour/6-conclusion`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsTour6Conclusion() -> Element {
    rsx! {
        h1 { id: "6-things-iroh-doesn-t-do-out-of-the-box",
            "6. Things iroh doesn’t do out of the box"
        }
        p {
            "Before we go, let’s talk through a little of what iroh "
            em { "doesn’t" }
            " cover:"
        }
        h3 { id: "magically-keep-endpoints-online", "Magically keep endpoints online" }
        p {
            "First, iroh doesn’t magically ensure the device you’re trying to dial is online. It doesn’t buffer messages & wait until you turn your phone back on. The technical term for this is “network churn”, and programming around the reality that endpoints can come online & go offline whenever they want is the core concern of all distributed systems programming."
        }
        h3 { id: "obscure-your-ip-address", "Obscure your IP address" }
        p {
            "Second, iroh doesn’t obscure your IP address. endpoints accepting connections will know your IP address. This is one of the biggest reason we think that iroh should be a library that users build into apps that have an in-built sense of trust. Keep in mind: sharing IP addresses is common practice in the wild, nearly all of major video conferencing tools do this. Video games do this. Heck, Spotify used to do this. And keep in mind, seeing your IP address is a thing traditional servers "
            em { "always" }
            " have access to."
        }
        h3 { id: "peer-signaling", "Peer Signaling" }
        p {
            "Lastly, iroh doesn’t yet come with a built-in peer signaling mechanism, that is, a way to get alice’s endpoint id to bob. This seems like a massive oversight, but it’s on purpose: different apps have different opinions about how peers should learn about each other. In some cases it’s as simple as storing EndpointIDs in an app database & passing them out as API responses. In other cases it’s local discovery only, or using tickets to encode dialing details + protocol invocations in a single string. We'll talk through patterns for peer signaling in future docs."
        }
        h2 { id: "conclusion", "Conclusion" }
        p {
            "This concludes the iroh tour! Now that you understand a bit of iroh here are some next steps:"
        }
        ul {
            li {
                "check the "
                a { href: "/docs/examples", "examples" }
            }
            li {
                a { href: "https://iroh.computer/discord", "join the discord" }
            }
            li {
                "have a look through the iroh "
                a { href: "https://github.com/n0-computer/awesome-iroh", "awesome list" }
            }
        }
        div {
            div {
                a {}
            }
        }
    }
}
