import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/models/Property";

// Dummy Data
const dummyProperties = [
    {
        title: "Appartement moderne au centre-ville",
        description: "Superbe appartement de 2 chambres avec vue sur la ville. Proche de toutes commodités.",
        price: 1500000,
        location: {
            city: "Casablanca",
            address: "Maarif, Casablanca",
            lat: 33.5898,
            lng: -7.6038,
        },
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"],
        type: "sale",
        propertyType: "Appartement",
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        features: ["Ascenseur", "Balcon", "Cuisine équipée"],
        isFeatured: true,
    },
    {
        title: "Villa luxueuse avec piscine",
        description: "Magnifique villa de 4 chambres avec grand jardin et piscine privée.",
        price: 4500000,
        location: {
            city: "Marrakech",
            address: "Palmeraie, Marrakech",
            lat: 31.6295,
            lng: -7.9811,
        },
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"],
        type: "sale",
        propertyType: "Villa",
        bedrooms: 4,
        bathrooms: 3,
        area: 350,
        features: ["Piscine", "Jardin", "Garage", "Climatisation"],
        isFeatured: true,
    },
    {
        title: "Studio confortable quartier Agdal",
        description: "Idéal pour étudiant ou jeune couple. Studio meublé et bien situé.",
        price: 4500,
        location: {
            city: "Rabat",
            address: "Agdal, Rabat",
            lat: 34.0041,
            lng: -6.8488,
        },
        images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"],
        type: "rent",
        propertyType: "Studio",
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        features: ["Meublé", "Wifi", "Proche tramway"],
        isFeatured: false,
    },
    {
        title: "Duplex vue mer",
        description: "Duplex exceptionnel avec terrasse panoramique sur l'océan.",
        price: 2800000,
        location: {
            city: "Tanger",
            address: "Malabata, Tanger",
            lat: 35.7758,
            lng: -5.7960,
        },
        images: ["https://images.unsplash.com/photo-1512918760532-3edbed722b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"],
        type: "sale",
        propertyType: "Appartement",
        bedrooms: 3,
        bathrooms: 2,
        area: 140,
        features: ["Vue mer", "Terrasse", "Parking"],
        isFeatured: true,
    },
    {
        title: "Maison traditionnelle rénovée",
        description: "Riad charmant au coeur de la médina, entièrement rénové.",
        price: 18000,
        location: {
            city: "Fès",
            address: "Médina, Fès",
            lat: 34.0181,
            lng: -5.0078,
        },
        images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"],
        type: "rent",
        propertyType: "Maison",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        features: ["Patio", "Fontaine", "Terrasse sur toit"],
        isFeatured: false,
    },
];

export const GET = async () => {
    try {
        await dbConnect();

        // Check if properties exist to avoid duplicates if re-run
        const count = await Property.countDocuments();
        if (count > 0) {
            return new NextResponse(JSON.stringify({ message: "Database already seeded", count }), { status: 200 });
        }

        await Property.insertMany(dummyProperties);

        return new NextResponse(JSON.stringify({ message: "Database seeded successfully", count: dummyProperties.length }), { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
