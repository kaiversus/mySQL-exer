import * as tagModel from '../models/tag.model.js';

export const getAllTags = async () => {
    return await tagModel.findAllTags();
};

const validateTagName = (name) => {
    if (!name || name.trim() === '') {
        const error = new Error('Name is required');
        error.statusCode = 400;
        throw error;
    }
};

export const createTag = async (name) => {
    validateTagName(name);
    const newId = await tagModel.createTag(name);
    return { id: newId, name };
};

export const updateTag = async (id, name) => {
    validateTagName(name);
    const updated = await tagModel.updateTag(id, name);
    if (!updated) {
        const error = new Error('TAG NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { id, name };
};

export const deleteTag = async (id) => {
    const deleted = await tagModel.deleteTag(id);
    if (!deleted) {
        const error = new Error('TAG NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { message: 'Tag deleted successfully' };
};
