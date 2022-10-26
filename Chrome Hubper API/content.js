
//Stuurt msg naar Background.js
chrome.runtime.sendMessage({jsName: "getUserInfo"}, (response)=>{

    console.log(response)

    document.querySelector('h1').innerHTML = response.name
    document.querySelector('h2').innerHTML = response.email

})
