import type { Color } from "./Color"

export type EditableFieldProps = {
    readonly content: string | number
    readonly color?: Color
    readonly isEditable: boolean
    readonly maxLength?: string
}