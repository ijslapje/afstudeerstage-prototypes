import * as IPFS from 'ipfs-core'
import { createRequire } from 'module';
import { stringify } from 'querystring';
import { ethers } from "ethers";

const require = createRequire(import.meta.url);
const fs = require('fs');

//Maak variables aan die op diploma komen
let userFirstName
let cursusLanguage
let cursusTitle
let cursusDescription
let cursusStudytime
let picturePath = './assets/diplomaIMG'
let file = fs.readdirSync(picturePath)
let buffer = fs.readFileSync(`${picturePath}/${file}`)
let fakePath = "https://imgur.com/a/Nl4QCxZ"

let gateway = "https://ipfs.io/ipfs/"


//Leest de Json file op
fs.readFile('./assets/apiData.json', (err, data) => {
    const jsonFile = JSON.parse(data);
    if (err) throw err;

    for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].registeredBy.firstname != "Hubper") {
            //Zet de data van de Json om naar de bijhoordende variable
            userFirstName = jsonFile[i].registeredBy.firstname;
            cursusLanguage = jsonFile[i].language
            cursusTitle = jsonFile[i].activity.title
            cursusDescription = jsonFile[i].activity.description
            cursusStudytime = jsonFile[i].activity.data.hub.estimatedStudyTime.duration
        }
    }


    generateIMG(userFirstName, cursusTitle)
    //Gebruik functie waar deze variables worden meegegeven
    createMetadata(userFirstName, cursusLanguage, cursusTitle, cursusDescription, cursusStudytime + " min")
});

//Importeer Jimp
const Jimp = require("jimp");

async function generateIMG(firstName, title) {

    //Leest de template image
    const image = await Jimp.read("./assets/handpickedDiploma.png");

    //Laad font in
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
        image
            //Voeg tekst toe aan image
            .print(
                font,
                190,
                300,
                firstName,
                50,
                (err, image, { x, y }) => {
                    image.print(font, x - 190, y + 30, title, 400);
                }
            )
            //Slaat de image op tot een nieuwe image
            .write('./assets/diplomaIMG/1.png');
    });
};


async function createMetadata(name, language, title, description, studytime) {
    const ipfs = await IPFS.create({ repo: 'ok' + Math.random() })
    //const buffer = fs.readFileSync(picturePath)

    let { cid } = await ipfs.add(buffer)


    let metadata = JSON.stringify({ User_Name: name, Cursus_Language: language, Cursus_Title: title, Cursus_Description: description, Cursus_Studytime: studytime, IPFS: gateway + cid })

    cid = await ipfs.add(metadata)
    console.info(cid)
    console.log(gateway.concat(cid.path))
}




