const profileModel = require('../models/profile.model');

async function getProfile(){
    const profile = await profileModel.findProfile();
    if (!profile){
        const error = new Error('Profile not found');
        error.statusCode = 404;
        throw error;
    }
    return profile;
}

async function updateProfile(adminId, data){
    const {full_name, avatar, about_me, skill, experience, education} = data;
    if(!full_name || full_name.trim() === ''){
        const error = new Error('Full name is required');
        error.statusCode = 400;
        throw error;
    }
    const updated = await profileModel.updateProfile(adminId, data);
    if(!updated){
        const error = new Error('Profile not found');
        error.statusCode = 404;
        throw error;
    }
    return await profileModel.findProfile();
}

module.exports = {getProfile, updateProfile}