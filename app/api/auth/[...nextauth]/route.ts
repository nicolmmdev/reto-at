import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
            name: "Nicol Lesly",
            lastName: "Mendoza Mattos",
            email: "admin@test.com",
            documentType: "DNI",
            documentNumber: "76958900",
            birthDate: "1996-11-04",
            gender: "Femenino",
            phone: "957169140",
            country: "Perú",
            city: "San Juan de Lurigancho",
            address: "Avenida Piedra Luna"
          }

        }

        return null
      }
    })
  ],

  callbacks: {

    async jwt({ token, user }) {

      if (user) {
        Object.assign(token, user)
      }

      return token
    },

    async session({ session, token }) {

      if (session.user) {
        Object.assign(session.user, token)
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