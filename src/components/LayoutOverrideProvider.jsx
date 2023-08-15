'use client'

import {
  createContext,
  useContext,
} from 'react'

const LayoutOverrideContext = createContext()

export function LayoutOverrideProvider({ overrides, pathname, children }) {

  return (
    <LayoutOverrideContext.Provider value={overrides[pathname]}>
      {children}
    </LayoutOverrideContext.Provider>
  )
}

export function useLayoutOverride() {
  return useContext(LayoutOverrideContext)
}
