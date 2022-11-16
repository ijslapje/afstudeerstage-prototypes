// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function deployContract() {
  const DiplomaNFT = await ethers.getContractFactory("DiplomaNFT")
  const exampleNFT = await DiplomaNFT.deploy()
  await exampleNFT.deployed()
  const txHash = exampleNFT.deployTransaction.hash
  const txReceipt = await ethers.provider.waitForTransaction(txHash)
  const contractAddress = txReceipt.contractAddress
  console.log("Contract deployed to address:", contractAddress)
 }
 
deployContract()
.then(() => process.exit(0))
.catch((error) => {
 console.error(error);
 process.exit(1);
});