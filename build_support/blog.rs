use pulldown_cmark::{Event, Options, Parser, Tag, TagEnd, html};
use serde::Deserialize;
use std::collections::HashSet;

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Metadata {
    pub title: String,
    pub description: String,
    pub date: String,
    pub author: String,
    #[serde(default)]
    pub social_image: String,
    #[serde(default)]
    pub draft: bool,
}

pub struct Post {
    pub metadata: Metadata,
    pub html: String,
}

pub fn compile_post(slug: &str, source: &str) -> Result<Post, String> {
    if slug.is_empty()
        || !slug
            .bytes()
            .all(|c| c.is_ascii_alphanumeric() || c == b'-' || c == b'_')
    {
        return Err(
            "post filenames must contain only letters, numbers, hyphens, or underscores".into(),
        );
    }
    let source = source.replace("\r\n", "\n");
    let source = source
        .strip_prefix("+++\n")
        .ok_or("expected TOML front matter between +++ lines")?;
    let (front_matter, markdown) = source
        .split_once("\n+++\n")
        .ok_or("missing closing +++ front matter delimiter")?;
    let metadata: Metadata = toml::from_str(front_matter).map_err(|error| error.to_string())?;
    for (name, value) in [("title", &metadata.title), ("author", &metadata.author)] {
        if value.trim().is_empty() {
            return Err(format!("{name} must not be empty"));
        }
    }
    validate_date(&metadata.date)?;
    let image = &metadata.social_image;
    if !image.is_empty()
        && (image.chars().any(char::is_whitespace)
            || !(image.starts_with("https://")
                || (image.starts_with('/') && !image.starts_with("//"))))
    {
        return Err(
            "social_image must be a /public-relative image path or an HTTPS image URL".into(),
        );
    }
    if image.starts_with('/') && image.split('/').any(|part| part == "..") {
        return Err("social_image must not contain parent-directory paths".into());
    }
    if markdown.trim().is_empty() {
        return Err("post body must not be empty".into());
    }

    let options = Options::ENABLE_TABLES
        | Options::ENABLE_STRIKETHROUGH
        | Options::ENABLE_TASKLISTS
        | Options::ENABLE_FOOTNOTES
        | Options::ENABLE_HEADING_ATTRIBUTES
        | Options::ENABLE_GFM;
    let mut events: Vec<_> = Parser::new_ext(markdown, options).collect();
    // Keep explicit anchors during migration; give new Markdown headings useful,
    // unique IDs without requiring authors to maintain them manually.
    let mut used: HashSet<String> = events
        .iter()
        .filter_map(|event| match event {
            Event::Start(Tag::Heading { id: Some(id), .. }) => Some(id.to_string()),
            _ => None,
        })
        .collect();
    for i in 0..events.len() {
        if !matches!(&events[i], Event::Start(Tag::Heading { id: None, .. })) {
            continue;
        }
        let text: String = events[i + 1..]
            .iter()
            .take_while(|event| !matches!(event, Event::End(TagEnd::Heading(_))))
            .filter_map(|event| match event {
                Event::Text(text) | Event::Code(text) => Some(text.as_ref()),
                _ => None,
            })
            .collect();
        let base = text
            .to_lowercase()
            .split(|c: char| !c.is_ascii_alphanumeric())
            .filter(|part| !part.is_empty())
            .collect::<Vec<_>>()
            .join("-");
        let base = if base.is_empty() {
            "section".to_string()
        } else {
            base
        };
        let mut id = base.clone();
        let mut suffix = 2;
        while !used.insert(id.clone()) {
            id = format!("{base}-{suffix}");
            suffix += 1;
        }
        if let Event::Start(Tag::Heading { id: heading_id, .. }) = &mut events[i] {
            *heading_id = Some(id.into());
        }
    }
    let mut rendered = String::new();
    html::push_html(&mut rendered, events.into_iter());
    Ok(Post {
        metadata,
        html: rendered,
    })
}

fn validate_date(date: &str) -> Result<(), String> {
    let invalid = || "date must be a valid YYYY-MM-DD string".to_string();
    if date.len() != 10
        || !date.bytes().enumerate().all(|(i, c)| {
            if i == 4 || i == 7 {
                c == b'-'
            } else {
                c.is_ascii_digit()
            }
        })
    {
        return Err(invalid());
    }
    let parts: Vec<u32> = date
        .split('-')
        .map(str::parse)
        .collect::<Result<_, _>>()
        .map_err(|_| invalid())?;
    let [year, month, day] = parts.as_slice() else {
        return Err(invalid());
    };
    let leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    let days = match month {
        1 | 3 | 5 | 7 | 8 | 10 | 12 => 31,
        4 | 6 | 9 | 11 => 30,
        2 if leap => 29,
        2 => 28,
        _ => return Err(invalid()),
    };
    if *year == 0 || *day == 0 || *day > days {
        return Err(invalid());
    }
    Ok(())
}
