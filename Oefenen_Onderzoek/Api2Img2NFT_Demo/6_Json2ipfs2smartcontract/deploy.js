import { createMetadata } from "./app.js"
import * as fs from "fs";
import {spawn} from "node:child_process";

const ipfs = await createMetadata()

let link = JSON.stringify(ipfs)


fs.writeFileSync("ipfsJSON.json", link, 'utf8');
console.log(link)


const contract = spawn('node', ['smart-contract/contract.js'], {
    env: {
        'IPFSLINK': link
    }
})
contract.stdout.on('data', (data) => console.log(`${data}`));
contract.stderr.on('data', (data) => console.log(`${data}`) );
contract.on('close', () => { console.log('Done') })
//export default link

