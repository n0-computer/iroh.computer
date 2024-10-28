import fs from "fs";
import RSS from "rss";

import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const allPosts = await getAllPosts();

  const site_url =
  process.env.NODE_ENV === "production"
    ? "https://iroh.computer"
    : "http://localhost:3000";

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/img/logo/iroh-wordmark-purple.svg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/blog/${post.slug}`,
      date: post.date,
    });
  });

  // Write the RSS feed to a file as XML.
  const feedString = feed.xml({ indent: true })
  return new Response(feedString, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml" },
  });
};