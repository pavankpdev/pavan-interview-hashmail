import { NextPage } from "next"
import {useRouter} from 'next/router'
import { useEffect } from "react";

// HOOKS
import { useUser } from "hooks/useUser";

const Profile: NextPage = () => {

    const {profile, logout} = useUser()
    const router = useRouter()

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const auth = sessionStorage.getItem('auth-app-session')
            if(!auth) {
                router.push('/')
            }
        }
    }, [])

    const handleLogout = () => {
        logout()
        sessionStorage.removeItem('auth-app-session')
        router.push('/')
    }

    return (
        <div className="flex items-center justify-center h-screen">
        <div>
            <h2>Hey! Here&apos;s your</h2>
            <h1 className="text-lg font-semibold text-gray-600">Wallet Address: <span className={"text-xl font-bold text-black"}>{profile.address}</span> </h1>
            <h1 className="text-lg font-semibold text-gray-600">ENS Name: <span className={"text-xl font-bold text-black"}>{profile.ensName}</span></h1>
            <button
                className={"rounded-md border border-indigo-600 my-3 py-1 px-4 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
        </div>
    )
}

export default Profile
