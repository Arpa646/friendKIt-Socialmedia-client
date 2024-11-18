/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "85401385414-h4m4eicsvahull3tvap3rhfqmd89tgsl.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        if (!profile || !account) {
          return false;
        }

        if (account.provider === "google") {
          // Custom login logic
          console.log("User signed in with Google:", profile);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "your-secret-key", // Replace with a proper secret
});

export { handler as GET, handler as POST };
