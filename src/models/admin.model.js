const pool = require('../config/db');

async function findAdminByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
}


async function findAdminById(id){
    const [rows] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
    return rows[0];
}

async function updateAdmin(id, {username, email}){
    const [result] = await pool.query(
        'UPDATE admins SET username = ?, email = ? WHERE id = ?',
        [username, email, id]
    );
    return result.affectedRows > 0;
}

async function updatePassword(id, hashedPassword){
    const [result] = await pool.query(
        'UPDATE admins SET password = ? WHERE id = ?',
        [hashedPassword, id]
    );
    return result.affectedRows > 0;
}

module.exports = {findAdminByUsername, findAdminById, updateAdmin, updatePassword}