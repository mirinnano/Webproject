// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@admin.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // 固定のメールアドレスとパスワードで認証
                if (
                    credentials?.email === "admin@admin.com" &&
                    credentials?.password === "mirin2324"
                ) {
                    return { id: "1", name: "Admin", email: "admin@admin.com" };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET, // ランダムな文字列を設定
});

export { handler as GET, handler as POST };
