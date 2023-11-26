import type { InputTypeHTMLAttribute } from "vue"

type FormControlProps = {
    type: InputTypeHTMLAttribute
    placeholder: string
    rules: Array<string>
}
export type { FormControlProps }