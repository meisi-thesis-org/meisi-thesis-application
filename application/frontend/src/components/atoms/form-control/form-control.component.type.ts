type FormControlComponentProps = {
  readonly type: 'text' | 'email' | 'number' | 'date' | 'submit' | 'password'
  readonly placeholder?: string
  readonly value?: string
  readonly required?: boolean
}

export type {
  FormControlComponentProps
}
