const UserModels = require('../models/usermodels');
const { response } = require('express');

class UserControler {
    getUsers(req, res){
        UserModels.modelGetCool().then(response => {
            res.send(response);
        })

    }

    getUserById(req, res){
        const userId= req.params.id;
        res.send('get user' + userId);
    }
    createUser(req, res) {
        const user;
    }
    updateUser(){

    }
    deleteUser(){

    }

}

module.exports =  new UserControler();