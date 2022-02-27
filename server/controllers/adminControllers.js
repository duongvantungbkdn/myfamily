const Data = require('../models/dataModel');
const User = require('../models/userModel')
const ConfigApp = require('../models/configAppModel')

var AdminController = {   

    //===============get all users list========================
    usersWithDeletedList: async(req,res) => {
        try {
            const users1 = await User.findWithDeleted({}).select('-password')
            const users = users1.filter(user => user.role !== 'ADM')
            res.json({success: true, users});
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        }
    },


    //===============restore data========================
    restoreData: async(req,res) => {
        try {         
            const restoredData = await Data.restore({_id: req.params.id});

            // User not authrized to restore Data or Data not found
            if(!restoredData) {
                return res.status(401).json({success: false, message: 'Data not found or User not authrized'});
            }

            // delete successfully
            res.json({success: true, message: 'Restore successfully'});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //===============force delete data========================
    removeData: async(req,res) => {
        try {         
            const removedData = await Data.deleteOne({_id: req.params.id})

            // User not authrized to deleted Data or Data not found
            if(!removedData) {
                return res.status(401).json({success: false, message: 'Data not found or User not authrized'});
            }

            // delete successfully
            res.json({success: true, message: 'Delete data forever successfully'});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //===============lock (soft delete) user========================
    // [DELETE] /admin/user/:id (access_right: admin only)
    lockUser: async(req,res) => {
        try {         
            const lockUser = await User.delete({_id: req.params.id})

            // User not authrized to lock User or User not found
            if(!lockUser) {
                return res.status(401).json({success: false, message: 'User not found '});
            }

            // delete successfully
            res.json({success: true, message: 'Lock user successfully'});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //===============restore user========================
    // [PATCH] /admin/user/:id (access_right: admin only)
    restoreUser: async(req,res) => {
        try {         
            const restoredUser = await User.restore({_id: req.params.id})

            // User not authrized to restored Data or Data not found
            if(!restoredUser) {
                return res.status(401).json({success: false, message: 'User not found '});
            }

            // restore successfully
            res.json({success: true, message: 'Active user successfully'});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //===============force delete user========================
    // [DELETE] /admin/user/remove/:id (access_right: admin only)
    removeUser: async(req,res) => {
        try {         
            const removedUser = await User.deleteOne({_id: req.params.id})

            // User not authrized to deleted Data or Data not found
            if(!removedUser) {
                return res.status(401).json({success: false, message: 'User not found '});
            }

            // delete successfully
            res.json({success: true, message: 'Remove forever user successfully'});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    // ===============create config======================
    // [POST] /admin/setConfigApp (access_right: ADM )
    setConfigApp: async(req,res) => {
        const {
            lockRegister, 
            showMemFamilyName, 
            showPhoneNumber,
            showEmailAddress, 
            PhoneNumber, 
            EmailAddress,
            MemFamilyName
        } = req.body

        const findConfigExists = await ConfigApp.find({})

        if(findConfigExists.length === 0) {
            try {    
                const newConfig = new ConfigApp({
                    lockRegister, 
                    showMemFamilyName, 
                    showPhoneNumber,
                    showEmailAddress, 
                    PhoneNumber, 
                    EmailAddress,
                    MemFamilyName
                });
                // save new Data to mongodb
                await newConfig.save();
    
                // Create successfully
                res.json({
                    success: true, 
                    message: 'Create ConfigApp successfully',
                    config: newConfig
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({success:false, message:'Internal server set config error'});
            };
        } else  {
            res.json({
                success: true, 
                message: 'ConfigApp is existing',
                config: findConfigExists[0]
            });
        }

    },

    //=================update configApp==================
    // [PUT] /admin/updateConfigApp (access_right: ADM )
    updateConfigApp: async(req,res) => {
        const {
            lockRegister, 
            showMemFamilyName, 
            showPhoneNumber,
            showEmailAddress, 
            PhoneNumber, 
            EmailAddress,
            MemFamilyName
        } = req.body

        const findConfigExists = await ConfigApp.find({})

        if(findConfigExists !== 0) {
            try { 
                let updatedConfig = {
                    lockRegister, 
                    showMemFamilyName, 
                    showPhoneNumber,
                    showEmailAddress, 
                    PhoneNumber: PhoneNumber || '', 
                    EmailAddress: EmailAddress || '',
                    MemFamilyName: MemFamilyName || ''
                };
    
                updatedConfig = await ConfigApp.findOneAndUpdate( findConfigExists[0], updatedConfig, {new: true});
    
                // User not authrized to update Data or Data not found
                if(!updatedConfig) {
                    return res.status(401).json({success: false, message: 'ConfigApp not found or User not authrized'});
                }
    
                // update successfully
                res.json({success: true, message: 'Update ConfigApp successfully',config: updatedConfig});            
            } catch (error) {
                console.log(error);
                res.status(500).json({success:false, message:'Internal server error'});
            };
        }else{
            res.status(401).json({success:false, message:'ConfigApp has not created yet.'});
        }
        
    },

    // [PUT] /admin/updateUserRole (access_right: ADM, ADM1 )
    updateUserRole: async(req,res) => {
        const { _id,role } = req.body

        try {
            // check login
            if(!req.user) {
                return res
                    .status(400)
                    .json({success: false, message: 'You need login'});
            }

            // find user update
            const user = await User.findOne({_id})
            if(!user) {
                return res
                    .status(400)
                    .json({success: false, message: 'User does not exist or is locked'});
            }

            // check role = 'ADM'
            if(role==='ADM') {
                return res
                    .status(400)
                    .json({success: false, message: 'can not update role to ADM'});
            }

            /// check user change role = user login
            if(_id.toString() === req.user._id.toString()) {
                return res
                    .status(400)
                    .json({success: false, message: 'You can not change your own role'});
            }

            const userChange = await User.findOneAndUpdate({_id},{role},{new:true}).select('-password')

            return res.json({
                success: true, 
                message: 'Change user role successfully',
                user: userChange
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error and updateUserRole'});
        }
    },
};

module.exports = AdminController;
