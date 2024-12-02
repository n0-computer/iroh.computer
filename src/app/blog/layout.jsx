'use client';

import {usePathname} from 'next/navigation';

import {SectionProvider} from '@/components/SectionProvider';

export default function DocsLayout({children, sections = {}}) {
  const pathname = usePathname();
  sections = sections[pathname] || [];

  return (
    <SectionProvider sections={sections}>
      {children}
    </SectionProvider>
  );
}