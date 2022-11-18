import fs from "fs-extra"
import { createMetadata } from "./app.js"

const ipfs = await createMetadata()

let JSONlink = ipfs
let link = JSON.stringify(JSONlink)
console.log(link)

export default link

