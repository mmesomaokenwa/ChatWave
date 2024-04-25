import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./mongodb/actions/user.actions";

const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const data = await loginUser(credentials);
        if (!data) return null;

        return {
          id: data._id,
          name: data.name,
          email: data.email,
          profileImage: data.profileImage,
          username: data.username,
          bio: data.bio,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      } else if (user) {
        token.user = user
      }
      return token;
    },
    async session({ session, token, trigger, newSession }) {
      if (trigger === "update" && newSession?.user) {
        session.user = newSession.user
      } else {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
};

export default authOptions