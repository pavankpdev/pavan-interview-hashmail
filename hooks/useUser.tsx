import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import {useRouter} from 'next/router'

export function useUser() {
    const [profile, setProfile] = useState({
        address: "",
        ensName: "",
    });

    const router = useRouter()

    const getUserProfile = useCallback(async () => {
        if (typeof window.ethereum !== "undefined") {
            if (!sessionStorage.getItem('auth-app-session')) return;
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            try {
                const res = await fetch(`/api/user?address=${account[0]}`);
                const { user } = await res.json();
                console.log(user);
                setProfile({
                    address: user[0].address,
                    ensName: user[0].ens,
                })
            } catch (err) {
                throw err
            }
        }
    }, [router.pathname])

    useEffect(() => {
        getUserProfile()
    }, [getUserProfile]);


    const logout = () => {
        setProfile({address: "", ensName: ""})
    }

    return { profile, logout };
}