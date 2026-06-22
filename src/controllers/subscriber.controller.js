import * as subService from '../services/subscriber.service.js';

export const getAllSubscribers = async (req, res, next) => {
    try {
        const subscribers = await subService.getAllSubscribers();
        res.status(200).json(subscribers);
    } catch (error) {
        next(error);
    }
};

export const createSubscriber = async (req, res, next) => {
    try {
        const newSubscriber = await subService.createSubscriber(req.body.email);
        res.status(201).json(newSubscriber);
    } catch (error) {
        next(error);
    }
};

export const deleteSubscriber = async (req, res, next) => {
    try {
        const deletedSub = await subService.deleteSubscriber(req.params.id);
        res.status(200).json(deletedSub);
    } catch (error) {
        next(error);
    }
};
