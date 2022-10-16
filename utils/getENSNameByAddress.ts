import {ethers} from "ethers";

export const getENSNameByAddress = async (address: string) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ETH_RPC_URL || 'https://goerli.infura.io/v3/0633996eda2b45f3b5359bf54f7956d4'
        );
        return provider.lookupAddress(address);
    } catch (err: any) {
        throw err;
    }
}