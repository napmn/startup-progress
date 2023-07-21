import { useState } from 'react'
import { Check, Plus } from 'lucide-react'

import { useProgressContext } from '@/hooks'
import { StartupPhase } from '@/types'
import { TextCheckbox } from '@/components/molecules/TextCheckbox'
import { Button } from '@/components/ui/button'
import { TextTooltip } from '@/components/molecules/TextTooltip'
import { AddForm } from '@/components/organisms/AddForm'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type PhaseProps = {
  phase: StartupPhase
  index: number
  isDisabled: boolean
}

export const Phase = ({ phase: { tasks, name }, index, isDisabled }: PhaseProps) => {
  const { startupProgress, updateProgress } = useProgressContext()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [undoTaskIndex, setUndoTaskIndex] = useState<number | null>(null)

  const handleCreateTask = (taskName: string) => {
    const newProgress = structuredClone(startupProgress)
    newProgress!.phases[index].tasks.push({ name: taskName, isCompleted: false })
    updateProgress(newProgress)
    setIsAddingTask(false)
  }

  const handleToggleTask = (value: boolean, taskIndex: number) => {
    if (!value) {
      setUndoTaskIndex(taskIndex)
      return
    }
    const newProgress = structuredClone(startupProgress)
    newProgress!.phases[index].tasks[taskIndex].isCompleted = value
    updateProgress(newProgress)
  }

  const undoTask = () => {
    if (undoTaskIndex === null) {
      return
    }
    const newProgress = structuredClone(startupProgress)
    newProgress!.phases[index].tasks = newProgress!.phases[index].tasks.map((task, taskIndex) => ({
      ...task,
      isCompleted: taskIndex >= undoTaskIndex ? false : task.isCompleted
    }))
    newProgress!.phases = newProgress!.phases.map((phase, phaseIndex) => ({
      ...phase,
      tasks: phaseIndex > index ? phase.tasks.map((task) => ({ ...task, isCompleted: false })) : phase.tasks
    }))
    updateProgress(newProgress)
    setUndoTaskIndex(null)
  }

  return (
    <div>
      <div className="flex space-x-4 items-center justify-between mb-4">
        <h4 className="text-xl font-medium">{name}</h4>
        {tasks.length && tasks.every((task) => task.isCompleted) ? (
          <Check className="text-green-600 w-10 h-10" />
        ) : (
          <TextTooltip text="Add new task">
            <Button size="icon" variant="ghost" onClick={() => setIsAddingTask(true)}>
              <Plus />
            </Button>
          </TextTooltip>
        )}
      </div>
      <div className="space-y-2.5">
        {tasks.map((task, index) => (
          // TODO better to use some ID for `id` instead of index and phase name to prevent conflicts
          <TextCheckbox
            key={`task-${index}-${name}`}
            id={`task-${index}-${name}`}
            text={task.name}
            onChange={(value) => handleToggleTask(value, index)}
            isChecked={task.isCompleted}
            isDisabled={isDisabled || (index > 0 && !tasks[index - 1].isCompleted)}
          />
        ))}
        {isAddingTask && (
          <AddForm placeholder="Name of the task" onClose={() => setIsAddingTask(false)} onSave={handleCreateTask} />
        )}
        <AlertDialog open={undoTaskIndex !== null}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Undoing this task will undo all following tasks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setUndoTaskIndex(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={undoTask}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
