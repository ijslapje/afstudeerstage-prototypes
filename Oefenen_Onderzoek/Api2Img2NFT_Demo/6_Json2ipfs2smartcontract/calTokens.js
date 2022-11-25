import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

let tokens

const fileData = fs.readFileSync('./assets/apiData.json', (err, data) => {
    JSON.parse(data)
    if (err) throw err;
})

export function declareTokens(){
    let jsonFile = JSON.parse(fileData)
    //Kijkt voor diplomas waar user een toets voor heeft gedaan, die staan onder zijn eigen naam. Dat is alles behalve Hubper als naam
    for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].registeredBy.firstname != "Hubper" && jsonFile[i].status == "Afgerond") {
            
            tokens = jsonFile[i].activity.data.hub.estimatedStudyTime.duration;
        }
    }

    return tokens
}