//Server Express Server, data wordt gestuurd en opgehaald van de blockchain en op een server gezet voor de front end


//TO RUN
//In een terminal $cd smart-contract 
//$npx hardhat node
//Verander de account private en public key naar de geliste blockchain
//Open andere terminal
//node deploy.js
//Open localhost:8000

import { createMetadata } from "./app.js"
import { declareTokens } from "./calTokens.js";
import { spawn } from "node:child_process";
import express from 'express';
import cors from 'cors';

const app = express();

//Port van lokale server
const port = 8000;

/**
 * De NFT metadata.json en het aantal tokens worden gegenereerd
 * @param {array[]} ipfs - Krijgt de ipfs link van de metadata.json en de afbeelding terug.
 * @param {int} tokens - Krijgt de bepaalde verdiende tokens terug.
 */
const ipfs = await createMetadata()
const tokens = await declareTokens()

/**
 * Declareer variables die worden meegegeven aan de smart contracts
 * @param {string} link - Zet de ipfs link naar de metadata.json om in een string zodat het kan worden meegegeven aan het contract
 * @param {int} HPT - (HPT staat voor HandPickedTokens) Het aantal verdiende Handpicked Tokens
 */
let link = JSON.stringify(ipfs[0])
let HPT = tokens

//Set userkeys gebaseerd op de wallet (voor lokaal is het hardcoded)
let userPublickey = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
let userPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

//Start express
app.use(cors());
app.get('/api', (req, res) => {
  const {walletId} = req.query; //Geeft ook een walletID mee voor wie de data is
  const contract = spawn('node', ['contractDeploy.js'], { //Data wordt hier meegegeven naar de backend "smart contract deploy" gestuurd
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
    res.json({
      result: JSON.parse(information), //Haalt de benodigde data van de smart contract op en zet het in een json file 
      img: ipfs[1], //Zet de ipfs link van de afbeelding zodat het getoont kan worden in de front end
      walletId: walletId
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}/api`)
})


