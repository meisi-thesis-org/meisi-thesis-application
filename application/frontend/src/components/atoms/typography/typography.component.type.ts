type TypographySegment =
  'brand' |
  'header' |
  'sub-header' |
  'label' |
  'paragraph';

type TypographyProps = {
  readonly content: string
  readonly segment: TypographySegment
}

export type {
  TypographyProps
}
