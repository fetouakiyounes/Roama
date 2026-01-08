import User from "@/models/User";
import dbConnect from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { name, email, password } = await request.json();

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return new NextResponse("User has been created", {
            status: 200, // Fixed status
        });
    } catch (err) {
        console.error("Registration Error:", err);
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
