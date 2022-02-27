const Data = require('../models/dataModel');
const ConfigApp = require('../models/configAppModel');

var PublicControllers = {   
    // [GET] / (access_right: public)
    //===============list data========================
    home: async(req,res) => {
        try {
            const datas = await Data.findWithDeleted({});
            const user = req.user
            res.json({success: true, datas, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        }
    },

    // [GET] /contact (access_right: public)
    contact: (req,res) => {
        res.json(req.user)
    },     
    
    // [GET] /news (access_right: public)
    news: (req,res) => {
        res.json(req.user)
    },

    // [GET] /configApp (access_right: public)
    configApp: async(req,res) => {
        try {
            const configs = await ConfigApp.find({})
            res.json({success: true, configs})
        } catch (error) {
            console.log(error)
            res.status(500).json({success:false, message:'Internal server config error'})
        }
    },
};

module.exports = PublicControllers;
