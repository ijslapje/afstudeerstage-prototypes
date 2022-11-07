//Type in de terminal "node main.js" om de image te genereren
//De nieuwe image heet edited-handpickedDiploma in de folder imagesTemplate

//Importeer Json import mogelijkheden voor Node 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

//Maak variables aan die op diploma komen
let firstName;
let lastName;

//Leest de Json file op
fs.readFile('fakeAPI/hupber.json', (err, data) => {
    if (err) throw err;

    //Zet de data van de Json om naar de bijhoordende variable
    firstName = JSON.parse(data).firstname;
    lastName = JSON.parse(data).lastname;

    //Gebruik functie waar deze variables worden meegegeven
    generateIMG(firstName, lastName);
});

//Importeer Jimp
const Jimp = require("jimp");

async function generateIMG(firstName, lastName){
    
    //Leest de template image
    const image = await Jimp.read("imagesTemplate/handpickedDiploma.png");

    //Laad font in
    Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
        image
        //Voeg tekst toe aan image
        .print(
            font, 
            50, //x
            350, //y
            firstName +" "+ lastName //De text op de IMG
        )
        //Slaat de image op tot een nieuwe image
        .write("imagesTemplate/edited-handpickedDiploma.png");
    });
};

