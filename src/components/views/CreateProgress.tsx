import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProgressContext } from '@/hooks'

// TODO: use react-hook-form for form state, yup / zod for validation
export function CreateProgress() {
  const { updateProgress } = useProgressContext()
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newProgress = {
      startupName: name,
      phases: []
    }
    updateProgress(newProgress)
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create startup</CardTitle>
        <CardDescription>Track progress for your new startup idea!</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your startup"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" type="submit">
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
