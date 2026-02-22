import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './schema';
import { DisplayMessage } from './types';
import { MessageApi } from './messageApi';
import { useAuthProvider } from '../auth/useAuthProvider';
import { useEffect, useState } from 'react';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import { insertMessage, loadMessages } from '@/database/db';

type UseMessageReturnType = {
  sendText: (message: string) => void;
  sendImg: (message: string) => void;
  messages: DisplayMessage[];
  loadPrevious: () => void;
  isLoading: boolean;
  isSending: boolean;
  isSent: boolean;
};

function mergeUnique(existing: DisplayMessage[], incoming: DisplayMessage[]) {
  const map = new Map<string, DisplayMessage>();

  [...existing, ...incoming].forEach((m) => {
    map.set(m.id, m);
  });

  return Array.from(map.values()).sort((a, b) => b.sentAt - a.sentAt);
}

const fromServerToDisplayMessage = (message: Message): DisplayMessage => ({
  id: uuidv4(), // new uuid
  role: 'bot',
  type: message.type,
  content: message.value, // always text
  sentAt: Date.parse(message.sentAt), //MS
});

const fromUserToMessage = async (message: DisplayMessage): Promise<Message> => {
  if (message.type === 'TXT') {
    return {
      sentAt: new Date(message.sentAt).toISOString(),
      type: 'TXT',
      value: message.content,
    };
  }

  const base64 = await prepareImageForOcr(message.content);

  return {
    sentAt: new Date(message.sentAt).toISOString(),
    type: 'IMG',
    value: base64,
  };
};

export async function prepareImageForOcr(uri: string): Promise<string> {
  const resized = await ImageResizer.createResizedImage(
    uri,
    1024,
    1024,
    'JPEG',
    70,
    0,
  );

  const base64 = await RNFS.readFile(resized.uri, 'base64');

  return `data:image/jpeg;base64,${base64}`;
}

export function useMessage(): UseMessageReturnType {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const { getToken } = useAuthProvider();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (message: Message) => {
      const accessToken = await getToken();
      return MessageApi.send(message, accessToken);
    },
    onSuccess: async (data) => {
      const displayMessages = data.map(fromServerToDisplayMessage);

      setMessages((prev) => mergeUnique(prev, displayMessages.reverse()));

      displayMessages.forEach(async (dm) => {
        await insertMessage(dm);
      });
    },
  });

  const sendText = async (text: string) => {
    const displayMessage: DisplayMessage = {
      id: uuidv4(),
      role: 'user',
      type: 'TXT',
      content: text,
      sentAt: Date.now(),
    };
    setMessages((prev) => [displayMessage, ...prev]);
    await insertMessage(displayMessage);

    const apiMsg = await fromUserToMessage(displayMessage);
    await mutateAsync(apiMsg);
  };

  const sendImg = async (imgURi: string) => {
    const id = uuidv4();
    const fileName = `${id}.jpg`;
    const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    await RNFS.copyFile(imgURi, newPath);

    const displayMessage: DisplayMessage = {
      id,
      role: 'user',
      type: 'IMG',
      content: newPath,
      sentAt: Date.now(),
    };
    setMessages((prev) => [displayMessage, ...prev]);
    await insertMessage(displayMessage);

    const apiMsg = await fromUserToMessage(displayMessage);
    await mutateAsync(apiMsg);
  };

  const loadPrevious = async () => {
    setIsLoading(true);

    const older = await loadMessages(30, offset);
    if (older.length >= 0) {
      setMessages((prev) => mergeUnique(prev, older));
      setOffset((prev) => prev + older.length);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    isSending: isPending,
    isSent: isSuccess,
    messages,
    sendImg,
    sendText,
    loadPrevious,
  };
}
