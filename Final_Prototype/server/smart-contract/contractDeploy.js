//Bestand deployed smart contracts
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

    //Maak factory NFT
    const NFTfactory = new ethers.ContractFactory(metadataNFT.abi, metadataNFT.bytecode, wallet)

    //Deploy smart contract met NFT naar de user en ipfs
    const NFTcontract = await NFTfactory.deploy(
        userPublicKey,
        ipfs
    )

    //Maak factory Handpicked Tokens
    const Tokenfactory = new ethers.ContractFactory(metadataTokens.abi, metadataTokens.bytecode, wallet)

    //Deploy smart contract met tokens naar de user en ipfs
    const TokenContract = await Tokenfactory.deploy(
        100000000, 
        50,
        userTokens
    )

    //Zet de tokens om in een leesbaar nummer
    let bigNumber = await TokenContract.balanceOf(userPublicKey);
    bigNumber = bigNumber/1000000000000000000;
    

    //Send NFT ipfs string en Aantal Handpicked Tokens
    console.log(JSON.stringify({ baseUri: await NFTcontract.baseUri(), tokenContract: bigNumber.toString() }))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
