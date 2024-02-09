// Instalamos node-fetch
const fetch = require('node-fetch');
const JSON_PLACEHOLDER_URL  = process.env["JSON_PLACEHOLDER_URL"];

class UserModels {
    modelGetCool(){
        // memoria para el objecto Promesa
        return new Promise((resolve, reject) => {
            fetch(JSON_PLACEHOLDER_URL)
            .then((resp) =>{ 
                return resp.json()
            })
            .then((data) => resolve(data));
        })

    }
}

module.exports = new UserModels();