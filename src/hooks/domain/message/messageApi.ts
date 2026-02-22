import { api } from '@/services/instance';
import { Message, messagesSchema } from './schema';

export const MessageApi = {
  send: async (message: Message, accessToken: string) => {
    const response = await api.post('/webhook/messages', message, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return messagesSchema.parse(response.data);
  },
};
