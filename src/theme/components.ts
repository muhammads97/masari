import type { ComponentTheme } from '@/theme/types/theme';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type AllStyle = {} & Record<string, ImageStyle | TextStyle | ViewStyle>;

const generateComponentStyles = ({
  backgrounds,
  fonts,
  layout,
  colors,
  borders,
  gutters,
}: ComponentTheme) => {
  return {
    buttonCircle: {
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...backgrounds.background,
      ...fonts.primary,
      borderRadius: 35,
      height: 64,
      width: 64,
    },
    circle250: {
      borderRadius: 140,
      height: 250,
      width: 250,
    },
    authInput: {
      ...backgrounds.white,
      borderRadius: 8,
      width: '100%',
      height: 40,
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderWidth: 1,
      borderColor: colors.borderLight,
      fontSize: 14,
    },
    chatInput: {
      ...backgrounds.white,
      borderRadius: 8,
      height: 38,
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
      fontSize: 14,
    },
    primaryButton: {
      ...backgrounds.primary,
      borderRadius: 8,
      width: '100%',
      height: 40,
    },
    editInput: {
      ...backgrounds.white,
      ...borders.borderLight,
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingVertical_8,
      ...borders.w_1,
      ...fonts.primaryText,
      ...fonts.size_12,
      ...fonts.alignCenter,
      borderRadius: 8,
      height: 28,
    },
  } as const satisfies AllStyle;
};

export default generateComponentStyles;
