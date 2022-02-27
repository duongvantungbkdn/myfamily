
const Data = require('../models/dataModel')

const checkDataRight = async (req, res, next) => {
    const dataId = req.params.id

    try {
        const data = await Data.findOne({_id:dataId})
        if(!data) {
            return res.status(403).json({success:false,message: 'Data not found'})
        } else {
            if(req.user.role !== 'ADM' || req.user.role !== 'ADM1') {
                if(req.user._id.toString() !== data.user.toString()) {
                    return res.status(403)
                              .json({
                                  success:false,
                                  message: 'You did not create this data',
                                })
                }
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Server error at checkDataRight'})
    }
    
    next();
        
}

module.exports = checkDataRight;
