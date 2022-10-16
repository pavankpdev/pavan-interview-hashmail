import {ethers} from "ethers";

export const getENSNameByAddress = async (address: string) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ETH_RPC_URL
        );
        return provider.lookupAddress(address);
    } catch (err: any) {
        throw err;
    }
}