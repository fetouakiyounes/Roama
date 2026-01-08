import Reservation from "@/models/Reservation";
import dbConnect from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    try {
        const reservations = await Reservation.find().sort({ date: 1 });
        return new NextResponse(JSON.stringify(reservations), { status: 200 });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();
    const session = await auth();

    await dbConnect();

    const newReservation = new Reservation({
        ...body,
        userId: session?.user?.id, // Optional link to user if logged in
    });

    try {
        await newReservation.save();
        return new NextResponse("Reservation has been created", { status: 201 });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
};
