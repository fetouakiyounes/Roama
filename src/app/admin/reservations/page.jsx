"use client";

import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const res = await fetch("/api/reservations");
            if (res.ok) {
                const data = await res.json();
                setReservations(data);
            } else {
                console.error("Failed to fetch reservations");
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this reservation?")) return;

        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setReservations(reservations.filter((res) => res._id !== id));
            } else {
                alert("Failed to delete reservation");
            }
        } catch (error) {
            console.error("Error deleting reservation:", error);
            alert("Error deleting reservation");
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setReservations(
                    reservations.map((res) =>
                        res._id === id ? { ...res, status: newStatus } : res
                    )
                );
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating status");
        }
    };

    if (loading) return <div className="p-8 text-center text-black">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            <AdminNav />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Reservations</h1>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Phone</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Property ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Message</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((res) => (
                                <tr key={res._id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        {new Date(res.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">{res.name}</td>
                                    <td className="py-3 px-4">{res.email}</td>
                                    <td className="py-3 px-4">{res.phone}</td>
                                    <td className="py-3 px-4">{res.propertyId}</td>
                                    <td className="py-3 px-4 truncate max-w-xs" title={res.message}>
                                        {res.message}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${res.status === "confirmed"
                                                    ? "bg-green-100 text-green-800"
                                                    : res.status === "cancelled"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        {res.status !== "confirmed" && (
                                            <button
                                                onClick={() => handleStatusChange(res._id, "confirmed")}
                                                className="text-green-600 hover:text-green-800 text-sm font-semibold"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        {res.status !== "cancelled" && (
                                            <button
                                                onClick={() => handleStatusChange(res._id, "cancelled")}
                                                className="text-orange-600 hover:text-orange-800 text-sm font-semibold"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(res._id)}
                                            className="text-red-600 hover:text-red-800 text-sm font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {reservations.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No reservations found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationsPage;
