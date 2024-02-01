import type { Color } from "./Color"

export type EditableControlProps = {
    readonly content: string
    readonly color?: Color
    readonly isEditable: boolean
}