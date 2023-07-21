import { Checkbox } from '../ui/checkbox'

type TextCheckboxProps = {
  id: string
  text: string
  isChecked: boolean
  onChange: (value: boolean) => void
  isDisabled?: boolean
}

export const TextCheckbox = ({ text, id, isChecked, onChange, isDisabled = false }: TextCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={isChecked} disabled={isDisabled} onCheckedChange={onChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  )
}
