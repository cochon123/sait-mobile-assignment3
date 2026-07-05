import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

const SIZE = 20;
const STROKE_WIDTH = 1.8;

export type IconName =
  | 'user'
  | 'mail'
  | 'phone'
  | 'mailbox'
  | 'building'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'check'
  | 'clipboard'
  | 'key'
  | 'sparkles'
  | 'edit'
  | 'chevron-down'
  | 'chevron-right';

/**
 * Inline SVG icons rendered with react-native-svg so we avoid emoji glyphs
 * (consistent across iOS/Android/web, theme-aware stroke color).
 */
export function Icon({
  name,
  size = SIZE,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const theme = useTheme();
  const stroke = color ?? theme.text;
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: STROKE_WIDTH,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'user':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="8" r="4" />
          <Path d="M4 21v-1a8 8 0 0 1 16 0v1" />
        </Svg>
      );
    case 'mail':
      return (
        <Svg {...common}>
          <Rect x="3" y="5" width="18" height="14" rx="2" />
          <Path d="m3 7 9 6 9-6" />
        </Svg>
      );
    case 'phone':
      return (
        <Svg {...common}>
          <Path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </Svg>
      );
    case 'mailbox':
      return (
        <Svg {...common}>
          <Rect x="3" y="6" width="18" height="11" rx="2" />
          <Path d="M3 9h6v8" />
          <Path d="M9 9V6" />
        </Svg>
      );
    case 'building':
      return (
        <Svg {...common}>
          <Rect x="4" y="3" width="16" height="18" rx="1" />
          <Path d="M9 7h0M15 7h0M9 11h0M15 11h0M9 15h0M15 15h0" />
        </Svg>
      );
    case 'lock':
      return (
        <Svg {...common}>
          <Rect x="4" y="10" width="16" height="11" rx="2" />
          <Path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <Circle cx="12" cy="15" r="1" />
        </Svg>
      );
    case 'eye':
      return (
        <Svg {...common}>
          <Path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <Circle cx="12" cy="12" r="3" />
        </Svg>
      );
    case 'eye-off':
      return (
        <Svg {...common}>
          <Path d="M3 3l18 18" />
          <Path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6 0 10 7 10 7a16 16 0 0 1-3.2 3.8" />
          <Path d="M6.6 6.6A16 16 0 0 0 2 12s4 7 10 7a10.3 10.3 0 0 0 4-.8" />
          <Path d="M9.5 9.5a3 3 0 0 0 4.2 4.2" />
        </Svg>
      );
    case 'check':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="9" />
          <Path d="m8 12 3 3 5-6" />
        </Svg>
      );
    case 'clipboard':
      return (
        <Svg {...common}>
          <Rect x="5" y="4" width="14" height="17" rx="2" />
          <Rect x="9" y="2" width="6" height="4" rx="1" />
          <Path d="M9 11h6M9 15h4" />
        </Svg>
      );
    case 'key':
      return (
        <Svg {...common}>
          <Circle cx="8" cy="8" r="4" />
          <Path d="m11 11 9 9" />
          <Path d="m16 16 2-2M19 19l1.5-1.5" />
        </Svg>
      );
    case 'sparkles':
      return (
        <Svg {...common}>
          <Path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <Path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
        </Svg>
      );
    case 'edit':
      return (
        <Svg {...common}>
          <Path d="M12 20h9" />
          <Path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
        </Svg>
      );
    case 'chevron-down':
      return (
        <Svg {...common}>
          <Path d="m6 9 6 6 6-6" />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg {...common}>
          <Path d="m9 6 6 6-6 6" />
        </Svg>
      );
  }
}
