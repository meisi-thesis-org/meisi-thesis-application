import type { InputTypeHTMLAttribute } from "vue"

type FormControlProps = {
    readonly type: InputTypeHTMLAttribute
    readonly placeholder: string
    readonly name: string
    readonly rules: Record<string, any>
    readonly hideAlerts?: boolean
}

export type { FormControlProps }