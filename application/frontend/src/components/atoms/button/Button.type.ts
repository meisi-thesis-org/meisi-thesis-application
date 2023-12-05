type ButtonProps = {
    readonly type: "button" | "submit" | "reset" | undefined
    readonly content: string
    readonly disabled?: boolean
}

export type { ButtonProps }