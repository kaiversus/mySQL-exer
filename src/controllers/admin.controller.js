const adminService = require('../services/admin.service');

async function getMe(req, res, next){
    try{
        const me = await adminService.getMe(req.admin.id);
        res.status(200).json(me);
    }catch(error){
        next(error);
    }
}

async function updateMe(req, res, next){
    try{
        const me = await adminService.updateMe(req.admin.id, req.body);
        res.status(200).json(me);
    }catch(error){
        next(error);
    }
}

async function changePassword(req, res, next){
    try{
        const me = await adminService.changePassword(req.admin.id, req.body.currentPassword, req.body.newPassword);
        res.status(200).json(me);
    }catch(error){
        next(error);
    }
}

module.exports = {getMe, updateMe, changePassword}