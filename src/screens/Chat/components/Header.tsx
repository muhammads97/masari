// screens/chat/components/ChatHeader.tsx
import { View, TouchableOpacity, Text } from 'react-native';
import { IconByVariant } from '@/components/atoms';
import { useTheme } from '@/theme';

type Props = {
  onMenuPress: () => void;
  topInsets: number;
};

function ChatHeader({ onMenuPress, topInsets }: Props) {
  const { layout, gutters, borders, fonts } = useTheme();

  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.padding_16,
        borders.borderLight,
        borders.wBottom_1,
        { height: 56, marginTop: topInsets },
      ]}
    >
      <View style={[layout.row, layout.itemsCenter]}>
        <IconByVariant
          path="logo"
          style={[{ width: 28, height: 30 }, gutters.marginRight_8]}
        />
        <Text
          style={[
            fonts.primary,
            fonts.size_24,
            fonts.bold,
            fonts.alignCenter,
            { lineHeight: 26 },
          ]}
        >
          MASARI
        </Text>
      </View>

      <TouchableOpacity onPress={onMenuPress} hitSlop={10}>
        <IconByVariant path="List" style={{ width: 32, height: 32 }} />
      </TouchableOpacity>
    </View>
  );
}

export default ChatHeader;
