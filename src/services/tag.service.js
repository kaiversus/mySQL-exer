const tagModel = require('../models/tag.model');

async function getAllTags(){
    return await tagModel.findAllTags();
}

function validateTagName(name){
    if(!name || name.trim() === ''){
        const error = new Error('Name is required');
        error.statusCode = 400;
        throw error;
    }
}

async function createTag(name) {
      validateTagName(name);
      const newId = await tagModel.createTag(name);
      return { id: newId, name };
}

async function updateTag(id, name){
    validateTagName(name);
    const updated = await tagModel.updateTag(id,name);
    if(!updated){
        const error = new Error('TAG NOT FOUND');
        error.statusCode = 404;
        throw error;       
    }
    return { id, name };      
}

async function deleteTag(id){
    const deleted = await tagModel.deleteTag(id);
    if(!deleted){
        const error = new Error('TAG NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { message: 'Tag deleted successfully' };
}

module.exports = { getAllTags, createTag, updateTag, deleteTag };