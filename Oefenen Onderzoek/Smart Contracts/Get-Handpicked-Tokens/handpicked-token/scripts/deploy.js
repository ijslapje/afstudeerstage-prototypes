const hre = require("hardhat");

async function main() {
  const HandpickedToken = await hre.ethers.getContractFactory("HandpickedToken");
  const handpickedToken = await HandpickedToken.deploy(100000000, 50);

  await handpickedToken.deployed();

  console.log("Handpicked Token is deployed:", handpickedToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
