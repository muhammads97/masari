export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type User = {
    email: string,
    token: string,
    refreshToken: string,
    tokenExp: number,
    refreshTokenExp: number
}
