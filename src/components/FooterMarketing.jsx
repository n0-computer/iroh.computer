

export function FooterMarketing() {
  return (
    <footer className="bg-irohGray-1000 pt-20 pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:px-6 sm:flex-row lg:px-10">
        <div className="w-full sm:w-3/12">
          <a href="/" className="inline-block align-bottom">
            <img className="h-6 w-auto" src="/img/logo/iroh-wordmark-purple.svg" alt="Iroh" />
            {/* <img className="hidden md:block h-8 w-auto" src="/img/logos/wordmark-full-gray.svg" alt="Number Zero"> */}
          </a>
          <span className="inline-block mt-2 mx-1">by</span>
          <a href="https://n0.computer" className="inline-block align-bottom">
            <img className="h-8 w-10" src="/img/logo/n0-wordmark-gray.svg" alt="Number Zero" />
          </a>
        </div>
        <div className="w-full sm:w-9/12 text-right">
          <a href="/contact" target="blank" className="mx-4">contact</a>
          <a href="/legal" target="blank" className="mx-4">legal</a>
        </div>
      </div>
    </footer>
  )
}