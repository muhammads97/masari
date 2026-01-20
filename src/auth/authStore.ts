import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { AuthStatus, User } from './types'

type AuthState = {
  status: AuthStatus
  user: User | null

  setUser: (user: User) => void
  clearUser: () => void
  restore: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      status: 'loading',
      user: null,

      setUser: (user) => {
        set({
          user,
          status: 'authenticated',
        })
      },

      clearUser: () => {
        set({
          user: null,
          status: 'unauthenticated',
        })
      },

      restore: async () => {
        const { user } = get()

        if (user) {
          set({ status: 'authenticated' })
        } else {
          set({ status: 'unauthenticated' })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),

      // Persist only what matters
      partialize: (state) => ({
        user: state.user,
      }),

      // Prevent hydration flicker
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          state.status = 'authenticated'
        } else if(state) {
          state.status = 'unauthenticated'
        }
      },
    }
  )
)