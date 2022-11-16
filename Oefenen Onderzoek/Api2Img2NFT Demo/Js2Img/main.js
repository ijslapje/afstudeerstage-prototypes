//Type in de terminal "node main.js" om de image te genereren
//De nieuwe image heet edited-handpickedDiploma in de folder imagesTemplate

//Importeer Json import mogelijkheden voor Node 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

//Maak variables aan die op diploma komen
let firstName;
let title;

//Leest de Json file op
fs.readFile('fakeAPI/hupber.json', (err, data) => {
    const jsonFile = JSON.parse(data);
    if (err) throw err;

    for(let i=0; i<jsonFile.length; i++){
        if(jsonFile[i].registeredBy.firstname != "Hubper"){
            //Zet de data van de Json om naar de bijhoordende variable
            firstName = jsonFile[i].registeredBy.firstname;
            title = jsonFile[i].title
        }
    }


    //Gebruik functie waar deze variables worden meegegeven
    generateIMG(firstName, title);
});

//Importeer Jimp
const Jimp = require("jimp");

async function generateIMG(firstName, title){
    
    //Leest de template image
    const image = await Jimp.read("imagesTemplate/handpickedDiploma.png");

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
              image.print(font, x-190, y+30, title, 400);
            }
        )
        //Slaat de image op tot een nieuwe image
        .write("imagesTemplate/edited-handpickedDiploma.png");
    });
};

