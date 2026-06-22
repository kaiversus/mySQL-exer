import pool from '../config/db.js';

export const createSubscriber = async (subscriber) => {
    const { email } = subscriber;
    const [result] = await pool.query(
        'INSERT INTO subscribers (email, date_subscribed) VALUES (?, NOW())',
        [email]
    );
    return result.insertId;
};

export const findAllSubscribers = async () => {
    const [rows] = await pool.query('SELECT * FROM subscribers ORDER BY date_subscribed DESC');
    return rows;
};

export const deleteSubscriber = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM subscribers WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
};
