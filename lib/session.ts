import { auth } from "@/auth";

export async function requireAuth() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Não autorizado");
    }

    return session.user.id as string;
}