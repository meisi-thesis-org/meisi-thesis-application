import type { ButtonProps } from "@/components/atoms/button/Button.type";
import type { LinkProps } from "@/components/atoms/link/Link.type";
import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type"
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";

type FormProps = {
    formHeader: FormHeaderProps
    formSections: Array<FormSectionProps>
    readonly buttons: Array<ButtonProps>
    readonly links: Array<LinkProps>
    onSubmit: () => void
}

export type { FormProps };