"use client";

import { useParams } from "next/navigation";
import { protocols } from "@/app/proto/protocols";
import NotFound from "@/app/not-found";
import { Heading } from "@/components/Heading";
import { useEffect, useState } from "react";
import { Readme } from "@/components/Readme";


export default function Protocol() {
  const { slug } = useParams();
  const protocol = protocols.find((protocol) => protocol.slug === slug);
  const [markdown, setMarkdown] = useState("");
  const [repoData, setRepoData] = useState({});

  useEffect(() => {
    (async () => {
      let url = protocol.repository.replace("https://github.com", "https://raw.githubusercontent.com");
      url = `${url}/refs/heads/main/README.md`;
      const res = await fetch(url);
      const text = await res.text()
      setMarkdown(text);
    })()
  }, [protocol.repository]);

  useEffect(() => {
    (async () => {
      let url = protocol.repository.replace("https://github.com", "https://api.github.com/repos");
      url = `${url}`;
      const res = await fetch(url);
      const data = await res.json()
      setRepoData(data);
    })();
  }, [protocol.repository]);

  if (!protocol) {
    return <NotFound />
  }

  return (
    <div className="">
      <Heading level={1}>
        {protocol.title} <span className="text-gray-500/50 ml-2">{protocol.version}</span>
      </Heading>
      <Heading level={4}>
        {repoData.description}
      </Heading>
      <div className="border-t border-gray-200/10 my-4"></div>
      <div className="sm:flex sm:space-x-4">
        <div className="sm:w-2/3">
          <Readme text={markdown} />
        </div>
        <div className="sm:w-1/3">
          {repoData?.license && <div className="mt-4 pb-2 border-b border-gray-200/10">
            <Heading level={3}>License</Heading>
            <div>{repoData.license.name}</div>
          </div>}
          {protocol.documentation && <div className="mt-4 pb-2 border-b border-gray-200/10">
            <Heading level={3}>Documentation</Heading>
            <a href={protocol.documentation} target="_blank" rel="noopener noreferrer">{protocol.documentation}</a>
          </div>}
          {protocol.repository && <div className="mt-4 pb-2 border-b border-gray-200/10">
            <Heading level={3}>Repository</Heading>
            <a href={protocol.repository} target="_blank" rel="noopener noreferrer">{protocol.repository}</a>
          </div>}
        </div>
      </div>
    </div>
  );
}