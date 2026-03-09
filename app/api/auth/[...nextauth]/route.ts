import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        if (
          credentials?.email === "admin@test.com" &&
          credentials?.password === "1234"
        ) {
          return {
            id: "1003120052",
            name: "Nicol Lesly Mendoza Mattos",
            email: "admin@test.com"
          }
        }

        return null
      }
    })
  ],

  callbacks: {

    async jwt({ token, user }) {

      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }

      return token
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }

      return session
    }
  },

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }