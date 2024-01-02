type Segment = 'brand' | 'header' | 'subHeader' | 'paragraph' | 'designation' | 'placeholder' | 'error'

type LinkProps = {
    readonly placeholder: string
    readonly href: Function
    readonly segment: Segment
}

export type { LinkProps }