import type { Colors } from '@/app.style';

type TypographySegment =
  'brand' |
  'header' |
  'sub-header' |
  'info' |
  'label' |
  'paragraph';

type TypographyComponentProps = {
  readonly content: string
  readonly segment: TypographySegment
  readonly color?: Colors
}

export type {
  TypographyComponentProps
}
