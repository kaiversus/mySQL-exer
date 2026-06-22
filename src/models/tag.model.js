import pool from '../config/db.js';

export const findAllTags = async () => {
    const [rows] = await pool.query('SELECT * FROM tags');
    return rows;
};

export const createTag = async (name) => {
    const [result] = await pool.query(
        'INSERT INTO tags (name) VALUES (?)', [name]
    );
    return result.insertId;
};

export const updateTag = async (id, name) => {
    const [result] = await pool.query(
        'UPDATE tags SET name = ? WHERE id = ?', [name, id]
    );
    return result.affectedRows > 0;
};

export const deleteTag = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM tags WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
};
