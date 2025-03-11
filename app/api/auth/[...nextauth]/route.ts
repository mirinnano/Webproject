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
                // 環境変数で設定した認証情報を使う
                const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com";
                const adminPassword = process.env.ADMIN_PASSWORD || "mirin2324";

                if (!adminEmail || !adminPassword) {
                    throw new Error("Admin credentials are not set in the environment variables.");
                }

                // メールアドレスとパスワードを比較
                if (
                    credentials?.email === adminEmail &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: adminEmail };
                }
                return null; // 認証失敗
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET, // secretを環境変数で設定
});

export { handler as GET, handler as POST };
