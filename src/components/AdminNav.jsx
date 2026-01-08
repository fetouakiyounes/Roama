"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";

const AdminNav = () => {
    const pathname = usePathname();

    const links = [
        { href: "/admin/reservations", label: "Reservations" },
        // Add more admin links here
    ];

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex gap-6">
                <Link href="/admin/reservations" className="font-bold text-xl mr-4">
                    Admin Panel
                </Link>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`hover:text-gray-300 ${pathname === link.href ? 'text-blue-400 font-semibold' : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
                <button
                    onClick={() => signOut()}
                    className="text-red-400 hover:text-red-300 font-semibold ml-4"
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default AdminNav;
