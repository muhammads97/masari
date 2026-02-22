// screens/chat/components/ChatMessageList.tsx
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useTheme } from '@/theme';
import { Message } from '.';
import { DisplayMessage } from '@/hooks/domain/message/types';
import { useRef } from 'react';
import TypingIndicator from './TypingIndicator';

type Props = {
  messages: DisplayMessage[];
  loadMore: () => void;
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
  isLoading: boolean;
};

function ChatMessageList({ messages, onScroll, loadMore, isLoading }: Props) {
  const { gutters } = useTheme();
  const listRef = useRef<FlatList>(null);

  const data = isLoading
    ? [{ id: 'typing-indicator', type: 'TYPING' }, ...messages]
    : messages;

  return (
    <FlatList
      inverted
      ref={listRef}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }: any) =>
        item.type === 'TYPING' ? (
          <TypingIndicator />
        ) : (
          <Message message={item} />
        )
      }
      contentContainerStyle={[gutters.padding_16]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onScroll={onScroll}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
    />
  );
}

export default ChatMessageList;
