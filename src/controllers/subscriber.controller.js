const subService = require('../services/subscriber.service');

async function getAllSubscribers(req, res, next){
    try{
        const subscribers = await subService.getAllSubscribers();
        res.status(200).json(subscribers);
    }catch(error){
        next(error);
    }
}

async function createSubscriber(req, res, next){
    try{    
        const newSubscriber = await subService.createSubscriber(req.body.email);
        res.status(201).json(newSubscriber);
    }catch(error){
        next(error);
    }
}

async function deleteSubscriber(req, res, next){
    try{
        const deletedSub = await subService.deleteSubscriber(req.params.id);
        res.status(200).json(deletedSub);
    }catch(error){
        next(error);
    }
}

module.exports = {getAllSubscribers, createSubscriber, deleteSubscriber};