const postModel = require('../models/post.model');
async function getAllPosts() {
    return await postModel.findAllPosts();
}
async function getPostById(id) {
    const post = await postModel.findPostById(id);
    if (!post) {
        const error = new Error('POST NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return post;
}

function validatePostData(post) {
    const {admin_id, type, heading, body} = post;
        if(!heading || heading.trim() === '') {
        const error = new Error('Heading is required');
        error.statusCode = 400;
        throw error;
    }
    if(type !== 'post' && type !== 'project') {
        const error = new Error('Invalid post type');
        error.statusCode = 400;
        throw error;
    }
    if(!admin_id) {
        const error = new Error('Admin ID is required');
        error.statusCode = 400;
        throw error;
    }
    if(!body || body.trim() === '') {
        const error = new Error('Body is required');
        error.statusCode = 400;
        throw error;
    }
}

async function createPost(post) {
    validatePostData(post);
    const newId = await postModel.createPost(post);
    return await postModel.findPostById(newId);
}

async function updatePost(id, data) {
    validatePostData(data);
    const updated = await postModel.updatePost(id, data);
    if(!updated) {
        const error = new Error('POST NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return await postModel.findPostById(id);
}

async function deletePost(id) {
    const deleted = await postModel.deletePost(id);
    if(!deleted) {
        const error = new Error('POST NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { message: 'Post deleted successfully' };
}   

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };