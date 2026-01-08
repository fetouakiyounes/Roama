"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.status === 400) {
                setError("This email is already registered");
            } else if (res.status === 200) {
                setError("");
                router.push("/login");
            } else {
                setError("Error, try again");
            }
        } catch (error) {
            setError("Error, try again");
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-[#212121] p-8 rounded shadow-md w-96">
                <h1 className="text-4xl text-center font-semibold mb-8 text-white">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        className="w-full border border-gray-300 text-black bg-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full border border-gray-300 text-black bg-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 text-black bg-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
                <div className="text-center mt-4 text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
