import type { FormLinkProps } from '@/components/atoms/FormLink/FormLink.type'
import type { FormButtonProps } from '@/components/molecules/FormButton/FormButton.type'
import type { FormGroupProps } from '@/components/molecules/FormGroup/FormGroup.type'

type FormProps = {
  formGroups: FormGroupProps[]
  formActions: {
    formButtons: FormButtonProps[]
    formLinks: FormLinkProps[]
  }
}

export type { FormProps }
