import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { createClient } from "@supabase/supabase-js";

// UTILS
import { getENSNameByAddress } from "utils/getENSNameByAddress";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const supabaseUrl = process.env.SUPABASE_PROJECT_URL as string;
        const supabaseKey = process.env.SUPABASE_API_KEY as string;

        if (req.method !== "POST")
            return res.status(405).json({ message: "Method not allowed" });
        const { address } = req.body;
        const { message, signature } = req.headers;

        const web3 = new Web3(
            new Web3.providers.HttpProvider(process.env.RPC as string)
        );
        const addressFromSignature = web3.eth.accounts.recover(
            message as string,
            signature as string
        );

        if (addressFromSignature.toLowerCase() !== address.toLowerCase())
            return res.status(401).json({ message: "Invalid Signature" });

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("address", address.toLowerCase());

        if (user?.length) return res.status(200).json({ user });

        const ensName = await getENSNameByAddress(address);
        const { data: newUser } = await supabase
            .from("users")
            .insert([{ address: `${address}`.toLowerCase(), ens: ensName }]);

        return res.status(200).json({ user: newUser });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ statusCode: 500, message: err.message });
    }
}
