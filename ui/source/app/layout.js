import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import TokenProvider from "./token-provider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Web Services",
    description: "identity and access management",
};

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={inter.className}>
                <TokenProvider session={session}>
                    <div className="flex">
                        <div className="w-80 h-screen p-8 border-r border-gray-200 shadow-sm">
                            <img src="/opstella.svg" className="w-52 mb-3" />
                            <div className="text-xs text-gray-500 text-left font-bold mt-8 mb-2">
                                Web Services Navigation
                            </div>
                            <MenuLink title="Home" link="/" />
                            <MenuLink title="Service A" link="/auth/service-a" />
                            <MenuLink title="Service B" link="/auth/service-b" />
                            {session && 
                                <Logout keycloak={process.env.KEYCLOAK_ISSUER} />
                            }
                        </div>
                        <div className="flex-1 py-6 px-10 bg-gray-50 leading-7">{children}</div>
                    </div>
                </TokenProvider>
            </body>
        </html>
    );
}

function MenuLink({ title, link }) {
    return (
        <div className="py-0.5">
            <Link
                href={link}
                className="hover:font-bold border-b border-gray-400 w-full block py-1"
            >
                {title}
            </Link>
        </div>
    );
}
