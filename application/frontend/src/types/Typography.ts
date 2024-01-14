import type { Color } from "./Color"

type Segment = 'brand' | 'header' | 'subHeader' | 'paragraph' | 'designation' | 'placeholder' | 'error'

type TypographyProps = {
  readonly content: string
  readonly segment: Segment
  readonly color?: Color
}

export type { TypographyProps }
