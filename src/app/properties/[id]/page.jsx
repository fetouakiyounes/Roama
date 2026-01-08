"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // Add Image import
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PropertyDetailsPage() {
    const params = useParams();
    const { data: session } = useSession();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    // Contact Form State
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "Bonjour, je suis intéressé par ce bien."
    });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (params.id) {
            fetchProperty(params.id);
        }
        if (session?.user) {
            setContactForm(prev => ({
                ...prev,
                name: session.user.name || "",
                email: session.user.email || ""
            }));
        }
    }, [params.id, session]);

    const fetchProperty = async (id) => {
        try {
            // Re-using the listings API for now, but ideally we'd have a specific endpoint
            // or just use the same one if filter properly.
            // Actually, let's create a specific fetch or just filter client side if the API supports ID
            // Ideally we need GET /api/properties/[id]
            const res = await fetch(`/api/properties/${id}`);
            if (res.ok) {
                const data = await res.json();
                setProperty(data);
            } else {
                console.error("Failed to fetch property");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError("");

        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...contactForm,
                    propertyId: property._id,
                    date: new Date(), // Requesting for "now" or generic inquiry
                    // Reservation model expects date, maybe we should make it optional or just send today
                })
            });

            if (res.ok) {
                setSuccess(true);
                setContactForm(prev => ({ ...prev, message: "" }));
            } else {
                setError("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (err) {
            setError("Erreur de connexion.");
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ED6C63]"></div></div>;
    if (!property) return <div className="min-h-screen flex items-center justify-center">Bien introuvable.</div>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            {/* Gallery Section */}
            <div className="bg-black relative h-[400px] md:h-[500px]">
                {/* Main Image */}
                <div className="w-full h-full relative">
                    <Image
                        src={property.images[activeImage]}
                        alt={property.title}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Thumbnails (absolute bottom) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
                    {property.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={`w-16 h-16 relative border-2 ${activeImage === idx ? 'border-[#ED6C63]' : 'border-white/50'} rounded overflow-hidden flex-shrink-0`}
                        >
                            <Image src={img} alt={`View ${idx}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                    <p className="text-gray-500 text-lg flex items-center gap-2">
                                        📍 {property.location.address}, {property.location.city}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#ED6C63]">{property.price.toLocaleString()} MAD</div>
                                    <div className="text-sm text-gray-500">{property.type === 'sale' ? 'A Vendre' : 'A Louer'}</div>
                                </div>
                            </div>

                            <div className="flex gap-6 border-t border-b py-6 my-6 text-gray-700">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-xl">{property.bedrooms}</span>
                                    <span className="text-sm text-gray-500">Chambres</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-xl">{property.bathrooms}</span>
                                    <span className="text-sm text-gray-500">SDB</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-xl">{property.area} m²</span>
                                    <span className="text-sm text-gray-500">Surface</span>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold mb-4 text-gray-800">Description</h2>
                            <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                                {property.description}
                            </p>

                            <h2 className="text-xl font-bold mb-4 text-gray-800">Caractéristiques</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {property.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                                        ✅ {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 border-t-4 border-[#ED6C63]">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Contacter l'annonceur</h3>

                            {success ? (
                                <div className="bg-green-100 text-green-700 p-4 rounded text-center">
                                    <p className="font-bold mb-2">Message envoyé !</p>
                                    <p className="text-sm">L'annonceur vous recontactera bientôt.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder="Votre Nom"
                                        className="w-full border rounded px-3 py-2"
                                        value={contactForm.name}
                                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Votre Email"
                                        className="w-full border rounded px-3 py-2"
                                        value={contactForm.email}
                                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Votre Téléphone"
                                        className="w-full border rounded px-3 py-2"
                                        value={contactForm.phone}
                                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Message"
                                        className="w-full border rounded px-3 py-2 h-32"
                                        value={contactForm.message}
                                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                        required
                                    ></textarea>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <button
                                        type="submit"
                                        className="w-full bg-[#ED6C63] text-white font-bold py-3 rounded hover:bg-[#fa8e86] transition-colors disabled:opacity-50"
                                        disabled={sending}
                                    >
                                        {sending ? "Envoi..." : "Envoyer le message"}
                                    </button>
                                </form>
                            )}

                            <p className="text-xs text-center text-gray-400 mt-4">
                                En envoyant ce formulaire, vous acceptez nos conditions générales d'utilisation.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
