export type FormAction = {
  readonly type: 'link' | 'button'
  readonly placeholder: string
  readonly callback: () => unknown
}
