'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {motion} from 'framer-motion';

import {Footer} from '@/components/Footer';
import {Prose} from '@/components/Prose';
import {Header} from '@/components/Header';
import {Logotype} from '@/components/Logotype';
import {Navigation} from '@/components/Navigation';
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