import { useMutation } from '@tanstack/react-query';
import { AuthApi } from './authApi';
import { useAuthStore } from '@/auth/authStore';
import { useEffect } from 'react';
import { success } from 'zod';

type UseAuthVerifyParams = {
  email: string;
  code: string;
};

type UseAuthVerifyReturnType = {
  authenticate: () => void;
  isLoading: boolean;
  isSuccess: boolean;
};

type MutateInput = {
  email: string;
  code: string;
};

export function useAuthVerify({
  email,
  code,
}: UseAuthVerifyParams): UseAuthVerifyReturnType {
  const { setSession } = useAuthStore();
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: (input: MutateInput) =>
      AuthApi.authVerify(input.email, input.code),
    onSuccess: (data) => {
      setSession(data);
    },
    mutationKey: ['verify', setSession, email, code],
  });

  const authenticate = () => {
    mutate({ email, code });
  };

  return {
    authenticate,
    isLoading: isPending,
    isSuccess: !isPending && isSuccess,
  };
}
