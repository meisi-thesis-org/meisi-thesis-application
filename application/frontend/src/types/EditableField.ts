import type { Color } from "./Color"

export type EditableFieldProps = {
    readonly name: string
    readonly content: string
    readonly color?: Color
    readonly isEditable: boolean
}