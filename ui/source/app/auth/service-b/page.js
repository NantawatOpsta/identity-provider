import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function ServiceB() {
    const data = await getData();
    return (
        <div>
            <h1 className="font-bold text-xl">Service B</h1>
            <div className="mt-2">
                <div className="font-bold">Respons Data From Service B</div>
                {JSON.stringify(data)}
            </div>
        </div>
    );
}

async function getData() {
    const session = await getServerSession(authOptions);
    const res = await fetch("http://service-b:3000/api/data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
