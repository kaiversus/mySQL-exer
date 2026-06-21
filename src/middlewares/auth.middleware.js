const jwt = require('jsonwebtoken');

function protect(req, res, next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            const error = new Error('Not authorized, token missing or invalid format');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded
        next()
    }catch (error){
        error.statusCode = 401;
        next(error);
    }
}

module.exports = {protect};