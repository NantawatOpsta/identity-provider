"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";


export default function ServiceA() {
    const { data: session } = useSession();
    const token = session.accessToken;

    const fetcher = (url) => fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json());

    const { data, error, isLoading } = useSWR("http://localhost:8001/api/data", fetcher);

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    return (
        <div>
            <h1 className="font-bold text-xl">Service A</h1>
            <div className="mt-2">
                <div className="font-bold">Respons Data From Service A</div>
                {JSON.stringify(data)}
            </div>
        </div>
    );
}
