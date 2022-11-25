console.log(process.env)

const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const DWTContract = await hre.ethers.getContractFactory("DWT");
    const deployedDWT = await DWTContract.deploy();
    const result = await deployedDWT.deployed();
    console.log("Token address:", deployedDWT.address);
    fs.writeFileSync('token-id', deployedDWT.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});