import {ethers} from "ethers";

export const getENSNameByAddress = async (address: string) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_ETH_RPC_URL
        );

        const ensName = await provider.lookupAddress(address);

        if(ensName){
            // reverse verification of the name
            const reverseAddress = await provider.resolveName(ensName as string);
            if(reverseAddress === address){
                return ensName;
            }
        }
        return null;
    } catch (err: any) {
        throw err;
    }
}