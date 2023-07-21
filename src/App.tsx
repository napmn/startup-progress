import { CreateProgress } from '@/components/views/CreateProgress'
import { ProgressView } from '@/components/views/ProgressView'
import { ProgressProvider } from './store'
import { useProgressContext } from './hooks'

const Root = () => {
  const { startupProgress } = useProgressContext()
  return (
    <main className="min-h-screen bg-background flex justify-center items-baseline p-24">
      {startupProgress ? <ProgressView /> : <CreateProgress />}
    </main>
  )
}

const App = () => {
  return (
    <ProgressProvider>
      <Root />
    </ProgressProvider>
  )
}

export default App
