const tagService = require('../services/tag.service');

async function getAllTags(req, res, next){
    try{
        const tags = await tagService.getAllTags();
        res.status(200).json(tags);
    }catch(error){
        next(error);
    }
}

async function createTag(req, res, next) {
    try{
        const tag = await tagService.createTag(req.body.name);
         res.status(201).json(tag);
    }catch(error){
        next(error);
    }
}

async function updateTag(req, res, next){
    try{
        const tags = await tagService.updateTag(req.params.id, req.body.name);
        res.status(200).json(tags);
    }catch(error){
        next(error);
    }
}

async function deleteTag(req, res, next){
    try{
        const tags = await tagService.deleteTag(req.params.id);
        res.status(200).json(tags);
    }catch(error){
        next(error);
    }
}

module.exports = {getAllTags, createTag, updateTag, deleteTag}