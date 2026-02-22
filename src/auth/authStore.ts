import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthStatus } from './types';
import { Session } from '@/hooks/domain/auth/schema';

type AuthState = {
  status: AuthStatus;
  session: Session | null;

  setSession: (session: Session) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: 'loading',
      session: null,

      setSession: (session) =>
        set({
          session,
          status: 'authenticated',
        }),

      clearSession: () =>
        set({
          session: null,
          status: 'unauthenticated',
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        session: state.session,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // ⬇ capture set via store API
        const setState = useAuthStore.setState;

        setTimeout(() => {
          setState({
            status: state.session ? 'authenticated' : 'unauthenticated',
          });
        });
      },
    },
  ),
);
