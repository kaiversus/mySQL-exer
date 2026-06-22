import * as profileService from '../services/profile.service.js';

export const getProfile = async (req, res, next) => {
    try {
        const profile = await profileService.getProfile();
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const profile = await profileService.updateProfile(req.admin.id, req.body);
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
};
