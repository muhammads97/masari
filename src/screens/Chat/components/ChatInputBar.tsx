// screens/chat/components/ChatInputBar.tsx
import { TextInput, TouchableOpacity, View } from 'react-native';
import { IconByVariant } from '@/components/atoms';
import { useTheme } from '@/theme';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  onSend: () => void;
  onCameraPress: () => void;
  bottomInsets: number;
  showShadow?: boolean;
  disabled: boolean;
};

function ChatInputBar({
  value,
  onChangeText,
  onSend,
  onCameraPress,
  bottomInsets,
  showShadow,
  disabled,
}: Props) {
  const { layout, gutters, components, colors, backgrounds } = useTheme();

  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        gutters.padding_12,
        backgrounds.background,
        showShadow && {
          // iOS shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,

          // Android shadow
          elevation: 12,
        },
        {
          paddingBottom: bottomInsets,
        },
      ]}
    >
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={onChangeText}
        placeholder="Message..."
        placeholderTextColor={colors.mutedText}
        style={[components.chatInput, layout.flex_1, gutters.marginRight_16]}
      />

      <TouchableOpacity onPress={onSend} disabled={disabled} hitSlop={10}>
        <IconByVariant
          path="send"
          style={{ width: 24, height: 24 }}
          color={disabled ? colors.primaryLight : colors.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCameraPress}
        hitSlop={10}
        disabled={disabled}
        style={gutters.marginLeft_12}
      >
        <IconByVariant
          path="camera"
          color={disabled ? colors.primaryLight : colors.primary}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ChatInputBar;
