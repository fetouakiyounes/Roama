"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function QuickViewModal({ property, onClose }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!property) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1 hover:bg-white text-gray-800"
                >
                    ✕
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <Image
                        src={property.images[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                        alt={property.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-sm font-bold shadow">
                        {property.price.toLocaleString()} MAD
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="mb-2">
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded text-white ${property.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                            {property.type === 'sale' ? 'A Vendre' : 'A Louer'}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">{property.location.city}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{property.title}</h2>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                        {property.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8 border-t border-b py-4">
                        <div className="text-center">
                            <span className="block font-bold text-lg text-gray-800">{property.bedrooms}</span>
                            <span className="text-xs text-gray-500">Chambres</span>
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-lg text-gray-800">{property.bathrooms}</span>
                            <span className="text-xs text-gray-500">SDB</span>
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-lg text-gray-800">{property.area} m²</span>
                            <span className="text-xs text-gray-500">Surface</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 flex gap-4">
                        <Link
                            href={`/properties/${property._id}`}
                            className="flex-1 bg-[#ED6C63] text-white text-center font-bold py-3 rounded hover:bg-[#fa8e86] transition-colors"
                        >
                            Voir détails complets
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
