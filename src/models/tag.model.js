const pool = require('../config/db');

async function findAllTags(){
    const [rows] = await pool.query('SELECT * FROM tags');
    return rows
}

async function createTag(name) {
    const [result] = await pool.query(
        'INSERT INTO tags (name) VALUES (?)', [name]
    );
    return result.insertId;
}

async function updateTag(id, name){
    const [result] = await pool.query(
        'UPDATE tags SET name = ? WHERE id = ?', [name, id]
    );
    return result.affectedRows > 0;
}

async function deleteTag(id){
    const [result] = await pool.query(
        'DELETE FROM tags WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = {findAllTags, createTag, updateTag, deleteTag}