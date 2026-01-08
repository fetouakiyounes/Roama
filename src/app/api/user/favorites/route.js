import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config"; // Use the config, but we need the full auth from src/auth.js for server-side
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export const POST = async (request) => {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { propertyId } = await request.json();

        if (!propertyId) {
            return new NextResponse("Property ID required", { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const isFavorite = user.favorites.includes(propertyId);

        if (isFavorite) {
            user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
        } else {
            user.favorites.push(propertyId);
        }

        await user.save();

        return new NextResponse(JSON.stringify({
            message: isFavorite ? "Removed from favorites" : "Added to favorites",
            isFavorite: !isFavorite,
            favorites: user.favorites
        }), { status: 200 });

    } catch (err) {
        console.error("Favorites API Error:", err);
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
};

export const GET = async () => {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return new NextResponse(JSON.stringify([]), { status: 200 }); // Return empty for guest
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });

        return new NextResponse(JSON.stringify(user?.favorites || []), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
