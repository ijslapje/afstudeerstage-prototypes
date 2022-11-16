dotenv.config()
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
import { parse } from 'csv-parse';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhDNDUxOWY0ZTY1RTlCY0E0QzJFZTRFNDFkQzFFMkRjMTQ3QjhBNDgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg1OTM1MTQ3NjcsIm5hbWUiOiJoYW5kcGlja2VkRGlwbG9tYSJ9.MAxPfdHhhkvcIdil7D1ZhdOwOJy0N8B5T0MA8CHtOuQ'
const DIPLOMA_CSV_PATH = './assets/diploma_metadata.csv'
const DIPLOMA_PHOTO_PATH = './assets/diplomaIMG/'

// Process CSV file
var parser = await parse({columns: true}, async function (err, records) {
    for (let index = 0; index < 3; index++) {
        var element = records[index]
        // Each row of the CSV represents a single Diploma extract the name, language, title, description, studytime and picture
        var name = element['User_FirstName']
        var cursusLanguage = element['Activity_Language']
        var cursusTitle = element['Activity_Title']
        var cursusDescription = element['Activity_Description']
        var cursusStudytime = element['Activity_Studytime']
        var picture = `${DIPLOMA_PHOTO_PATH}${1}.png`
        // store the metadata for this Diploma
        await storeAsset(name, cursusLanguage, cursusTitle, cursusDescription, cursusStudytime+" min", picture)
    }
});


fs.createReadStream(DIPLOMA_CSV_PATH).pipe(parser);

// Store metadata for one Diploma on IPFS
async function storeAsset(name, language, title, description, studytime ,picture_path) {

    console.log(name, language, title, description, studytime ,picture_path)
   const client = new NFTStorage({ token: API_KEY })


   const metadata = await client.store({
       name: `Ian ${name}`,
       language: language,
       title: title,
       description: description,
       studytime: studytime,
       image: new File(
           [await fs.promises.readFile(picture_path)],
           `${name}Photo.png`,
           { type: 'image/png' }
       ),
   })
   console.log(`${name}: ${metadata.url}`)
}