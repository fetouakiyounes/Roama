import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { authConfig } from "@/auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                await dbConnect()

                try {
                    const user = await User.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error("User not found.")
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid credentials.")
                    }

                    return user
                } catch (error) {
                    return null
                }
            },
        }),
    ],
})
