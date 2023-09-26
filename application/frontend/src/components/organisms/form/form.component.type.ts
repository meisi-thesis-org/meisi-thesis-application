import type { FormGroupComponentProps } from '@/components/molecules/form-group'
import type { LinkComponentProps } from '@/components/molecules/link'

type FormComponentProps = {
  readonly header: string
  readonly subHeader: string
  readonly formGroupCollection: FormGroupComponentProps[]
  readonly submitAction: (event: any) => void
  readonly submitLabel: string
  readonly linkCollection: LinkComponentProps[]
  readonly hasError: boolean
}

export type {
  FormComponentProps
}
