import { kv } from "@vercel/kv";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import scaffoldConfig from "~~/scaffold.config";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { Contract, ContractName, contracts } from "~~/utils/scaffold-eth/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // TODO: Add signature verification or secret key

    const tokens = scaffoldConfig.tokens.slice(1);
    const tokensData: { [key: string]: string } = {};

    const targetNetwork = getTargetNetwork();

    const rpcUrl = targetNetwork.rpcUrls.default.http[0];

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      const contractDexName: ContractName = `BasicDex${token.name}` as ContractName;

      const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[0]?.contracts?.[
        contractDexName
      ] as Contract<ContractName>;

      const dexContract = new ethers.Contract(deployedContract.address, deployedContract.abi, provider);

      const price = await dexContract.assetOutPrice(ethers.utils.parseEther("1"));

      const priceFormatted = ethers.utils.formatEther(price.sub(price.mod(1e14)));

      tokensData[token.name] = priceFormatted;

      const key = `${token.name}:price`;

      console.log("key", key);

      await kv.zadd(key, { score: Date.now(), member: `${Date.now()}-${priceFormatted}` });
    }

    res.status(200).json(tokensData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
