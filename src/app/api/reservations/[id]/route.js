import Reservation from "@/models/Reservation";
import dbConnect from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    const session = await auth();
    const { id } = params;
    const body = await request.json(); // Expecting { status: '...' }

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
        return new NextResponse(JSON.stringify(updatedReservation), { status: 200 });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const session = await auth();
    const { id } = params;

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    try {
        await Reservation.findByIdAndDelete(id);
        return new NextResponse("Reservation has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
};
