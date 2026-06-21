const authService = require('../services/auth.service');

async function login(req, res, next){
    try{
        const {username, password} = req.body
        const admin = await authService.login(username, password);
        res.status(200).json(admin);
    }catch(error){
        next(error);
    }
}

module.exports = {login};