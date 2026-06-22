import pool from '../config/db.js';

export const findAllPosts = async (filters, limit, offset) => {
    let sql = 'SELECT DISTINCT posts.* FROM posts';
    const params = [];
    const conditions = [];

    if (filters.tag) {
        sql += ' JOIN posts_tags ON posts.id = posts_tags.post_id';
        sql += ' JOIN tags ON posts_tags.tag_id = tags.id';
        conditions.push('tags.name = ?');
        params.push(filters.tag);
    }
    if (filters.type) {
        conditions.push('posts.type = ?');
        params.push(filters.type);
    }
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);
    return rows;
};

export const findPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
};

export const createPost = async (post) => {
    const { admin_id, type, heading, description, body, image } = post;
    const [result] = await pool.query(
        'INSERT INTO posts (admin_id, type, heading, description, body, image, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [admin_id, type, heading, description, body, image]
    );
    return result.insertId;
};

export const updatePost = async (id, post) => {
    const { admin_id, type, heading, description, body, image } = post;
    const [result] = await pool.query(
        'UPDATE posts SET admin_id = ?, type = ?, heading = ?, description = ?, body = ?, image = ? WHERE id = ?',
        [admin_id, type, heading, description, body, image, id]
    );
    return result.affectedRows > 0;
};

export const deletePost = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
};
