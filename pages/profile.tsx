import { NextPage } from "next"

// HOOKS
import {useWallet} from "hooks/useWallet";

const Profile: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <div>
            <h2>Hey! Here's your</h2>
            <h1 className="text-2xl font-bold">Wallet Address: </h1>
            <h1 className="text-2xl font-bold">ENS Name: </h1>
            <button
                className={"rounded-md border border-indigo-600 my-3 py-1 px-4 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
            >
                Logout
            </button>
        </div>
        </div>
    )
}

export default Profile