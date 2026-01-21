import { useMutation } from '@tanstack/react-query';
import { AuthApi } from './authApi';
import { error } from 'console';
import { useEffect } from 'react';

type UseAuthParams = {
  email: string;
};

type UseAuthReturnType = {
  authenticate: () => void;
  isLoading: boolean;
  isSuccess: boolean;
};

export function useAuth({ email }: UseAuthParams): UseAuthReturnType {
  const { mutate, isPending, isSuccess, isError, isIdle, error } = useMutation({
    mutationFn: (email: string) => AuthApi.auth(email),
  });

  useEffect(() => {
    console.log(error);
  }, [error]);

  const authenticate = () => {
    mutate(email);
  };

  return {
    authenticate,
    isLoading: isPending,
    isSuccess: !isPending && isSuccess,
  };
}
