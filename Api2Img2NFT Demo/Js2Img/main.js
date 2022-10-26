import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
let name;

fs.readFile('fakeAPI/hupber.json', (err, data) => {
    if (err) throw err;
    name = JSON.parse(data).firstname;
    console.log(name);

    generateIMG(name);
});


const Jimp = require("jimp");

async function generateIMG(name){
    
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
            name //De text op de IMG
        )
        //Save Text
        .write("imagesTemplate/edited-handpickedDiploma.png");
    });
};

