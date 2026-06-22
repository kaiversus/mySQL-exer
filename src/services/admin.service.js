import * as adminModel from '../models/admin.model.js';
import bcrypt from 'bcryptjs';

export const getMe = async (adminId) => {
    const me = await adminModel.findAdminById(adminId);
    if (!me) {
        const error = new Error('USER NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { id: me.id, username: me.username, email: me.email };
};

export const updateMe = async (adminId, data) => {
    const { username, email } = data;
    if (!username || username.trim() === '') {
        const error = new Error('Username is required');
        error.statusCode = 400;
        throw error;
    }
    if (!email || email.trim() === '') {
        const error = new Error('Email is required');
        error.statusCode = 400;
        throw error;
    }
    const updated = await adminModel.updateAdmin(adminId, { username, email });
    if (!updated) {
        const error = new Error('ADMIN NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    const me = await adminModel.findAdminById(adminId);
    return { id: me.id, username: me.username, email: me.email };
};

export const changePassword = async (adminId, currentPassword, newPassword) => {
    const admin = await adminModel.findAdminById(adminId);
    if (!admin) {
        const error = new Error('ADMIN NOT FOUND');
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
        const error = new Error('Current password is incorrect');
        error.statusCode = 401;
        throw error;
    }
    if (!newPassword || newPassword.length < 6) {
        const error = new Error('New password must be at least 6 characters');
        error.statusCode = 400;
        throw error;
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await adminModel.updatePassword(adminId, hashed);
    return { message: 'Password updated successfully' };
};
