const ethers = require('ethers');
const hre = require("hardhat");
const fs = require('fs');

console.log(process.env);

let ipfs = process.env.IPFSLINK;
let userTokens = process.env.TOKENS;

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')

const userPublicKey = process.env.USERPUBLIC
const userPrivateKey = process.env.USERPRIVATE
const wallet = new ethers.Wallet(userPrivateKey, provider)
const metadataNFT = JSON.parse(fs.readFileSync('./artifacts/contracts/NFT.sol/NFT.json'))
const metadataTokens = JSON.parse(fs.readFileSync('./artifacts/contracts/trade.sol/HandpickedToken.json'))


async function main() {    
    const NFTfactory = new ethers.ContractFactory(metadataNFT.abi, metadataNFT.bytecode, wallet)

    const NFTcontract = await NFTfactory.deploy(
        userPublicKey,
        ipfs
    )

    const Tokenfactory = new ethers.ContractFactory(metadataTokens.abi, metadataTokens.bytecode, wallet)

    const TokenContract = await Tokenfactory.deploy(
        100000000, 
        50,
        userTokens
    )

    console.log(await NFTcontract.baseUri(), await TokenContract.balanceOf(userPublicKey))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
