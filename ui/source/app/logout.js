"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <div className="py-0.5">
            <div
                className="hover:font-bold border-b border-gray-400 w-full block py-1"
                onClick={() => signOut()}
            >
                Logout
            </div>
        </div>
    );
}
