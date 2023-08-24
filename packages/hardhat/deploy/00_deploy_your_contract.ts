import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

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

  const ownerAddress = deployer;

  await deploy("EventAliases", {
    from: deployer,
    // Contract constructor arguments
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const salt = await deploy("SaltToken", {
    from: deployer,
    args: [ownerAddress],
    log: true,
    autoMine: true,
  });

  const avocado = await deploy("AvocadoToken", {
    from: deployer,
    args: [ownerAddress],
    log: true,
    autoMine: true,
  });

  const banana = await deploy("BananaToken", {
    from: deployer,
    args: [ownerAddress],
    log: true,
    autoMine: true,
  });

  const tomato = await deploy("TomatoToken", {
    from: deployer,
    args: [ownerAddress],
    log: true,
    autoMine: true,
  });

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
  const avocadoContract = await hre.ethers.getContract("AvocadoToken", deployer);
  const bananaContract = await hre.ethers.getContract("BananaToken", deployer);
  const tomatoContract = await hre.ethers.getContract("TomatoToken", deployer);

  await saltContract.grantRole(
    hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("MINTER_ROLE")),
    eventSBT.address,
  );

  const avocadoDex = await deploy("BasicDex", {
    from: deployer,
    args: [salt.address, avocado.address],
    log: true,
    autoMine: true,
  });

  const bananaDex = await deploy("BasicDex", {
    from: deployer,
    args: [salt.address, banana.address],
    log: true,
    autoMine: true,
  });

  const tomatoDex = await deploy("BasicDex", {
    from: deployer,
    args: [salt.address, tomato.address],
    log: true,
    autoMine: true,
  });

  const avocadoDexContract = await hre.ethers.getContractAt("BasicDex", avocadoDex.address, deployer);
  const bananaDexContract = await hre.ethers.getContractAt("BasicDex", bananaDex.address, deployer);
  const tomatoDexContract = await hre.ethers.getContractAt("BasicDex", tomatoDex.address, deployer);

  await saltContract.approve(avocadoDex.address, hre.ethers.constants.MaxUint256);
  await saltContract.approve(bananaDex.address, hre.ethers.constants.MaxUint256);
  await saltContract.approve(tomatoDex.address, hre.ethers.constants.MaxUint256);

  await avocadoContract.approve(avocadoDex.address, hre.ethers.constants.MaxUint256);
  await bananaContract.approve(bananaDex.address, hre.ethers.constants.MaxUint256);
  await tomatoContract.approve(tomatoDex.address, hre.ethers.constants.MaxUint256);

  await avocadoDexContract.init(hre.ethers.utils.parseEther("100"));
  await bananaDexContract.init(hre.ethers.utils.parseEther("100"));
  await tomatoDexContract.init(hre.ethers.utils.parseEther("100"));

  await deploy("CongratsVIPLounge", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["EventGems"];
