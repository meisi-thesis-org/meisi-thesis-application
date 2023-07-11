export type FormComponentModel = {
  readonly formCategoryCollection: FormCategory[]
  readonly formActionCollection: FormAction[]
}

type FormAction = {
  readonly placeholder: string
  readonly segment: 'button' | 'link'
  readonly callback?: () => unknown
  readonly redirectionRoute?: string
}

type FormCategory = {
  readonly name: string
  readonly formCategoryFieldCollection: FormCategoryField[]
}

type FormCategoryField = {
  readonly name: string
  readonly type: 'string' | 'number' | 'email'
  readonly placeholder: string
  readonly rules: string[]
}
