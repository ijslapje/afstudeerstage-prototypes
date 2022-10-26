const Jimp = require("jimp");
const name = "Coole NFT";

(async function(){
    
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
})();