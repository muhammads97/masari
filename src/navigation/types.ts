import type { StackScreenProps } from '@react-navigation/stack'
import type { Paths } from '@/navigation/paths'

/**
 * Root navigator
 * Decides between:
 * - Startup (initial restore)
 * - Auth stack
 * - App (logged-in) stack
 */
export type RootStackParamList = {
  [Paths.Startup]: undefined
  AuthStack: undefined
  AppStack: undefined
}

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>

/**
 * Auth (unauthenticated) stack
 */
export type AuthStackParamList = {
  [Paths.Auth]: undefined
  [Paths.AuthVerify]: {
    email?: string
  }
}

export type AuthScreenProps<
  S extends keyof AuthStackParamList = keyof AuthStackParamList,
> = StackScreenProps<AuthStackParamList, S>

/**
 * App (authenticated) stack
 */
export type AppStackParamList = {
  [Paths.Chat]: undefined
  [Paths.History]: undefined
}

export type AppScreenProps<
  S extends keyof AppStackParamList = keyof AppStackParamList,
> = StackScreenProps<AppStackParamList, S>
