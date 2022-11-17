//Import Librarys
//$ npm install ipfs-core
//$ npm install --save ethers
//$ npm install --save jimp

import * as IPFS from 'ipfs-core'
import { createRequire } from 'module';
import { stringify } from 'querystring';
import { ethers } from "ethers";
const Jimp = require("jimp");

const require = createRequire(import.meta.url);
const fs = require('fs');

//Maak variables aan die op diploma komen
let userFirstName
let cursusLanguage
let cursusTitle
let cursusDescription
let cursusStudytime
let picturePath = './assets/diplomaIMG'

//Leest image in dimploma path, zet in een for loop als er meer files zijn
let file = fs.readdirSync(picturePath)
let buffer = fs.readFileSync(`${picturePath}/${file}`)

//Gateway zetten voor ipfs
let gateway = "https://ipfs.io/ipfs/"
let imageGateway = "https://ipfs.cloudflare.com/ipfs/"


//Leest de Json file , dit is de "/v1/users/{id}/registrations" API call
fs.readFile('./assets/apiData.json', (err, data) => {
    const jsonFile = JSON.parse(data);
    if (err) throw err;

    //Kijkt voor diplomas waar user een toets voor heeft gedaan, die staan onder zijn eigen naam. Dat is alles behalve Hubper als naam
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

    //Maakt de diploma met de gebruikers naam en cursus titel
    generateIMG(userFirstName, cursusTitle)

    //Maakt de ipfs link voor de smart contract met daarin metadata.json
    createMetadata(userFirstName, cursusLanguage, cursusTitle, cursusDescription, cursusStudytime + " min")
});

//Functie maak diploma image
async function generateIMG(firstName, title) {
    //Leest de template image
    const image = await Jimp.read("./assets/handpickedDiploma.png");

    //Laad font in
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
        image
            //Voeg tekst toe aan image, hardcoded x en y
            .print(
                font,
                190,
                300,
                firstName,
                50,
                (err, image, { x, y }) => {
                    image.print(font, x - 190, y + 30, title, 400); //2de tekst die onder de eerste wordt toegevoegd
                }
            )
            //Slaat de image op tot een nieuwe image, voor meer diplomas zou het nummer van 1 steeds hoger worden
            .write('./assets/diplomaIMG/1.png');
    });
};

//Functie zet diploma img en metadata.json op een ipfs
async function createMetadata(name, language, title, description, studytime) {
    //Maakt lokaal een ipfs aan, dit zou dan straks een url zijn buiten lokaal om
    const ipfs = await IPFS.create({ repo: 'ok' + Math.random() })

    //Zet diploma img op de ipfs
    let { cid } = await ipfs.add(buffer)

    //Zet de gegeven data + de ipfs van de diploma img in een json file
    let metadata = JSON.stringify({ User_Name: name, Cursus_Language: language, Cursus_Title: title, Cursus_Description: description, Cursus_Studytime: studytime, IPFS: imageGateway + cid })

    //Zet json file op ipfs
    cid = await ipfs.add(metadata)

    //Zet link naar de ipfs om in een variable
    let ipfsLink = gateway.concat(cid.path)
   
    //Console log cid info
    console.info(cid)

    //Console log link naar de IPFS
    console.log(ipfsLink)
}




