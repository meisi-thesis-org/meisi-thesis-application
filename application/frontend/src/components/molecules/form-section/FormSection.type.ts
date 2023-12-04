import type { FormControlProps } from "@/components/atoms/form-control/FormControl.type"

type FormSectionProps = {
    readonly designation: string
    readonly formControls: Array<FormControlProps>
}

export type { FormSectionProps }