const pool = require('../config/db');

async function findAllPosts() {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY date DESC');
    return rows;
}

async function findPostById(id) {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
}

async function createPost(post){
    const {admin_id, type, heading, description, body, image} = post;
    const [result] = await pool.query(
        'INSERT INTO posts (admin_id, type, heading, description, body, image, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [admin_id, type, heading, description, body, image]
    );
    return result.insertId;
}

async function updatePost(id, post) {
    const {admin_id, type, heading, description, body, image} = post;
    const [result] = await pool.query(
        'UPDATE posts SET admin_id = ?, type = ?, heading = ?, description = ?, body = ?, image = ? WHERE id = ?',
        [admin_id, type, heading, description, body, image, id]
    );
    return result.affectedRows > 0;
}

async function deletePost(id) {
    const [result] = await pool.query(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}


module.exports = {findAllPosts, findPostById, createPost, updatePost, deletePost};