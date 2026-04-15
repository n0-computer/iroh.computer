'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

const MAILCHIMP_URL =
  'https://computer.us10.list-manage.com/subscribe/post-json?u=7ee5e42577ed134f89e28572b&id=ca88c7595d&f_id=00d3c1e5f0'
const HONEYPOT_NAME = 'b_7ee5e42577ed134f89e28572b_ca88c7595d'

function stripHtml(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '')
}

export function SubscribeDialog({ open, onClose, source }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const scriptRef = useRef(null)
  const callbackNameRef = useRef(null)

  const cleanup = () => {
    if (callbackNameRef.current && window[callbackNameRef.current]) {
      try {
        delete window[callbackNameRef.current]
      } catch {
        window[callbackNameRef.current] = undefined
      }
      callbackNameRef.current = null
    }
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current)
      scriptRef.current = null
    }
  }

  useEffect(() => cleanup, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setMessage('')
    cleanup()

    const callbackName = `mcCallback_${Date.now()}_${Math.floor(Math.random() * 1e9)}`
    callbackNameRef.current = callbackName

    const params = new URLSearchParams({
      EMAIL: email,
      [HONEYPOT_NAME]: honeypot,
      c: callbackName,
    })
    if (company) {
      params.set('COMPANY', company)
    }
    if (source) {
      params.set('SOURCE', source)
    }
    const url = `${MAILCHIMP_URL}&${params.toString()}`

    window[callbackName] = (data) => {
      if (data && data.result === 'success') {
        setStatus('success')
        setMessage("We'll see you soon.")
      } else {
        setStatus('error')
        setMessage(stripHtml(data?.msg) || 'Something went wrong. Please try again.')
      }
      cleanup()
    }

    const script = document.createElement('script')
    script.src = url
    script.onerror = () => {
      setStatus('error')
      setMessage('Connection error. Please try again.')
      cleanup()
    }
    scriptRef.current = script
    document.body.appendChild(script)
  }

  const close = () => {
    if (status === 'loading') return
    onClose()
  }

  const reset = () => {
    setEmail('')
    setCompany('')
    setHoneypot('')
    setStatus('idle')
    setMessage('')
    cleanup()
  }

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={reset}>
      <Dialog onClose={close} className="fixed inset-0 z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-400/40 backdrop-blur-sm dark:bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto px-4 py-8 sm:py-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative mx-auto w-full max-w-xl rounded-lg bg-white p-10 shadow-xl ring-1 ring-zinc-900/10 dark:bg-irohGray-800 dark:ring-irohGray-700">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 text-irohGray-500 hover:text-irohGray-700 dark:text-irohGray-400 dark:hover:text-irohGray-200"
              >
                <X className="h-5 w-5" />
              </button>

              <Dialog.Title className="text-3xl sm:text-4xl font-bold leading-tight text-irohGray-900 dark:text-irohGray-50">
                Let&apos;s set up a meeting
              </Dialog.Title>
              <p className="mt-3 text-base text-irohGray-600 dark:text-irohGray-300">
                Drop your details and we&apos;ll reach out to learn what you&apos;re building.
              </p>

              {status === 'success' ? (
                <div className="mt-6 rounded-md bg-irohPurple-500/10 p-4 text-sm text-irohPurple-600 dark:text-irohPurple-300">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="subscribe-email"
                      className="block text-sm font-medium text-irohGray-700 dark:text-irohGray-200"
                    >
                      Email address <span className="text-irohPurple-500">*</span>
                    </label>
                    <input
                      id="subscribe-email"
                      name="EMAIL"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-irohGray-300 bg-white px-3 py-2 text-sm text-irohGray-900 shadow-sm focus:border-irohPurple-500 focus:outline-none focus:ring-1 focus:ring-irohPurple-500 dark:border-irohGray-600 dark:bg-irohGray-900 dark:text-irohGray-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscribe-company"
                      className="block text-sm font-medium text-irohGray-700 dark:text-irohGray-200"
                    >
                      Company
                    </label>
                    <input
                      id="subscribe-company"
                      name="COMPANY"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-irohGray-300 bg-white px-3 py-2 text-sm text-irohGray-900 shadow-sm focus:border-irohPurple-500 focus:outline-none focus:ring-1 focus:ring-irohPurple-500 dark:border-irohGray-600 dark:bg-irohGray-900 dark:text-irohGray-100"
                    />
                  </div>

                  <div aria-hidden="true" className="absolute left-[-5000px]">
                    <input
                      type="text"
                      name={HONEYPOT_NAME}
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {status === 'error' && message && (
                    <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-md bg-irohPurple-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-irohPurple-400 disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Sending…' : 'Talk to us'}
                  </button>
                </form>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
