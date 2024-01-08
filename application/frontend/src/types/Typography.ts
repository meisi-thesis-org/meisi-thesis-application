type Segment = 'brand' | 'header' | 'subHeader' | 'paragraph' | 'designation' | 'placeholder' | 'error'

type TypographyProps = {
  readonly content: string
  readonly segment: Segment
  readonly color?: "colorized" | "mono"
}

export type { TypographyProps }
