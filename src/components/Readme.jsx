import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Optional: For GitHub Flavored Markdown 

export function Readme(props) {
  const { text = "" } = props;
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text}
      </ReactMarkdown>
    </div>
  );
}
