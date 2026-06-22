const pool = require('../config/db');

async function createSubscriber(subscriber){
    const {email} = subscriber;
    const [result] = await pool.query(
        'INSERT INTO subscribers (email, date_subscribed) VALUES (?, NOW())',
        [email]
    );
    return result.insertId;
}

async function findAllSubscribers(){
    const [rows] = await pool.query('SELECT * FROM subscribers ORDER BY date_subscribed DESC');
    return rows;
}

async function deleteSubscriber(id){
    const [result] = await pool.query(
        'DELETE FROM subscribers WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = {createSubscriber, findAllSubscribers, deleteSubscriber}