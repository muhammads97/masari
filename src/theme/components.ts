import type { ComponentTheme } from '@/theme/types/theme';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type AllStyle = {} & Record<string, ImageStyle | TextStyle | ViewStyle>;

const generateComponentStyles = ({
  backgrounds,
  fonts,
  layout,
  colors
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
      width: "100%",
      height: 40,
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderWidth: 1,
      borderColor: colors.borderLight,
      fontSize: 14
    }
  } as const satisfies AllStyle;
};

export default generateComponentStyles;
