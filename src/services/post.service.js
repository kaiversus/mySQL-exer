import * as postModel from '../models/post.model.js';

export const getAllPosts = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;
    return await postModel.findAllPosts({ type: query.type, tag: query.tag }, limit, offset);
};

export const getPostById = async (id) => {
    const post = await postModel.findPostById(id);
    if (!post) {
        const error = new Error('POST NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return post;
};

const validatePostData = (post) => {
    const { admin_id, type, heading, body } = post;
    if (!heading || heading.trim() === '') {
        const error = new Error('Heading is required');
        error.statusCode = 400;
        throw error;
    }
    if (type !== 'post' && type !== 'project') {
        const error = new Error('Invalid post type');
        error.statusCode = 400;
        throw error;
    }
    if (!admin_id) {
        const error = new Error('Admin ID is required');
        error.statusCode = 400;
        throw error;
    }
    if (!body || body.trim() === '') {
        const error = new Error('Body is required');
        error.statusCode = 400;
        throw error;
    }
};

export const createPost = async (post) => {
    validatePostData(post);
    const newId = await postModel.createPost(post);
    return await postModel.findPostById(newId);
};

export const updatePost = async (id, data) => {
    validatePostData(data);
    const updated = await postModel.updatePost(id, data);
    if (!updated) {
        const error = new Error('POST NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return await postModel.findPostById(id);
};

export const deletePost = async (id) => {
    const deleted = await postModel.deletePost(id);
    if (!deleted) {
        const error = new Error('POST NOT FOUND');
        error.statusCode = 404;
        throw error;
    }
    return { message: 'Post deleted successfully' };
};
