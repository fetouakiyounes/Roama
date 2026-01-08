export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user._id
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role
                session.user.id = token.id
            }
            return session
        },
    },
}
