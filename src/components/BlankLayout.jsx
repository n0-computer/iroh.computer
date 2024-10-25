'use client'

import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from './FooterMarketing'

export function BlankLayout({ children }) {
  return (
    <div>
      <BlogHeader />
      <div className="px-5 sm:px-0 mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto mt-32 mb-64 max-w-3xl">
            <article>
              {children}
            </article>
          </div>
        </div>
      </div>
      <FooterMarketing />
    </div>
  )
}
