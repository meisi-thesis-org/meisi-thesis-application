import type { FormActionProps } from './FormAction'
import type { FormHeaderProps } from './FormHeader'
import type { FormSectionProps } from './FormSection'

type FormProps = {
  readonly formHeader: FormHeaderProps
  readonly formSections: FormSectionProps[]
  readonly formAction: FormActionProps
  readonly onSubmit: (data: Event) => void
}

export type { FormProps }
