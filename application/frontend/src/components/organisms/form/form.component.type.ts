import type { FormGroupProps } from '@/components/molecules/form-group'

type FormProps = {
  readonly header: string
  readonly subHeader: string
  readonly formGroupCollection: FormGroupProps[]
  readonly buttonAction: () => void
  readonly buttonLabel: string
  readonly linkCollection: LinkProps[]
}

export type {
  FormProps
}
