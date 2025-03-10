import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;  // ✅ Add role to session
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string; // ✅ Add role to User
  }

  interface JWT extends DefaultJWT {
    role: string; // ✅ Add role to JWT
  }
}
