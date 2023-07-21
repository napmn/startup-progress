type PhaseTask = {
  name: string
  isCompleted: boolean
}

export type StartupPhase = {
  name: string
  tasks: PhaseTask[]
}

export type StartupProgress = {
  startupName: string
  phases: StartupPhase[]
} | null
