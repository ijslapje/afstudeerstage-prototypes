const fs = require('fs')
const { createMeta } = require("./app.js")


let link = JSON.stringify(createMeta)


fs.writeFileSync("ipfsJSON.json", link, 'utf8');
console.log(link)



