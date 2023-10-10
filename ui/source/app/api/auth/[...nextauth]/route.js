import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID,
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
            scope: "openid email profile roles",
        }),
    ],
    callbacks: {
        // https://next-auth.js.org/configuration/callbacks
        async signIn({ user, account, profile, email, credentials, exp, roles }) {
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.groups = profile.groups;
                token.preferred_username = profile.preferred_username;
            }
            return token;
        },
        //
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.groups = token.groups;
            session.user.preferred_username = token.preferred_username;

            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === "/api/auth/signin") {
                return Promise.resolve(baseUrl + "/logout");
            }
            return Promise.resolve(url);
        },
    },
    theme: {
        logo: "/opstella.svg",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
