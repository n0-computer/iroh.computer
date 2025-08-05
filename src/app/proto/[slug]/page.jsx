"use client";

import { useParams } from "next/navigation";
import { protocols } from "@/app/proto/protocols";
import NotFound from "@/app/not-found";
import { Heading } from "@/components/Heading";
import { useEffect, useState } from "react";
import { Readme } from "@/components/Readme";
import { Prose } from "@/components/Prose";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";


export default function Protocol() {
  const { slug } = useParams();
  const protocol = protocols.find((protocol) => protocol.slug === slug);
  const [markdown, setMarkdown] = useState("");
  const [repoData, setRepoData] = useState({});

  useEffect(() => {
    (async () => {
      let url = protocol.repository.replace("https://github.com", "https://raw.githubusercontent.com");
      url = `${url}/refs/heads/main/${protocol.readmePath ?? "README.md"}`;
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
    <div>
      <a
        href="/proto"
        aria-label="Go back to articles"
        className="flex text-sm font-medium -ml-5 text-iroh-purple-500 mb-5"
      >
        <ChevronLeftIcon className="mr-1 mt-1 h-4 w-4" />
        All Protocols
      </a>
      <article>
        <div className="flex flex-col">
          <div className="w-full font-space">
            <Heading level={1} className="text-3xl font-bold">
              {protocol.title} <span className="text-gray-500/50 ml-2">{protocol.version}</span>
            </Heading>
            <Heading level={4} className="text-lg text-gray-500/90 mt-2">
              {repoData.description}
            </Heading>
            <div className="border-t border-gray-200/10 my-4 w-full"></div>
          </div>
          <div className="w-full sm:flex sm:space-x-4">
            <div className="sm:w-2/3">
              <Prose>
                <Readme text={markdown} />
              </Prose>
            </div>
            <div className="sm:w-1/3">
              <Prose>
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
              </Prose>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
