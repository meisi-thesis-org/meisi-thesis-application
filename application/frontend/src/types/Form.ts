import type { FormActionProps } from "./FormAction"
import type { FormHeaderProps } from "./FormHeader"
import type { FormSectionProps } from "./FormSection"

type FormProps = {
    readonly formHeader: FormHeaderProps
    readonly formSections: Array<FormSectionProps>
    readonly formAction: FormActionProps
}

export type { FormProps }