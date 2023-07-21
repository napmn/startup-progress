import { createContext, useState } from 'react'

import { StartupProgress } from '@/types'

const PHASES_LOCALSTORAGE_KEY = 'startup-progress-steps'

export type ProgressContextValue = {
  startupProgress: StartupProgress
  updateProgress: (progress: StartupProgress) => void
}

const getInitialState = (): StartupProgress => {
  const progress = localStorage.getItem(PHASES_LOCALSTORAGE_KEY)
  return progress ? (JSON.parse(progress) as StartupProgress) : null
}

export const ProgressContext = createContext<ProgressContextValue>({
  startupProgress: null,
  updateProgress: () => undefined
})

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: could be reducer with actions for adding phase, removing phase etc.
  const [startupProgress, setStartupProgress] = useState<StartupProgress>(getInitialState())

  const updateProgress = (progress: StartupProgress) => {
    setStartupProgress(progress)
    localStorage.setItem(PHASES_LOCALSTORAGE_KEY, JSON.stringify(progress))
  }

  return <ProgressContext.Provider value={{ startupProgress, updateProgress }}>{children}</ProgressContext.Provider>
}
