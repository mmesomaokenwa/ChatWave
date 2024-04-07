import NextAuth from "next-auth/next";

const handler = NextAuth({
  providers: [],
  pages: {}
})

export {handler as GET, handler as POST}