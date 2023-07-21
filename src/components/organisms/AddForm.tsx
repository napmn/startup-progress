import { FormEvent, useState } from 'react'
import { Save, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AddFormProps = {
  placeholder: string
  onClose: () => void
  onSave: (name: string) => void
}

export const AddForm = ({ placeholder, onClose, onSave }: AddFormProps) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <Input
          id="name"
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <div className="flex space-x-1">
          <Button type="button" onClick={onClose} size="icon" variant="outline" className="shrink-0">
            <XCircle />
          </Button>
          <Button type="submit" size="icon" className="shrink-0">
            <Save />
          </Button>
        </div>
      </div>
    </form>
  )
}
