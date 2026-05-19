import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnProtectedRoute =
                nextUrl.pathname.startsWith('/dashboard') ||
                nextUrl.pathname.startsWith('/habits') ||
                nextUrl.pathname.startsWith('/history');

            if (isOnProtectedRoute) {
                return isLoggedIn;
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        }
    },
    providers: [],
} satisfies NextAuthConfig;