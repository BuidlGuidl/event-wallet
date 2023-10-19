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
  const dexOwner = "0xEC1A970311702f3d356eB010A500EE4B5ab5C3Bb";
  const dispenserOwner = dexOwner;
  const dexPausers = [
    dexOwner,
    "0xd6f85d9d79E3a87eCFe98d907495f85Fb6DAF74f", //Damu
    "0xD26536C559B10C5f7261F3FfaFf728Fe1b3b0dEE", //Damu
    "0x6CE015E312e7240e85323A2a506cbD799534aB68", //Toady
    "0xD26536C559B10C5f7261F3FfaFf728Fe1b3b0dEE", //Toady
    "0xA7430Da2932cf53B329B4eE1307edb361B5852ea", //Austin
    "0x9312Ead97CD5cfDd43EEd47261FB69081e2e17c3", //Austin
  ];
  const dispersers = dexPausers;
  const minters = dexPausers;

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

  await deploy("EventSBT", {
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

  for (let i = 0; i < minters.length; i++) {
    await saltContract.grantRole(hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("MINTER_ROLE")), minters[i]);
  }

  for (let i = 0; i < tokens.length; i++) {
    for (let i = 0; i < minters.length; i++) {
      await tokensContracts[i].grantRole(
        hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("MINTER_ROLE")),
        minters[i],
      );
    }
  }

  const disperseFunds = await deploy("DisperseFunds", {
    from: deployer,
    args: [salt.address],
    log: true,
    autoMine: true,
  });

  const disperseFundsContract = await hre.ethers.getContract("DisperseFunds", deployer);

  for (let i = 0; i < dispersers.length; i++) {
    await disperseFundsContract.grantRole(
      hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("DISPENSER_ROLE")),
      dispersers[i],
    );
  }

  if (dispenserOwner !== deployer) {
    await disperseFundsContract.transferOwnership(dispenserOwner);
  }

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

    await dexContract.init(hre.ethers.utils.parseEther("2"));

    for (let i = 0; i < dexPausers.length; i++) {
      await dexContract.grantRole(
        hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("PAUSER_ROLE")),
        dexPausers[i],
      );
    }

    if (dexOwner !== deployer) {
      await dexContract.transferOwnership(dexOwner);
    }
  }
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["GameWallet"];
