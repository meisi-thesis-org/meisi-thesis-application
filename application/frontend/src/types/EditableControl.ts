import type { Color } from "./Color"

export type EditableControlProps = {
    readonly content: string | number
    readonly color?: Color
    readonly isEditable: boolean
    readonly type: "number" | "text" | 'date' | 'email' | 'tel'
    readonly length?: string
}