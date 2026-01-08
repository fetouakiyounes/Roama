"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const PropertyCard = ({ property }) => {
    // Placeholder image if array is empty or fails
    const imageUrl = property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <Link href={`/properties/${property._id}`}>
                <div className="relative h-64 w-full">
                    <Image
                        src={imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide text-white ${property.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                            {property.type === 'sale' ? 'A Vendre' : 'A Louer'}
                        </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded shadow text-sm font-bold text-gray-800">
                        {property.price.toLocaleString()} MAD
                    </div>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{property.propertyType}</p>
                    <p className="text-sm text-gray-500">{property.location.city}</p>
                </div>

                <Link href={`/properties/${property._id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate hover:text-[#ED6C63] transition-colors">
                        {property.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-4 text-gray-600 text-sm mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <span>🛏️ {property.bedrooms}</span> <span className="hidden sm:inline">Chambres</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>🚿 {property.bathrooms}</span> <span className="hidden sm:inline">SDB</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>📏 {property.area}</span> <span className="hidden sm:inline">m²</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
