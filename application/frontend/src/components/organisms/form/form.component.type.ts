import type { FormGroup } from '@/components/molecules/form-group'

type FormProps = {
  readonly header: string
  readonly subHeader: string
  readonly formGroupCollection: FormGroup[]
}

export type {
  FormProps
}
