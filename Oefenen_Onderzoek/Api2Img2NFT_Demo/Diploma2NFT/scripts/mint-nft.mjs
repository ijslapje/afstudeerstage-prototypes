import { parse } from 'csv-parse'
const CONTRACT_ADDRESS = "0x1E9884c50F9C557c826dB6935eB719ac8d38A953"
import fs from 'fs'
const METADATA_URLS_PATH = 'assets/metadata_urls.csv'

// Process CSV file
var parser = parse({columns: true}, async function (err, records) {
   console.log(records.length)
   for (let index = 1; index < records.length; index++) {
      var record = records[index]
      console.log(`Minting:${record['DIPLOMA']}`)
      await mintNFT(CONTRACT_ADDRESS, record['IPFS_URL'])
   }
})

fs.createReadStream(METADATA_URLS_PATH).pipe(parser)

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("DiplomaNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}