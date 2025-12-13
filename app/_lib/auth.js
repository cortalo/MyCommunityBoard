import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  insertData,
  selectUserByEmail,
  updateUserImage,
  updateUserName,
} from "./UserMapper";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // This runs ONLY during sign in - perfect for user management!
      try {
        const existingUsers = await selectUserByEmail(user.email);

        if (existingUsers.length === 0) {
          // Create new user
          await insertData("users", {
            email: user.email,
            name: user.name,
            image: user.image,
          });
        } else {
          // Update existing user if data changed
          const existingUser = existingUsers[0];

          if (existingUser.name !== user.name) {
            await updateUserName("users", existingUser.id, user.name);
          }

          if (existingUser.image !== user.image) {
            await updateUserImage("users", existingUser.id, user.image);
          }
        }

        return true; // Allow sign in
      } catch (error) {
        console.error("❌ Sign in error:", error);
        return false; // Deny sign in on error
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        const users = await selectUserByEmail(user.email);
        if (users.length > 0) {
          token.userId = users[0].id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
