type IconName = 'menu' |
'theme' |
'locale' |
'search' |
'settings';

type IconSize = 'sm' | 'md' | 'lg' | 'xl'

type IconComponentProps = {
  readonly name: IconName
  readonly size: IconSize
}

export type {
  IconComponentProps
}
