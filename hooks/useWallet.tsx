import { useCallback, useState } from "react";

// This Hook will be used to handle certain tasks that involves wallets such as connecting to a wallet,
// disconnecting from a wallet, getting the current wallet address, etc.

export function useWallet() {

    const connectWallet = useCallback(async () => {
        if (typeof window?.ethereum !== "undefined") {

            const account = await window?.ethereum.request({
                method: "eth_requestAccounts",
            });
            return true;
        }
        return false;
    }, []);

    const signWithWallet = useCallback(async () => {

        if(typeof window?.ethereum !== 'undefined') {
            try {
                const ethers = require('ethers')
                const provider = new ethers.providers.Web3Provider(window?.ethereum)
                const signer = provider.getSigner();
                const message = Date.now().toString();
                const messageHash = ethers.utils.hashMessage(message);
                const signature = await signer.signMessage(messageHash);
                const accounts = await signer.getAddress();
                return { signature, account: accounts };
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }, []);

    return { signWithWallet, connectWallet };
}