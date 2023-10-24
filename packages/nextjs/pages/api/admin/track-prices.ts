import { kv } from "@vercel/kv";
import { BigNumber, ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import scaffoldConfig from "~~/scaffold.config";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { Contract, ContractName, contracts } from "~~/utils/scaffold-eth/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Add signature verification or secret key

  const tokens = scaffoldConfig.tokens;
  const tokensData: { [key: string]: { price: BigNumber; priceFormatted: string } } = {};

  const targetNetwork = getTargetNetwork();

  const rpcUrl = targetNetwork.rpcUrls.default.http[0];

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const dexContractsAddresses = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const contractDexName: ContractName = `BasicDex${token.name}` as ContractName;
    const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[0]?.contracts?.[
      contractDexName
    ] as Contract<ContractName>;

    dexContractsAddresses.push(deployedContract.address);

    const dexContract = new ethers.Contract(deployedContract.address, deployedContract.abi, provider);

    const price = await dexContract.assetOutPrice(ethers.utils.parseEther("1"));

    const priceFormatted = ethers.utils.formatEther(price.sub(price.mod(1e14)));

    tokensData[token.name] = { price, priceFormatted };

    const key = `${token.name}:price`;

    console.log("key", key);

    await kv.zadd(key, { score: Date.now(), member: `${Date.now()}-${priceFormatted}` });
  }

  const addresses = await kv.smembers("users:checkin");

  const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[0]?.contracts?.[
    "CreditNwCalc"
  ] as Contract<ContractName>;

  const creditNwCalcContract = new ethers.Contract(deployedContract.address, deployedContract.abi, provider);

  const netWorths = await creditNwCalcContract.getNetWorths(addresses, dexContractsAddresses);

  console.log("netWorths", netWorths);

  const scoreMemberPairs = [];

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    const netWorth = netWorths[i];
    const balanceFormatted = ethers.utils.formatEther(netWorth.sub(netWorth.mod(1e14)));
    const balanceNumber = Number(balanceFormatted) * 10000;
    scoreMemberPairs.push({ score: balanceNumber, member: address });
  }

  await kv.del("tokenLeaderboard");

  // @ts-ignore TODO: Fix this
  await kv.zadd("tokenLeaderboard", ...scoreMemberPairs);

  res.status(200).json(tokensData);
}
