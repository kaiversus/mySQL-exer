const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function login(username, password){
    const admin = await Admin.findAdminByUsername(username);
    if(!admin){
        const error = new Error('Invalid username or password'); 
        error.statusCode = 401;
        throw error;
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
        const error = new Error('Invalid username or password'); 
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign(
        {id: admin.id, username: admin.username},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )

    return {
        token, 
        admin:{
            id: admin.id,
            username: admin.username,
            email: admin.email
        }
    };
}

module.exports = {login}