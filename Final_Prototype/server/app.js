//Bestand om NFT afbeeldingen te genereren en op een IPFS te zetten
import * as IPFS from 'ipfs-core'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')
const Jimp = require('jimp')

//Variables in de metadata
let userFirstName
let cursusLanguage
let cursusTitle
let cursusDescription
let cursusStudytime
let picturePath

//Variables voor image op de ipfs te zetten
let file
let buffer

//Gateway templates voor ipfs
let gateway = "https://ipfs.io/ipfs/"
let imageGateway = "https://gateway.pinata.cloud/ipfs/"

//Variables die returned worden 
let ipfsLink
let ipfsIMG 


/**
 * De Json file wordt uitgelezen, dit is de "/v1/users/{id}/registrations" API call
 * @param {string} fileData - Data van de Api.
 */
const fileData = fs.readFileSync('./assets/apiData.json', (err, data) => {
    JSON.parse(data)
    if (err) throw err;
})

/**
 * De metadata variables worden vanuit de Json gedeclareerd.
 * @param {string} fileData - Data van de Api.
 * @function generateIMG() - Genereerd de afbeelding
 *          @param {userFirstName, cursusTitle} - Variables die worden gebruikt om op de afbeelding te printen
 * @return {array[]} - Data die in de metadata.json komt 
 */
function declareJson(){
    let jsonFile = JSON.parse(fileData)

    for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].registeredBy.firstname != "Hubper") { //Kijkt of de cursus geactiveerd is door de gebruiker
            userFirstName = jsonFile[i].registeredBy.firstname;
            cursusLanguage = jsonFile[i].language
            cursusTitle = jsonFile[i].activity.title
            cursusDescription = jsonFile[i].activity.description
            cursusStudytime = jsonFile[i].activity.data.hub.estimatedStudyTime.duration
        }
    }
    generateIMG(userFirstName, cursusTitle)

    return [userFirstName, cursusLanguage, cursusTitle, cursusDescription, cursusStudytime]
}

/**
 * De afbeelding wordt gegenereerd vanuit een template image.
 * @instructions https://www.npmjs.com/package/jimp
 * @return {./assets/diplomaIMG/1.png} afbeelding wordt hier gemaakt en kan straks worden opgehaald
 */
async function generateIMG(firstName, title) {
    const image = await Jimp.read("./assets/handpickedDiploma.png"); //Leest de template afbeelding

    //Laad font in
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE) //Font wordt hier bepaald
    .then(font => { image
            .print( //voor eigen styling: https://www.npmjs.com/package/jimp 
                font,
                190, //x van afbeelding
                300, //y van afbeelding
                firstName,
                50, //width van afbeelding
                (err, image, { x, y }) => {
                    image.print(font, x - 190, y + 30, title, 400); //2de tekst die onder de eerste wordt toegevoegd
                }
            )  
            .write('./assets/diplomaIMG/1.png'); //Slaat de afbeelding op tot een nieuwe afbeelding, voor meer diplomas zou het nummer van 1 steeds hoger worden
    })
}

/**
* Functie die de afbeelding op een ipfs zet en de metadata.json ervan maakt
* @return {string} ipfsLink - De ipfs link naar metadata.json
* @return {string} ipfsIMG - De ipfs link naar de afbeelding
 */
export async function createMetadata() {
    const declaredObj = await declareJson(); //De json file wordt uitgelezen

    //Data die wordt meegegeven vanuit declareJson() wordt gedeclareerd
    let name = declaredObj[0]
    let language = declaredObj[1]
    let title = declaredObj[2]
    let description = declaredObj[3]
    let studytime = declaredObj[4]

    //Maakt lokaal een ipfs aan (dit zou dan straks een url zijn buiten lokaal om)
    const ipfs = await IPFS.create({ repo: 'ok' + Math.random() })

    //Variable declarareerd pad van de gegenereerde afbeelding
    picturePath = './assets/diplomaIMG'

    //Leest image in dimploma path (zet in een for loop als er meer files zijn)
    file = fs.readdirSync(picturePath)
    buffer = fs.readFileSync(`${picturePath}/${file}`)

    //Zet de afbeelding op een ipfs
    let { cid } = await ipfs.add(buffer)

    //declareer een volledige link naar de afbeelding van de ipfs zodat het straks in de front end kan worden getoont
    ipfsIMG = imageGateway + cid

    //Zet de gegeven data en de ipfs van de diploma afbeelding in een json file
    let metadata = JSON.stringify({ User_Name: name, Cursus_Language: language, Cursus_Title: title, Cursus_Description: description, Cursus_Studytime: studytime, IPFS: ipfsIMG })

    //Zet de json file op ipfs, het is nu een metadata.json
    cid = await ipfs.add(metadata)

    //Zet link naar de ipfs om in een variable
    ipfsLink = gateway.concat(cid.path)

    console.log("Ipfs link: " + ipfsLink, "Ipfs Image: " + ipfsIMG)

    return [ipfsLink, ipfsIMG]
}


