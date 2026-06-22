import * as subModel from '../models/subscriber.model.js';

export const getAllSubscribers = async () => {
    return await subModel.findAllSubscribers();
};

const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!email || !regex.test(email)) {
        const error = new Error('Valid email is required');
        error.statusCode = 400;
        throw error;
    }
};

export const createSubscriber = async (email) => {
    validateEmail(email);
    try {
        const newId = await subModel.createSubscriber({ email });
        return { id: newId, email };
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            const error = new Error('Email already subscribed');
            error.statusCode = 409;
            throw error;
        }
        throw err;
    }
};

export const deleteSubscriber = async (id) => {
    const deleted = await subModel.deleteSubscriber(id);
    if (!deleted) {
        const error = new Error('SUBSCRIBER NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { message: 'Subscriber deleted successfully' };
};
