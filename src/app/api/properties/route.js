import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/models/Property";

export const GET = async (request) => {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const city = searchParams.get("city");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        const query = {};

        if (type) query.type = type;
        if (city) query["location.city"] = { $regex: new RegExp(city, "i") }; // Case insensitive
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const properties = await Property.find(query).sort({ createdAt: -1 });

        return new NextResponse(JSON.stringify(properties), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
};

export const POST = async (request) => {
    // Admin only check ideally here
    try {
        await dbConnect();
        const body = await request.json();
        const newProperty = new Property(body);
        await newProperty.save();
        return new NextResponse(JSON.stringify(newProperty), { status: 201 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
