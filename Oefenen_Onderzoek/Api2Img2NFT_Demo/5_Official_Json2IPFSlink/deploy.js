import { createMetadata } from "./app.js"
import * as fs from "fs";

const ipfs = await createMetadata()

let link = JSON.stringify(ipfs)


fs.writeFileSync("ipfsJSON.json", link, 'utf8');
console.log(link)

//export default link

