import * as tagService from '../services/tag.service.js';

export const getAllTags = async (req, res, next) => {
    try {
        const tags = await tagService.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};

export const createTag = async (req, res, next) => {
    try {
        const tag = await tagService.createTag(req.body.name);
        res.status(201).json(tag);
    } catch (error) {
        next(error);
    }
};

export const updateTag = async (req, res, next) => {
    try {
        const tags = await tagService.updateTag(req.params.id, req.body.name);
        res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};

export const deleteTag = async (req, res, next) => {
    try {
        const tags = await tagService.deleteTag(req.params.id);
        res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};
