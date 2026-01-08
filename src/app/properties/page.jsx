"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

export default function PropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: "",
        city: "",
        maxPrice: ""
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async (currentFilters = filters) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (currentFilters.type) params.append("type", currentFilters.type);
            if (currentFilters.city) params.append("city", currentFilters.city);
            if (currentFilters.maxPrice) params.append("maxPrice", currentFilters.maxPrice);

            const res = await fetch(`/api/properties?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setProperties(data);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProperties(filters);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            {/* Filter Section */}
            <section className="bg-white border-b py-8 px-4 shadow-sm">
                <div className="container mx-auto">
                    <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end justify-center">
                        <div className="w-full md:w-auto flex-1 max-w-xs">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Type de transaction</label>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#ED6C63] text-gray-700 bg-white"
                            >
                                <option value="">Tout</option>
                                <option value="sale">Acheter</option>
                                <option value="rent">Louer</option>
                            </select>
                        </div>

                        <div className="w-full md:w-auto flex-1 max-w-xs">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Ville</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Casablanca, Rabat..."
                                value={filters.city}
                                onChange={handleFilterChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#ED6C63] placeholder-gray-400 text-gray-700"
                            />
                        </div>

                        <div className="w-full md:w-auto flex-1 max-w-xs">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Prix Max (MAD)</label>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Budget max"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#ED6C63] placeholder-gray-400 text-gray-700"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#ED6C63] text-white font-bold py-2 px-6 rounded hover:bg-[#fa8e86] transition-colors h-[42px]"
                        >
                            Rechercher
                        </button>
                    </form>
                </div>
            </section>

            {/* Results Section */}
            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">Résultats de recherche</h1>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ED6C63]"></div>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">Aucun bien trouvé.</p>
                        <p className="mt-2">Essayez de modifier vos filtres.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
