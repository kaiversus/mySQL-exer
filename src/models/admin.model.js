import pool from '../config/db.js';

export const findAdminByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
};

export const findAdminById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
    return rows[0];
};

export const updateAdmin = async (id, { username, email }) => {
    const [result] = await pool.query(
        'UPDATE admins SET username = ?, email = ? WHERE id = ?',
        [username, email, id]
    );
    return result.affectedRows > 0;
};

export const updatePassword = async (id, hashedPassword) => {
    const [result] = await pool.query(
        'UPDATE admins SET password = ? WHERE id = ?',
        [hashedPassword, id]
    );
    return result.affectedRows > 0;
};
