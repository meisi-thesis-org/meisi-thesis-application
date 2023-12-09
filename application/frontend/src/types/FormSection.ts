import type { FormControlProps } from "./FormControl"

type FormSectionProps = {
    readonly designation: string
    readonly formControls: Array<FormControlProps>
}

export type { FormSectionProps }