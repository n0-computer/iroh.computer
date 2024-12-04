'use client';

import {usePathname} from 'next/navigation';

import { FooterMarketing } from '@/components/FooterMarketing'
import {protocols} from '@/app/proto/protocols'
import {SectionProvider} from '@/components/SectionProvider';
import BlogHeader from '@/components/BlogHeader'
import { HeroPattern } from '@/components/HeroPattern';

export const navItems = [
  { title: "protocols",
    links: protocols.map((protocol) => ({ title: protocol.title, href: `/proto/${protocol.slug}` }))
  }
];

export default function ProtocolsLayout({children, sections = {}}) {
  const pathname = usePathname();
  sections = sections[pathname] || [];

  return (
    <SectionProvider sections={sections}>
      <HeroPattern />
      <BlogHeader />
      <div className="px-5 sm:px-0 mt-16 lg:mt-32">
        <div className="mx-auto mt-32 mb-64 max-w-5xl">
          {children}
        </div>
      </div>
      <FooterMarketing />
    </SectionProvider>
  );
}