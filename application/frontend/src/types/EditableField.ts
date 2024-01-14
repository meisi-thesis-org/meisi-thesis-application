import type { Color } from "./Color"

export type EditableFieldProps = {
    readonly content: string
    readonly color?: Color
    readonly isEditable: boolean
}