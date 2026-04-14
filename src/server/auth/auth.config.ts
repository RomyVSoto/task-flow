import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfigEdge = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return null // La lógica real vive en config.ts
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig