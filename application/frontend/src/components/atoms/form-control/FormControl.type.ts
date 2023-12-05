import type { ValidationRuleWithoutParams } from "@vuelidate/core"
import type { InputTypeHTMLAttribute } from "vue"

type FormControlProps = {
    readonly name: string
    readonly placeholder: string
    readonly type: InputTypeHTMLAttribute
    readonly rules: Record<string, ValidationRuleWithoutParams<any>>
}

export type { FormControlProps }