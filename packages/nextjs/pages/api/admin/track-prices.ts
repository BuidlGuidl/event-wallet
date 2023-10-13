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

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const contractDexName: ContractName = `BasicDex${token.name}` as ContractName;
    const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[0]?.contracts?.[
      contractDexName
    ] as Contract<ContractName>;
    const dexContract = new ethers.Contract(deployedContract.address, deployedContract.abi, provider);

    const price = await dexContract.assetOutPrice(ethers.utils.parseEther("1"));

    const priceFormatted = ethers.utils.formatEther(price.sub(price.mod(1e14)));

    tokensData[token.name] = { price, priceFormatted };

    const key = `${token.name}:price`;

    console.log("key", key);

    await kv.zadd(key, { score: Date.now(), member: `${Date.now()}-${priceFormatted}` });
  }

  const tokenContracts: ethers.Contract[] = [];

  const tokensConfig = [scaffoldConfig.saltToken].concat(scaffoldConfig.tokens);

  for (let i = 0; i < tokensConfig.length; i++) {
    const token = tokensConfig[i];

    const contractTokenName: ContractName = token.contractName as ContractName;
    const deployedTokenContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[0]?.contracts?.[
      contractTokenName
    ] as Contract<ContractName>;

    const tokenContract = new ethers.Contract(deployedTokenContract.address, deployedTokenContract.abi, provider);
    tokenContracts.push(tokenContract);
  }

  const addresses = await kv.smembers("users:checkin");

  // await kv.del("tokenLeaderboard");

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    let balance = BigNumber.from(0);
    for (let j = 0; j < tokensConfig.length; j++) {
      const token = tokensConfig[j];
      const tokenName = token.name;
      const tokenBalance: BigNumber = await tokenContracts[j].balanceOf(address);
      if (tokenBalance.isZero()) continue;
      if (tokenName !== "Salt") {
        const saltBalance: BigNumber = tokenBalance.mul(tokensData[tokenName].price).div(ethers.utils.parseEther("1"));
        balance = balance.add(saltBalance);
      } else {
        balance = balance.add(tokenBalance);
      }
    }
    const balanceFormatted = ethers.utils.formatEther(balance.sub(balance.mod(1e14)));
    const balanceNumber = Number(balanceFormatted) * 10000;
    await kv.zadd("tokenLeaderboard", { score: balanceNumber, member: address });
  }

  res.status(200).json(tokensData);
}
