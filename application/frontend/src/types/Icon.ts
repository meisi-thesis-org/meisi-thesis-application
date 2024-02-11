import type { Color } from "@/types/Color"

type IconProps = {
  readonly name: 
  'device' | 
  'network' | 
  'settings' | 
  'theme' | 
  'locale' | 
  'watcher' | 
  'watcher-off' |
  'trashcan' |
  'pencil' |
  'plus' | 
  'lock' | 
  'unlock' |
  'dossier' |
  'dashboard' |
  'door'
  readonly height: string
  readonly width: string
  readonly color?: Color
  readonly onClick?: Function
}

export type { IconProps };
