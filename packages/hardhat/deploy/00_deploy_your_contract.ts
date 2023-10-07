import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import tokensConfig from "../../nextjs/tokens.config";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const signer = await hre.ethers.getSigner(deployer);

  const ownerAddress = deployer;
  const frontendAddress = "0x92C8Fd39A4582E6Fe8bb5Be6e7Fdf6533566EA69";

  const salt = await deploy("SaltToken", {
    from: deployer,
    args: [ownerAddress],
    log: true,
    autoMine: true,
  });

  const tokens = tokensConfig;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    await deploy(token.contractName, {
      from: deployer,
      args: [token.name, token.emoji, ownerAddress],
      log: true,
      autoMine: true,
      contract: "FruitToken",
    });
  }

  const eventSBT = await deploy("EventSBT", {
    from: deployer,
    // Contract constructor arguments
    args: [ownerAddress, salt.address],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const saltContract = await hre.ethers.getContract("SaltToken", deployer);

  const tokensContracts = [];

  for (let i = 0; i < tokens.length; i++) {
    tokensContracts.push(await hre.ethers.getContract(tokens[i].contractName, deployer));
  }

  await saltContract.grantRole(
    hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("MINTER_ROLE")),
    eventSBT.address,
  );

  const disperseFunds = await deploy("DisperseFunds", {
    from: deployer,
    args: [salt.address],
    log: true,
    autoMine: true,
  });

  const disperseFundsContract = await hre.ethers.getContract("DisperseFunds", deployer);

  await disperseFundsContract.grantRole(
    hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("DISPENSER_ROLE")),
    frontendAddress,
  );

  await saltContract.transfer(disperseFunds.address, hre.ethers.utils.parseEther("10000"));

  const sendXDai = await signer.sendTransaction({
    to: disperseFunds.address,
    value: hre.ethers.utils.parseEther("1"),
  });
  sendXDai.wait();

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const dex = await deploy(`BasicDex${token.name}`, {
      from: deployer,
      args: [salt.address, tokensContracts[i].address],
      log: true,
      autoMine: true,
      contract: "BasicDex",
    });

    const dexContract = await hre.ethers.getContractAt("BasicDex", dex.address, deployer);

    await saltContract.approve(dex.address, hre.ethers.constants.MaxUint256);
    await tokensContracts[i].approve(dex.address, hre.ethers.constants.MaxUint256);

    await dexContract.init(hre.ethers.utils.parseEther("100"));
  }
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["GameWallet"];
