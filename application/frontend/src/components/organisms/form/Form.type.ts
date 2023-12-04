import type { FormActionProps } from "@/components/molecules/form-action/FormAction.type";
import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type"
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";

type FormProps = {
    formHeader: FormHeaderProps
    formSections: Array<FormSectionProps>
    formAction: FormActionProps
    onSubmit: () => void
}

export type { FormProps };