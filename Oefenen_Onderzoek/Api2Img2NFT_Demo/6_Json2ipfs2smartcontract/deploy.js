//Install
//Npm install in cd ./smart-contract:
//$npm i --save-dev hardhat
//$npm i @openzeppelin/contracts
//$npm i @nomicfoundation/hardhat-toolbox
//terug naar de main map met $cd ../ 
//$npm i ethers
//$npm i jimp
//$npm i ipfs-core
//$npm i express

//TO RUN
//In een terminal $cd smart-contract 
//$npx hardhat node
//Verander de account en private key naar de geliste blockchain
//Open andere terminal
//node deploy.js
//Open localhost:3000

//Import benodigde librarys
import { createMetadata } from "./app.js"
import { declareTokens } from "./calTokens.js";
import { spawn } from "node:child_process";
import express from 'express';

//Set localserver
const app = express();
const port = 3000;

//Roep ipfs en token aan
const ipfs = await createMetadata()
const tokens = await declareTokens()
let link = JSON.stringify(ipfs)
let HPT = tokens

//Set userkeys gebaseerd op de wallet (voor lokaal is het hardcoded)
let userPublickey = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
let userPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

//Start express
app.get('/', (req, res) => {
  //WalletId
  const {walletId} = req.query;

  //Start hardhat op deze manier (gedaan vanwege node bug)
  const contract = spawn('node', ['contractDeploy.js'], {
    env: {
      'IPFSLINK': link,
      'USERPUBLIC': userPublickey,
      'USERPRIVATE': userPrivateKey,
      'TOKENS': HPT
    },
    cwd: 'smart-contract/'
  })
  let information = null;

  //Zet de data die je terug krijgt naar string
  contract.stdout.on('data', (data) => information = data.toString());
  contract.stderr.on('data', (data) => console.log(`${data}`));

  contract.on('close', () => {
    //Zet in een json file de benodigde data van de smart contract
    res.json({
      result: JSON.parse(information),
      walletId: walletId
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







//export default link

