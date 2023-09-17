type TypographySegment =
  'brand' |
  'header' |
  'sub-header' |
  'label' |
  'paragraph';

type TypographyComponentProps = {
  readonly content: string
  readonly segment: TypographySegment
}

export type {
  TypographyComponentProps
}
