const Data = require('../models/dataModel');

var DataControllers = {   

    // ===============create data======================
    // [POST] /data/create (access_right: ADM and MEM)
    create: async(req,res) => {
        const {title, description, url, thumnail, user, date, location} = req.body;

        // validation
        if (!title) {
            return res
                .status(400)
                .json({
                    success: false, 
                    massage: 'Title is required'
                });
        };

        try {    
            const url2 = url.startsWith('http') ? url : `https://${url}`
            const videoId = url2.split('/watch?v=')[1]

            const newData = new Data({
                date,
                location,
                title,
                description,
                url: url2,
                user: req.user._id,
                username: req.user.username,
                thumnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBL8lZbFMJOS966_RMELEAWAft0mA`
            });
            // save new Data to mongodb
            await newData.save();

            // Create successfully
            res.json({
                success: true, 
                message: 'Create Data successfully',
                data: newData
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //=================update data==================
    // [PUT] /data/:id (access_right: ADM and MEM)
    update: async(req,res) => {
        const {title, description, url, thumnail, date, location} = req.body;

        // validation
        if (!title) {
            return res
                .status(400)
                .json({
                    success: false, 
                    massage: 'Title is required'
                });
        };

        try {       
            const url2 = url.startsWith('http') ? url : `https://${url}`
            const videoId = url2.split('/watch?v=')[1]

            let updatedData = {
                title,
                date: date || null,
                location: location || '',
                description: description || '',
                url: url2,
                thumnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBL8lZbFMJOS966_RMELEAWAft0mA`
            };

            // update condition
            const dataUpdateCondition = {_id: req.params.id};
            updatedData = await Data.findOneAndUpdate(dataUpdateCondition, updatedData, {new: true});

            // User not authrized to update Data or Data not found
            if(!updatedData) {
                return res.status(401).json({success: false, message: 'Data not found or User not authrized'});
            }

            // update successfully
            res.json({success: true, message: 'Update successfully',data: updatedData});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //===============delete data========================
    delete: async(req,res) => {
        try {         
            const deletedData = await Data.delete({_id: req.params.id});

            // User not authrized to update Data or Data not found
            if(!deletedData) {
                return res.status(401).json({success: false, message: 'Data not found or User not authrized'});
            }

            // delete successfully
            res.json({success: true, message: 'Delete successfully', data: deletedData});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    }
    
};

module.exports = DataControllers;
