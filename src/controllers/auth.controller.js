import * as authService from '../services/auth.service.js';

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await authService.login(username, password);
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};
