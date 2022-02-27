
const checkUserRole = permission => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(403).json({success: false, message: 'You need login'})                
        }

        if(!permission.includes(req.user.role)) {
            return res.status(401).json({success: false, message: 'You do not permission'})
        }
        
        next();
    }
        
}

module.exports = checkUserRole;
