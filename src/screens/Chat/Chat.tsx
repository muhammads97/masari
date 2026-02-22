// screens/chat/Chat.tsx
import {
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { ChatHeader, ChatInputBar, MessageList } from './components';
import { AppScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import { useMessage } from '@/hooks/domain/message/useMessage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ActionSheetIOS, Platform, Alert } from 'react-native';
type Props = AppScreenProps<typeof Paths.Chat>;

function Chat({ navigation }: Props) {
  const { layout } = useTheme();
  const [text, setText] = useState('');
  const { messages, sendImg, sendText, loadPrevious, isLoading, isSending } =
    useMessage();
  const insets = useSafeAreaInsets();
  const [showShadow, setShowShadow] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent;

    setShowShadow(contentOffset.y > 24); // small threshold
  };

  const handleSend = () => {
    if (!text.trim()) return;
    sendText(text.trim());
    setText('');
  };

  const handleCamera = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) openCamera();
          if (buttonIndex === 2) openGallery();
        },
      );
    } else {
      Alert.alert('Select Image', '', [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      (response) => {
        if (response.assets?.length && response.assets[0].uri) {
          sendImg(response.assets[0].uri);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        if (response.assets?.length && response.assets[0].uri) {
          sendImg(response.assets[0].uri);
        }
      },
    );
  };

  useEffect(() => {
    console.log(insets);
  }, [insets]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[layout.flex_1]}>
        <ChatHeader
          onMenuPress={() => navigation.navigate(Paths.History)}
          topInsets={insets.top}
        />

        <View style={layout.flex_1}>
          <MessageList
            messages={messages}
            loadMore={loadPrevious}
            onScroll={onScroll}
            isLoading={isSending}
          />
        </View>

        <ChatInputBar
          showShadow={showShadow}
          bottomInsets={insets.bottom}
          value={text}
          onChangeText={setText}
          onSend={handleSend}
          onCameraPress={handleCamera}
          disabled={isSending}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default Chat;
