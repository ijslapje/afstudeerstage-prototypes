//Bestand om de cursus data om te zetten in tokens
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

let tokens

/**
 * De Json file wordt uitgelezen, dit is de "/v1/users/{id}/registrations" API call
 * @param {string} fileData - Data van de Api.
 */
const fileData = fs.readFileSync('./assets/apiData.json', (err, data) => {
    JSON.parse(data)
    if (err) throw err;
})

/**
 * De tokens worden vanuit de Json gedeclareerd.
 * @param {string} fileData - Data van de Api.
 * @return {int} - Aantal tokens
 */
export function declareTokens(){
    let jsonFile = JSON.parse(fileData)
    for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].registeredBy.firstname != "Hubper" && jsonFile[i].status == "Afgerond") { //Leest of de data door de gebruiker is gedaan en of de cursus is afgerond.
            
            tokens = jsonFile[i].activity.data.hub.estimatedStudyTime.duration; //Hier zou eventueel een berekening kunnen, hier staat dat 1 token = 1 minuut aan studytime
        }
    }

    return tokens
}