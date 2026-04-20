'use client'

import { useState } from 'react'
import { Button } from './Button'
import { SubscribeDialog } from './SubscribeDialog'

export function ContactButton({ children, source, ...buttonProps }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button {...buttonProps} onClick={() => setOpen(true)}>
        {children}
      </Button>
      <SubscribeDialog open={open} onClose={() => setOpen(false)} source={source} />
    </>
  )
}

export function ContactTrigger({ children, className, source, type = 'button', ...rest }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type={type}
        onClick={() => setOpen(true)}
        className={className}
        {...rest}
      >
        {children}
      </button>
      <SubscribeDialog open={open} onClose={() => setOpen(false)} source={source} />
    </>
  )
}
