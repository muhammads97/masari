import { useMutation } from '@tanstack/react-query';
import { AuthApi } from './authApi';

type UseAuthResendParams = {
  email: string;
};

type UseAuthResendReturnType = {
  resend: () => void;
  isLoading: boolean;
  isSuccess: boolean;
};

export function useAuthResend({
  email,
}: UseAuthResendParams): UseAuthResendReturnType {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (email: string) => AuthApi.auth(email),
  });

  const resend = () => {
    mutate(email);
  };

  return {
    resend,
    isLoading: isPending,
    isSuccess: !isPending && isSuccess,
  };
}
