import { useCallback, useState } from "react";
import Web3 from "web3";

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
                const web3 = new Web3(window.ethereum);
                const message = Date.now().toString();
                const messageHash = web3.utils.sha3(message) as string
                const accounts = await web3.eth.getAccounts();
                const signature = await web3.eth.personal.sign(messageHash, accounts[0], "");

                return { signature, account: accounts[0], message: messageHash };
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }, []);

    return { signWithWallet, connectWallet };
}