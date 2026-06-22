const postService = require('../services/post.service');
async function getAllPosts(req, res, next) {
    try {
        const posts = await postService.getAllPosts(req.query);
        res.status(200).json(posts);
    }catch (error) {
        next(error);
    }
}

async function getPostById(req, res, next) {
    try {
        const post = await postService.getPostById(req.params.id);
        res.status(200).json(post);
    }catch (error) {
        next(error);
    }
}

async function createPost(req, res, next) {
    try {
        const newPost = await postService.createPost(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
}

async function updatePost(req, res, next) {
    try {
        const updatedPost = await postService.updatePost(req.params.id, req.body);
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

async function deletePost(req, res, next) {
    try {
        const deletedPost = await postService.deletePost(req.params.id);
        res.status(200).json(deletedPost);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };