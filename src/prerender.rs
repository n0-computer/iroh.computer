//! Build-time HTML rendering of the same components used by the WebAssembly app.
use crate::{App, metadata};
use dioxus::{
    document::{Document, Eval, LinkProps, NoOpDocument},
    history::{History, MemoryHistory},
    prelude::*,
};
use std::{cell::RefCell, path::Path, rc::Rc};

#[derive(Default)]
struct StaticDocument {
    styles: RefCell<Vec<String>>,
}

impl Document for StaticDocument {
    fn eval(&self, _: String) -> Eval {
        NoOpDocument.eval(String::new())
    }
    fn create_link(&self, props: LinkProps) {
        if props.rel.as_deref() == Some("stylesheet") {
            if let Some(href) = props.href {
                self.styles.borrow_mut().push(href);
            }
        }
    }
}

pub struct Page {
    pub body: String,
    pub head: String,
    pub styles: Vec<String>,
}

pub fn render(path: &str) -> Page {
    let document = Rc::new(StaticDocument::default());
    let mut dom = VirtualDom::new(App);
    dom.provide_root_context(document.clone() as Rc<dyn Document>);
    dom.provide_root_context(Rc::new(MemoryHistory::with_initial_path(path)) as Rc<dyn History>);
    dom.rebuild_in_place();
    Page {
        body: dioxus_ssr::render(&dom),
        head: metadata::for_path(path).html(),
        styles: document.styles.borrow().iter().cloned().collect(),
    }
}

pub fn paths() -> Vec<String> {
    serde_json::from_str(include_str!(concat!(env!("OUT_DIR"), "/routes.json"))).unwrap()
}

/// Manganis resolves native assets to their sources. Match each to the hashed
/// stylesheet produced by the web build, keeping the browser's stylesheet URLs.
pub fn stylesheet_url(source: &str, output: &Path) -> String {
    let manifest: serde_json::Value = serde_json::from_str(
        &std::fs::read_to_string(output.parent().unwrap().join(".manifest.json"))
            .expect("Dioxus build manifest"),
    )
    .unwrap();
    let assets = manifest["assets"][source]
        .as_array()
        .expect("stylesheet in Dioxus manifest");
    assert_eq!(
        assets.len(),
        1,
        "Expected one bundled stylesheet for {source}"
    );
    let name = assets[0]["bundled_path"].as_str().unwrap();
    assert!(
        output.join("assets").join(name).is_file(),
        "missing stylesheet: {name}"
    );
    format!("/assets/{name}")
}

pub fn html(template: &str, path: &str, output: &Path) -> String {
    let page = render(path);
    let mut head = page.head;
    for source in page.styles {
        head.push_str(&format!(
            "<link rel=\"stylesheet\" href=\"{}\">\n",
            stylesheet_url(&source, output)
        ));
    }
    // dx supplies the bootstrap script and title. Replace only the title; keep
    // the build's script/preload URLs intact.
    let start = template.find("<title>").expect("template title");
    let end = template[start..].find("</title>").unwrap() + start + "</title>".len();
    let mut html = template.to_string();
    html.replace_range(start..end, &head);
    let mount = "<div id=\"main\"></div>";
    assert!(html.contains(mount), "expected empty Dioxus mount");
    html.replace(
        mount,
        &format!(
            "<div id=\"prerender\">{}</div><div id=\"main\" hidden></div>",
            page.body
        ),
    )
}
