"use client";
import { signOut } from "next-auth/react";

export default function Logout({ keycloak }) {
    return (
        <div className="py-0.5">
            <div
                className="hover:font-bold border-b border-gray-400 w-full block py-1"
                onClick={() =>
                    signOut({
                        callbackUrl:
                            keycloak +
                            "/protocol/openid-connect/logout?post_logout_redirect_uri=" +
                            encodeURIComponent("http://localhost:8000") + "&client_id=web"
                    })
                }
            >
                Logout
            </div>
        </div>
    );
}
