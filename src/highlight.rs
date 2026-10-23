//! Lightweight token coloring for the site's short, editable code examples.
//! This is a lexer, not a compiler: the original text is always preserved.
#[derive(Debug, PartialEq)]
pub struct Token<'a> {
    pub text: &'a str,
    pub class: &'static str,
}

pub fn highlight<'a>(code: &'a str, language: &str) -> Vec<Vec<Token<'a>>> {
    let mut block_comment = false;
    code.lines().map(|line| tokenize(line, language, &mut block_comment)).collect()
}

fn tokenize<'a>(line: &'a str, language: &str, block_comment: &mut bool) -> Vec<Token<'a>> {
    let mut tokens = Vec::new();
    let mut offset = 0;
    while offset < line.len() {
        let rest = &line[offset..];
        let first = rest.chars().next().unwrap();
        let (length, class) = if *block_comment {
            match rest.find("*/") {
                Some(end) => { *block_comment = false; (end + 2, "syntax-comment") }
                None => (rest.len(), "syntax-comment"),
            }
        } else if (language == "python" && first == '#') || (language != "python" && rest.starts_with("//")) {
            (rest.len(), "syntax-comment")
        } else if language != "python" && rest.starts_with("/*") {
            match rest[2..].find("*/") {
                Some(end) => (end + 4, "syntax-comment"),
                None => { *block_comment = true; (rest.len(), "syntax-comment") }
            }
        } else if matches!(first, '"' | '\'' | '`') {
            let mut escaped = false;
            let mut length = rest.len();
            for (index, ch) in rest.char_indices().skip(1) {
                if escaped { escaped = false; }
                else if ch == '\\' { escaped = true; }
                else if ch == first { length = index + ch.len_utf8(); break; }
            }
            (length, "syntax-string")
        } else if first.is_ascii_digit() {
            let length = rest.char_indices().take_while(|(_, ch)| ch.is_ascii_alphanumeric() || matches!(ch, '.' | '_')).map(|(i, ch)| i + ch.len_utf8()).last().unwrap();
            (length, "syntax-number")
        } else if first.is_alphabetic() || first == '_' {
            let length = rest.char_indices().take_while(|(_, ch)| ch.is_alphanumeric() || *ch == '_').map(|(i, ch)| i + ch.len_utf8()).last().unwrap();
            let word = &rest[..length];
            let class = if is_keyword(word, language) { "syntax-keyword" }
                else if first.is_uppercase() { "syntax-type" }
                else if rest[length..].trim_start().starts_with(['(', '!']) { "syntax-function" }
                else { "" };
            (length, class)
        } else {
            (first.len_utf8(), "")
        };
        tokens.push(Token { text: &line[offset..offset + length], class });
        offset += length;
    }
    tokens
}

fn is_keyword(word: &str, language: &str) -> bool {
    let words: &[&str] = match language {
        "rust" => &["use", "pub", "fn", "async", "await", "let", "mut", "move", "if", "else", "match", "for", "in", "return", "struct", "impl", "trait", "enum", "const", "static", "as", "self", "true", "false"],
        "swift" => &["import", "struct", "class", "static", "func", "async", "await", "throws", "throw", "try", "let", "var", "if", "else", "return", "as", "nil", "true", "false"],
        "javascript" | "js" => &["import", "from", "const", "let", "var", "async", "await", "function", "return", "new", "if", "else", "export", "throw", "try", "catch", "true", "false", "null", "undefined"],
        "kotlin" => &["import", "fun", "val", "var", "suspend", "class", "object", "return", "if", "else", "when", "in", "true", "false", "null"],
        "python" => &["import", "from", "async", "await", "def", "with", "as", "return", "if", "else", "for", "in", "try", "except", "raise", "True", "False", "None"],
        "go" => &["package", "import", "func", "var", "const", "defer", "if", "else", "return", "go", "range", "for", "nil", "true", "false", "struct", "type"],
        "c" => &["include", "define", "int", "char", "void", "const", "struct", "return", "if", "else", "for", "while", "sizeof", "unsigned", "static", "typedef"],
        _ => &[],
    };
    words.contains(&word)
}
