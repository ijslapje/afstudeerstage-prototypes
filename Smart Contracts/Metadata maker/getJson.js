//Doel van js
//Kijkt of er hypothetisch iets nieuws is van vorige keer
//GET van nieuwe activityID, met daarbij de language, status, title, description, estimatedStudyTime

const urls = ["api-calls/userdata.json", "api-calls/user-activities.json", "api-calls/user-registrations.json"]
let tokens

fetch(urls[2])
    .then((response) => response.json())
    .then(function (json) {
        var qfcInfo = []
        //Haal de data op die nodig zijn voor de berekeningen
        for (let i = 0; i < json.length; i++) {
            let qfc = json[i]

            let activityId = qfc.activityId
            let language = qfc.language
            let status = qfc.status
    
            let title = qfc.activity.title
            let description = qfc.activity.description
    
            let estimatedStudyTime_Text = "Study time: " + qfc.activity.data.hub.estimatedStudyTime.duration + " " + qfc.activity.data.hub.estimatedStudyTime.unit
            let studyTime = qfc.activity.data.hub.estimatedStudyTime.duration;
    
            //Alle relevante data in 1 Array
            qfcInfo[i] = [activityId, language, status, title, description, estimatedStudyTime_Text, studyTime]
    
            //Dit omzetten in metadata.json samen met een IMG op de IPFS
    
            console.log(qfcInfo[i])
    
            
        }


        function sum(){
            let sum = 0
            for (let i = 0; i < qfcInfo.length; i++) {
                console.log(qfcInfo[i][6])
                sum+= qfcInfo[i][6]
            }
            
            return sum
        }

          
        //Voor de demo is het 1 handpicked token voor 1 minuut studeren
        function getToken(studytime) {
            if (studytime >= 1) {
                tokens = studytime
            } else {
                console.log('no moneys want niet genoeg gestudeerd')
            }
        }

        getToken(sum());



        document.getElementById('tokens').innerHTML = tokens
    })


