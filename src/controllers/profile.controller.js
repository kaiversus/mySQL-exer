const profileService = require('../services/profile.service');

async function getProfile(req, res, next){
    try{
        const profile = await profileService.getProfile();
        res.status(200).json(profile);
    }catch(error){
        next(error);
    }
}

async function updateProfile(req, res, next){
    try{    
        const profile = await profileService.updateProfile(req.admin.id, req.body);
        res.status(200).json(profile);
    }catch (error){
        next(error);
    }
}

module.exports = {getProfile, updateProfile}