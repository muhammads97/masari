import { useMutation } from '@tanstack/react-query';
import { AuthApi } from './authApi';
import { useAuthStore } from '@/auth/authStore';

type UseAuthProviderReturnType = {
  getToken: () => Promise<string>;
  isRefreshing: boolean;
};

const REFRESH_BUFFER_MS = 30_000; // 30s safety buffer

export function useAuthProvider(): UseAuthProviderReturnType {
  const { session, setSession, clearSession } = useAuthStore();

  const { mutateAsync: refreshToken, isPending } = useMutation({
    mutationFn: (refreshToken: string) => AuthApi.authRefresh(refreshToken),
  });

  const getToken = async (): Promise<string> => {
    if (!session) {
      clearSession();
      return Promise.reject(new Error('No session'));
    }

    const now = Date.now();
    const expiresAtMs = Date.parse(session.expiresAt);

    // Defensive: invalid date
    if (Number.isNaN(expiresAtMs)) {
      clearSession();
      return Promise.reject(new Error('Invalid expiresAt'));
    }

    // Still valid → return immediately
    if (expiresAtMs - REFRESH_BUFFER_MS > now) {
      return session.accessToken;
    }

    // Expired or about to expire → refresh
    try {
      const newSession = await refreshToken(session.refreshToken);

      // newSession.expiresAt must also be ISO
      setSession(newSession);
      return newSession.accessToken;
    } catch (error) {
      clearSession();
      return Promise.reject(error);
    }
  };

  return {
    getToken,
    isRefreshing: isPending,
  };
}
