type Segment = 'brand' | 'header' | 'subHeader' | 'paragraph' | 'designation' | 'placeholder' | 'error'

type TypographyProps = {
  readonly content: string
  readonly segment: Segment
}

export type { TypographyProps }
