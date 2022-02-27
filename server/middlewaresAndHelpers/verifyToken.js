const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select('-password') 
            if(user) {
                req.user = user
                console.log('verifyToken req.user: ',req.user)
            } 
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: 'Server error at verifyToken'})
        }
    }

    next();    
}

module.exports = verifyToken;
