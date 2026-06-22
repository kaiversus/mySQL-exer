import * as adminService from '../services/admin.service.js';

export const getMe = async (req, res, next) => {
    try {
        const me = await adminService.getMe(req.admin.id);
        res.status(200).json(me);
    } catch (error) {
        next(error);
    }
};

export const updateMe = async (req, res, next) => {
    try {
        const me = await adminService.updateMe(req.admin.id, req.body);
        res.status(200).json(me);
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const me = await adminService.changePassword(req.admin.id, req.body.currentPassword, req.body.newPassword);
        res.status(200).json(me);
    } catch (error) {
        next(error);
    }
};
