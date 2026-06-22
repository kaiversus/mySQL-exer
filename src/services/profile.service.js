import * as profileModel from '../models/profile.model.js';

export const getProfile = async () => {
    const profile = await profileModel.findProfile();
    if (!profile) {
        const error = new Error('Profile not found');
        error.statusCode = 404;
        throw error;
    }
    return profile;
};

export const updateProfile = async (adminId, data) => {
    const { full_name, avatar, about_me, skill, experience, education } = data;
    if (!full_name || full_name.trim() === '') {
        const error = new Error('Full name is required');
        error.statusCode = 400;
        throw error;
    }
    const updated = await profileModel.updateProfile(adminId, data);
    if (!updated) {
        const error = new Error('Profile not found');
        error.statusCode = 404;
        throw error;
    }
    return await profileModel.findProfile();
};
