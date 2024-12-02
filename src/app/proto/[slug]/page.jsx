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

  useEffect(() => {
    (async () => {
      let url = protocol.source.replace("https://github.com", "https://raw.githubusercontent.com");
      url = `${url}/refs/heads/main/README.md`;
      const res = await fetch(url);
      const text = await res.text()
      setMarkdown(text);
    })()
  }, [protocol.source]);

  if (!protocol) {
    return <NotFound />
  }

  return (
    <div className="">
      <Heading level={1}>
        {protocol.title}
        <Readme text={markdown} />
      </Heading>
    </div>
  );
}