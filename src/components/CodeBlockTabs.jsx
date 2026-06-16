import React from 'react';
import { getHighlighter, renderToHtml } from 'shiki';
import { CodeGroup } from '@/components/Code';

let highlighter;

// Several syntax-highlighted snippets rendered as a single tabbed CodeGroup.
// `snippets` is an array of { title, label, language, code }. The sibling
// `CodeBlock` component is the single-snippet version of this.
export async function CodeBlockTabs({ snippets }) {
  highlighter =
    highlighter ??
    (await getHighlighter({
      theme: 'css-variables',
      langs: ['rust', 'swift', 'javascript', 'kotlin'],
    }));

  const rendered = snippets.map((snippet) => {
    const tokens = highlighter.codeToThemedTokens(snippet.code, snippet.language);
    const html = renderToHtml(tokens, {
      elements: {
        pre: ({ children }) => children,
        code: ({ children }) => children,
        line: ({ children }) => `<span>${children}</span>`,
      },
    });
    return { ...snippet, html };
  });

  return (
    <CodeGroup>
      {rendered.map((snippet) => (
        <code
          key={snippet.title}
          title={snippet.title}
          label={snippet.label}
          code={snippet.code}
          dangerouslySetInnerHTML={{ __html: snippet.html }}
        />
      ))}
    </CodeGroup>
  );
}
