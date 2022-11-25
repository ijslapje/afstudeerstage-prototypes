import { createMetadata } from "./app.js"
import {spawn} from "node:child_process";

const ipfs = await createMetadata()

let link = JSON.stringify(ipfs)

const contract = spawn('node', ['smart-contract/contractDeploy.js'], {
    env: {
        'IPFSLINK': link,
        'USERADRESS': 0x1E9884c50F9C557c826dB6935eB719ac8d38A953
    }
})
contract.stdout.on('data', (data) => console.log(`${data}`));
contract.stderr.on('data', (data) => console.log(`${data}`) );
contract.on('close', () => { console.log('Done') })
//export default link

