import type { Themes } from '@/types/Themes'

type TypographySegment = 'brand' | 'header' | 'sub-header' | 'paragraph' | 'designation'

type TypographyProps = {
  content: string
  segment: TypographySegment
  color?: Themes
}

export type { TypographyProps }
