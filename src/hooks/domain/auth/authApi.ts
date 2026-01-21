import { api } from '@/services/instance';

export const AuthApi = {
  auth: async (email: string) => {
    console.log(api.getUri());
    const response = await api.post('/webhook/auth', {
      email,
    });

    console.log(response);

    return response.data;
  },
};
