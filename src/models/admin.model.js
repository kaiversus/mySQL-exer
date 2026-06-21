const pool = require('../config/db');

async function findAdminByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
}
module.exports = {findAdminByUsername}