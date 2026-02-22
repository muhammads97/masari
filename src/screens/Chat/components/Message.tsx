// screens/chat/components/ChatMessageBubble.tsx
import { Image, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '@/theme';
import { DisplayMessage } from '@/hooks/domain/message/types';
import { useEffect, useState } from 'react';

type Props = {
  message: DisplayMessage;
};

function ChatMessageBubble({ message }: Props) {
  const { layout, gutters, fonts, colors, borders } = useTheme();
  const isMine = message.role === 'user';
  const isBot = message.role === 'bot';

  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (message.type === 'IMG' && message.content) {
      setImageError(false);

      Image.getSize(
        message.content,
        (width, height) => {
          setAspectRatio(width / height);
        },
        () => {
          setImageError(true);
        },
      );
    }
  }, [message]);

  const markdownStyles = {
    body: {
      fontSize: 14,
      color: colors.primaryText,
    },
    code_inline: {
      backgroundColor: colors.white,
      padding: 4,
      borderRadius: 4,
    },
    fence: {
      backgroundColor: colors.white,
      padding: 8,
      borderRadius: 8,
    },
  };

  const renderImage = () => {
    if (imageError) {
      return (
        <Text
          style={[
            fonts.size_14,
            { fontStyle: 'italic', color: colors.mutedText },
          ]}
        >
          Image not found
        </Text>
      );
    }

    return (
      <Image
        source={{ uri: message.content }}
        style={{
          width: 200,
          borderRadius: 12,
          aspectRatio,
        }}
        resizeMode="cover"
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <View
      style={[
        layout.row,
        isMine ? layout.justifyEnd : layout.justifyStart,
        gutters.marginBottom_12,
      ]}
    >
      <View
        style={[
          gutters.padding_12,
          borders.rounded_16,
          {
            maxWidth: '80%',
            borderBottomEndRadius: 6,
            backgroundColor:
              isMine && (message.type === 'TXT' || imageError)
                ? colors.primary
                : colors.background,
          },
        ]}
      >
        {message.type === 'TXT' ? (
          isBot ? (
            <Markdown style={markdownStyles}>{message.content}</Markdown>
          ) : (
            <Text style={[fonts.size_14, fonts.white]}>{message.content}</Text>
          )
        ) : (
          renderImage()
        )}
      </View>
    </View>
  );
}

export default ChatMessageBubble;
