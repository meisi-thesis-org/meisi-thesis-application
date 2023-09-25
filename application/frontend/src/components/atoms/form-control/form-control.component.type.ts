type FormControlComponentProps = {
  readonly type: 'text' | 'email' | 'number' | 'date' | 'submit' | 'password'
  readonly placeholder?: string
  readonly value?: string
  readonly required?: boolean
  readonly autocomplete?: string
}

export type {
  FormControlComponentProps
}
