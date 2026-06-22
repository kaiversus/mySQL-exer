const pool = require('../config/db');
async function findProfile(){
    const [rows] = await pool.query('SELECT * FROM profiles LIMIT 1');
    return rows[0];
}


async function updateProfile(adminId, data){
    const {full_name, avatar, about_me, skill, experience, education} = data;
    const [result] = await pool.query(
        'UPDATE profiles SET full_name = ?, avatar = ?, about_me = ?, skill = ?, experience = ?, education = ? WHERE admin_id = ?',
        [full_name, avatar, about_me, skill, experience, education, adminId]
    );
    return result.affectedRows > 0;
}

module.exports = {findProfile, updateProfile}