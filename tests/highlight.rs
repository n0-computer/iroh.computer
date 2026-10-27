#[path = "../src/highlight.rs"]
mod highlight;

#[test]
fn preserves_source_and_unicode_while_coloring_strings_and_comments() {
    let code = "let message = \"hello 🌍 // still a string\"; // comment\nlet count = 64;";
    let lines = highlight::highlight(code, "rust");
    assert_eq!(lines.iter().map(|tokens| tokens.iter().map(|t| t.text).collect::<String>()).collect::<Vec<_>>().join("\n"), code);
    assert!(lines[0].iter().any(|t| t.class == "syntax-string" && t.text.contains("// still a string")));
    assert!(lines[0].iter().any(|t| t.class == "syntax-comment" && t.text == "// comment"));
    assert!(lines[1].iter().any(|t| t.class == "syntax-number" && t.text == "64"));
}

#[test]
fn treats_hash_by_language_and_keeps_multiline_comments() {
    assert!(highlight::highlight("# Python comment", "python")[0].iter().all(|t| t.class == "syntax-comment"));
    assert!(!highlight::highlight("#[tokio::main]", "rust")[0].iter().any(|t| t.class == "syntax-comment"));
    let c = highlight::highlight("/* first\nsecond */ int main()", "c");
    assert_eq!(c[1][0].text, "second */");
    assert_eq!(c[1][0].class, "syntax-comment");
    assert!(c[1].iter().any(|t| t.class == "syntax-keyword" && t.text == "int"));
    assert!(c[1].iter().any(|t| t.class == "syntax-function" && t.text == "main"));
}
