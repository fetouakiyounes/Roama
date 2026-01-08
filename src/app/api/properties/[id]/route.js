import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await dbConnect();
        const property = await Property.findById(id);

        if (!property) {
            return new NextResponse("Property not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(property), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
