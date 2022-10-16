import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { createClient } from "@supabase/supabase-js";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const supabaseUrl = process.env.SUPABASE_PROJECT_URL as string;
        const supabaseKey = process.env.SUPABASE_API_KEY as string;

        const { address } = req.query;

        const supabase = createClient(supabaseUrl, supabaseKey);
        console.log({address})
        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("address", (address as string).toLowerCase());

        return res.status(200).json({ user });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ statusCode: 500, message: err.message });
    }
}
