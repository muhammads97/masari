import { useTheme } from '@/theme';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  value: string;
};
export const DateTimePickerButton = ({ onPress, value, style }: Props) => {
  const { gutters, borders, backgrounds, fonts } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        style,
        borders.borderLight,
        backgrounds.white,
        borders.borderLight,
        borders.w_1,
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_8,
        { borderRadius: 8, height: 28, width: 100 },
      ]}
    >
      <Text
        style={[
          fonts.size_12,
          fonts.primaryText,
          fonts.alignCenter,
          { lineHeight: 12, letterSpacing: -0.43 },
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};
