import { MoreVertical, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useProgressContext } from '@/hooks'

type ProgressMenuProps = {
  onAddPhase: () => void
}

// TODO add confirmation modal for removing
export const ProgressMenu = ({ onAddPhase }: ProgressMenuProps) => {
  const { updateProgress } = useProgressContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="end">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={onAddPhase}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add phase</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => updateProgress(null)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Remove progress</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
