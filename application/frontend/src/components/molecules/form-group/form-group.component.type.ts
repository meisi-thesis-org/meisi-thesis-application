import type { FormField } from '@/components/atoms/form-field'

type FormGroup = {
  readonly name: string
  readonly formFieldCollection: FormField[]
}

export type {
  FormGroup
}
