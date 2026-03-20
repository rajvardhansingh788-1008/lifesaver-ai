const hre = require("hardhat");

async function main() {
  console.log("Deploying LifeSaverCoin...");

  const LifeSaverCoin = await hre.ethers.deployContract("LifeSaverCoin");
  await LifeSaverCoin.waitForDeployment();

  console.log(`LifeSaverCoin deployed to: ${LifeSaverCoin.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
