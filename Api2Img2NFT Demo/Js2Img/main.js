import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
let firstName;
let lastName;

fs.readFile('fakeAPI/hupber.json', (err, data) => {
    if (err) throw err;
    firstName = JSON.parse(data).firstname;
    lastName = JSON.parse(data).lastname;

    generateIMG(firstName, lastName);
});


const Jimp = require("jimp");

async function generateIMG(firstName, lastName){
    
    //Read the image
    const image = await Jimp.read("imagesTemplate/handpickedDiploma.png");

    //load Font
    Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
        image
        //Insert Text
        .print(
            font, 
            50, //x
            350, //y
            firstName +" "+ lastName //De text op de IMG
        )
        //Save Text
        .write("imagesTemplate/edited-handpickedDiploma.png");
    });
};

