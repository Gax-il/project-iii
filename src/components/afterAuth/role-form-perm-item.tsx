import { Checkbox } from "../ui/checkbox"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"

interface PermItemProps {
  checked: boolean
  onCheckedChange: any
  label: string
  disabled: boolean
}

export const PermItem = ({
  checked,
  onCheckedChange,
  label,
  disabled
}: PermItemProps) => {

  return (
    <FormItem>
      <div className="grid grid-cols-bool-form">
        <FormLabel>
          {label}
        </FormLabel>
        <FormControl>
          <Checkbox
            disabled={disabled}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  )
}