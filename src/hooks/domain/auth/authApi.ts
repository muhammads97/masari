import { api } from '@/services/instance';
import { Session, sessionSchema } from './schema';

export const AuthApi = {
  auth: async (email: string) => {
    const response = await api.post('/webhook/auth', {
      email,
    });
    return response.data;
  },
  authVerify: async (email: string, code: string): Promise<Session> => {
    const response = await api.post('/webhook/auth-verify', {
      email,
      code,
    });
    return sessionSchema.parse(response.data);
  },
  authRefresh: async (refreshToken: string): Promise<Session> => {
    const response = await api.post('/webhook/auth-refresh', {
      refreshToken,
    });
    return sessionSchema.parse(response.data);
  },
};
