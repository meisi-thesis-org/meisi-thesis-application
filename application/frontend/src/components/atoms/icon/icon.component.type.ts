import type { Colors } from '@/app.style';

type IconName = 'sun' | 'moon' | 'locale' | 'device' | 'plus-device';

type IconComponentProps = {
  readonly name: IconName
  readonly color?: Colors
}

export type {
  IconName,
  IconComponentProps
}
