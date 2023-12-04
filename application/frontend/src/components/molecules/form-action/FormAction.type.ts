import type { ButtonProps } from "@/components/atoms/button/Button.type"
import type { LinkProps } from "@/components/atoms/link/Link.type"

type FormActionProps = {
    readonly buttons: Array<ButtonProps>
    readonly links: Array<LinkProps>
}

export type { FormActionProps }