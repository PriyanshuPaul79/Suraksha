
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs"; // FIXED: Correct package import
// import prisma from "@/lib/prisma";

// const handler = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Please enter an email and password");
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 });

//                 if (!user) {
//                     throw new Error("No user found with this email");
//                 }

//                 const passwordMatch = await bcrypt.compare(
//                     credentials.password,
//                     user.password
//                 );

//                 if (!passwordMatch) {
//                     throw new Error("Incorrect password");
//                 }

//                 return {
//                     id: user.id.toString(),
//                     email: user.email,
//                     name: user.name,
//                     role: user.role,
//                 };
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) token.role = user.role;
//             return token;
//         },
//         async session({ session, token }) {
//             if (session?.user) session.user.role = token.role;
//             return session;
//         },
//     },
//     pages: {
//         signIn: "/auth/signin",
//     },
//     session: {
//         strategy: "jwt",
//     },
// });

// export { handler as GET, handler as POST };



import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";
import { NextAuthOptions } from "next-auth"; // Ensure correct typing

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role, // ✅ Now properly typed
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // ✅ Type assertion ensures no TS error
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role; // ✅ Type is now correctly recognized
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
