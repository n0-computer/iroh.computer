import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { ThemeImage } from "@/components/ThemeImage"
import Link from "next/link"

export const metadata = {
  title: 'Solutions | Iroh',
  description: 'See how companies use iroh to build fast, reliable, distributed applications.',
}

const solutions = [
  {
    category: "AI/ML",
    company: "Nous",
    headline: "Distributed AI Training",
    description: "Train foundation LLMs with compute distributed around the world, across AWS, GCP, Azure, and self-hosted infrastructure.",
    href: "/solutions/nous",
    logo: "nous",
  },
  {
    category: "Streaming Video",
    company: "Rave",
    headline: "Video Streaming at Global Scale",
    description: "Stream video between millions of devices around the world every day, with over 1 million concurrent connections per relay.",
    href: "/solutions/rave",
    logo: "rave",
  },
  {
    category: "Resilient Apps",
    company: "Delta Chat",
    headline: "Resilient Messaging & P2P Web Apps",
    description: "Power in-chat apps for hundreds of thousands of devices around the world, even when internet access is precarious.",
    href: "/solutions/delta-chat",
    logo: "delta_chat",
  },
]

export default function SolutionsPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl pt-12 text-center">
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
              Solutions
            </h1>
            <p className="text-xl text-irohGray-600 dark:text-irohGray-300 leading-relaxed max-w-2xl mx-auto">
              See how companies use iroh to build fast, reliable, distributed applications
              that work everywhere.
            </p>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl space-y-16">
            {solutions.map((solution) => (
              <Link key={solution.company} href={solution.href} className="block">
                <div className="grid lg:grid-cols-2 gap-12 items-center p-10 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">{solution.category}</p>
                    <p className="text-2xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-4">{solution.headline}</p>
                    <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6">
                      {solution.description}
                    </p>
                    <p className="text-irohPurple-500 font-medium text-lg">
                      Read case study →
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-8">
                    <ThemeImage
                      alt={`${solution.company} logo`}
                      darkSrc={`/img/user-logos/${solution.logo}.png`}
                      lightSrc={`/img/user-logos/${solution.logo}.png`}
                      width={300}
                      height={150}
                      className="object-contain max-h-32"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with iroh in minutes. No complex configuration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.iroh.computer/quickstart">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Read the Docs
                </Button>
              </Link>
              <Link href="/enterprise">
                <Button
                  arrow="none"
                  variant="outline"
                  className="border-irohGray-300 dark:border-irohGray-600 hover:bg-irohGray-100 dark:hover:bg-irohGray-800 px-8 py-3 bg-transparent"
                >
                  Enterprise Solutions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FooterMarketing />
      </div>
    </div>
  )
}
