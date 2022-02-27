const User = require('../models/userModel');

const checkLoggedIn = async(req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('-password') 
        if(!user) {
            res.status(400).json({success: false, message: 'Internal server error'})
        } else {
            res.json({success: true, user})
        }
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({success: false, message: 'Invalid user'});
    }
    next();
}

module.exports = checkLoggedIn;
