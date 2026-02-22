import { useMutation } from '@tanstack/react-query';
import { AuthApi } from './authApi';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

type UseAuthParams = {
  email: string;
  navigation: StackNavigationProp<AuthStackParamList, Paths.Auth, undefined>;
};

type UseAuthReturnType = {
  authenticate: () => void;
  isLoading: boolean;
  isSuccess: boolean;
};

export function useAuth({
  email,
  navigation,
}: UseAuthParams): UseAuthReturnType {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (email: string) => AuthApi.auth(email),
    onSuccess: () => navigation.navigate(Paths.AuthVerify, { email }),
  });

  const authenticate = () => {
    mutate(email);
  };

  return {
    authenticate,
    isLoading: isPending,
    isSuccess: !isPending && isSuccess,
  };
}
