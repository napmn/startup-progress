import { useContext } from 'react'

import { ProgressContext, ProgressContextValue } from '@/store'

export const useProgressContext = (): ProgressContextValue => useContext(ProgressContext)
