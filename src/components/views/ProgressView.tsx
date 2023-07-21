import { Fragment, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'
import { useProgressContext } from '@/hooks'
import { AddForm } from '@/components/organisms/AddForm'
import { ProgressMenu } from '@/components/organisms/ProgressMenu'
import { Phase } from '@/components/organisms/Phase'
import { RandomFact } from '@/components/molecules/RandomFact'

export const ProgressView = () => {
  const { startupProgress, updateProgress } = useProgressContext()
  const [isAddingPhase, setIsAddingPhase] = useState(false)

  const handleCreatePhase = (name: string) => {
    const newProgress = {
      startupName: startupProgress!.startupName,
      phases: [...startupProgress!.phases, { name, tasks: [] }]
    }
    updateProgress(newProgress)
    setIsAddingPhase(false)
  }

  const isCompleted =
    startupProgress!.phases.length > 0 &&
    startupProgress!.phases.every((phase) => phase.tasks.length > 0 && phase.tasks.every((task) => task.isCompleted))

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex space-x-4 justify-between items-center">
          <span>{startupProgress?.startupName} progress</span>
          <ProgressMenu onAddPhase={() => setIsAddingPhase(true)} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {startupProgress?.phases.map((phase, index, phases) => (
          <Fragment key={`phase-${index}`}>
            <Phase phase={phase} index={index} isDisabled={index > 0 && !phases[index - 1].tasks.at(-1)?.isCompleted} />
            {index !== phases.length - 1 && <Separator />}
          </Fragment>
        ))}
        {isAddingPhase && (
          <>
            <Separator />
            <AddForm
              placeholder="Name of the phase"
              onClose={() => setIsAddingPhase(false)}
              onSave={handleCreatePhase}
            />
          </>
        )}
        <AlertDialog open={isCompleted}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Congratulations! You've finished your startup 🎉</AlertDialogTitle>
              <AlertDialogDescription>
                Your progress will now be removed to allow you start a new startup idea! But did you know that:{' '}
                <RandomFact />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => updateProgress(null)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
