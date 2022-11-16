console.log('Start background')

//Zoekt voor messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if (msg.jsName == 'getUserInfo' || window.location.pathname == 'https://handpickedagencies.hubper.co/*') {


        const getUser = 'fakeapi.json' //haal de echte API op, met de echte get user data
        console.log(getUser)

        fetch(getUser).then(function (res) {
            res.json().then(function (data){
                response({name: data.firstname, email: data.email})
            })


        }).catch(function (err) {
            response({ name: 'Error', email: 'Error' })
        })
    }
})