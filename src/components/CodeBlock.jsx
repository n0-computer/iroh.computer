import React from 'react';
import { Code, CodeGroup } from '@/components/Code';
import { getHighlighter, renderToHtml } from 'shiki'

let highlighter;

// a single block of code, with syntax highlighting. This is for use in JSX
// components. For code rendering in markdowm, see the `Code` component
export async function CodeBlock({ code, language }) {
  highlighter =
    highlighter ?? (await getHighlighter({theme: 'css-variables'}));

  const tokens = highlighter.codeToThemedTokens(
      code,
      language,
  );

  const highlightedCode = renderToHtml(tokens, {
    elements: {
      pre: ({children}) => children,
      code: ({children}) => children,
      line: ({children}) => `<span>${children}</span>`,
    },
  });

  return (
    <CodeGroup title="main.rs">
      <code
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </CodeGroup>
  )
}
