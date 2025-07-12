import React from 'react';
import {ThemeImage} from '@/components/ThemeImage'

const companies = [
  "spacedrive",
  "nous",
  "shaga",
  "rave",
  "delta_chat",
  "recall"
];

export function LogoCloud() {
  return (
    <section className='max-w-6xl mx-auto border-r border-t border-l border-irohGray-300 dark:border-irohGray-800 py-24 sm:py-10 md:flex'>
        <div className="mx-auto max-w-2xl px-10 lg:max-w-none">
          <h1 className="text-lg font-semibold text-irohGray-600 dark:text-irohGray-200 md:mt-32">Trusted by the world’s most innovative teams</h1>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 items-start gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-3">
          {companies.map((co)=> (
            <ThemeImage
              key={co}
              alt="Transistor"
              darkSrc={`/img/user-logos/${co}.png`}
              lightSrc={`/img/user-logos/${co}.png`}
              width={300}
              height={150}
              className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
            />
          ))}
        </div>
    </section>
  )
}
