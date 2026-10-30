use crate::content;
use serde::Serialize;

const SITE: &str = "https://iroh.computer";
const DESCRIPTION: &str = "Add peer-to-peer connectivity to your app, agent, or workflow. IP addresses break, dial keys instead.";

#[derive(Clone, PartialEq, Serialize)]
pub struct Metadata {
    pub title: String,
    pub canonical: Option<String>,
    pub tags: Vec<(String, String, String)>,
}

pub fn for_path(path: &str) -> Metadata {
    let path = path
        .split(['?', '#'])
        .next()
        .unwrap_or("/")
        .trim_end_matches('/');
    let path = match path {
        "" => "/",
        "/solutions/rave" => "/solutions/video",
        "/solutions/delta-chat" => "/solutions/data-sync",
        path => path,
    };
    let page = content::pages().iter().find(|p| p.path == path);
    let protocol = content::protocols()
        .iter()
        .find(|p| path == format!("/proto/{}", p.slug));
    let (title, description) = match path {
        "/" => ("iroh — Less net work for networks".into(), DESCRIPTION),
        "/blog" => (
            "Blog — iroh".into(),
            "Articles related to iroh use & development.",
        ),
        "/proto" => (
            "Protocols — iroh".into(),
            "Explore the protocols and projects built on iroh's direct connections.",
        ),
        _ if page.is_some() => {
            let p = page.unwrap();
            (
                format!("{} — iroh", p.title),
                if p.description.is_empty() {
                    DESCRIPTION
                } else {
                    &p.description
                },
            )
        }
        _ if protocol.is_some() => {
            let p = protocol.unwrap();
            (format!("{} — iroh", p.title), p.tagline.as_str())
        }
        _ => (
            "Page not found — iroh".into(),
            "The page may have moved. Let's get you back on the network.",
        ),
    };
    let found = matches!(path, "/" | "/blog" | "/proto") || page.is_some() || protocol.is_some();
    let canonical = found.then(|| format!("{SITE}{path}"));
    let image = page
        .map(|p| p.social_image.as_str())
        .filter(|s| !s.is_empty())
        .unwrap_or("/img/kv/iroh-kv-og-1.png");
    let image = if image.starts_with('/') {
        format!("{SITE}{image}")
    } else {
        image.to_string()
    };
    let mut tags = Vec::new();
    let mut tag = |attribute: &str, name: &str, value: &str| {
        tags.push((attribute.into(), name.into(), value.into()))
    };
    tag("name", "description", description);
    tag("property", "og:title", &title);
    tag("property", "og:description", description);
    tag("property", "og:site_name", "iroh");
    tag(
        "property",
        "og:type",
        if page.is_some_and(|p| !p.date.is_empty()) {
            "article"
        } else {
            "website"
        },
    );
    tag("property", "og:image", &image);
    tag("name", "twitter:card", "summary_large_image");
    tag("name", "twitter:title", &title);
    tag("name", "twitter:description", description);
    tag("name", "twitter:image", &image);
    if let Some(url) = &canonical {
        tag("property", "og:url", url);
    }
    if !found {
        tag("name", "robots", "noindex");
    }
    if let Some(p) = page.filter(|p| !p.date.is_empty()) {
        tag(
            "property",
            "article:published_time",
            &format!("{}T00:00:00Z", p.date),
        );
        if !p.author.is_empty() {
            tag("name", "author", &p.author);
        }
    }
    Metadata {
        title,
        canonical,
        tags,
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub fn escape(text: &str) -> String {
    text.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
}

#[cfg(not(target_arch = "wasm32"))]
impl Metadata {
    pub fn html(&self) -> String {
        let mut html = format!("<title>{}</title>\n", escape(&self.title));
        if let Some(url) = &self.canonical {
            html.push_str(&format!(
                "<link data-iroh-meta rel=\"canonical\" href=\"{}\">\n",
                escape(url)
            ));
        }
        for (attribute, name, value) in &self.tags {
            html.push_str(&format!(
                "<meta data-iroh-meta {attribute}=\"{}\" content=\"{}\">\n",
                escape(name),
                escape(value)
            ));
        }
        html
    }
}
