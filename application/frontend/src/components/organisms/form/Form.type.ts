import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type"
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";

type FormProps = {
    formHeader: FormHeaderProps
    formSections: Array<FormSectionProps>
}

export type { FormProps };