import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) return null;
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) return null;
                return { id: user.id, name: user.name, email: user.email };
            }
        })
    ],
})