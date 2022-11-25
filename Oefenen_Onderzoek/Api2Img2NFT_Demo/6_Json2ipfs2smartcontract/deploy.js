//TO RUN
//In een terminal (cd naar ./smart-contract) npx hardhat node
//Verander de account en private key naar de geliste blockchain
//Open andere terminal
//node deploy.js

//TO DO
//Express maken

import { createMetadata } from "./app.js"
import { declareTokens } from "./calTokens.js";
import { spawn } from "node:child_process";

const ipfs = await createMetadata()
const tokens = await declareTokens()


let link = JSON.stringify(ipfs)
let HPT = tokens
let userPublickey = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
let userPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

const contract = spawn('node', ['contractDeploy.js'], {
  env: {
    'IPFSLINK': link,
    'USERPUBLIC': userPublickey,
    'USERPRIVATE': userPrivateKey,
    'TOKENS': HPT
  },
  cwd: 'smart-contract/'
})
contract.stdout.on('data', (data) => console.log(`${data}`));
contract.stderr.on('data', (data) => console.log(`${data}`));
contract.on('close', () => { console.log('Done') })



//export default link

