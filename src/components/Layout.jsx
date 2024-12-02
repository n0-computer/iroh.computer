import {SectionProvider} from '@/components/SectionProvider';

export function Layout({children, allSections = {}}) {
  return (
    <SectionProvider sections={allSections}>
      {children}
    </SectionProvider>
  );
}