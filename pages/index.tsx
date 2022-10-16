import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

// HOOKS
import { useWallet } from "hooks/useWallet";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { signWithWallet, connectWallet } = useWallet();
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            await connectWallet();
            const signRes = await signWithWallet();

            await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    message: signRes?.message as string,
                    signature: signRes?.signature as string,
                },
                body: JSON.stringify({
                    address: signRes?.account as string,
                }),
            });

            sessionStorage.setItem("auth-app-session", "true");
            setIsLoading(false);
            router.push("/profile");

        } catch (error: any) {
            setIsLoading(false);
            setError(error?.message || "Internal Server Error");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <p className={"text-red-600 text-sm font-semibold"}>{error}</p>
                <button
                    type="submit"
                    className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSignIn}
                    disabled={isLoading}
                >
                    { isLoading ? "Loading..." : "Continue with your wallet"}
                </button>
            </div>
        </div>
    );
};

export default Home;
