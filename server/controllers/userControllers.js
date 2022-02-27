require('dotenv').config();
const User = require('../models/userModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

var UserControllers = {   

    //[POST] /user/auth/register
    auth: async(req,res) => {
        const {username, password} = req.body;

        // validation
        if (!username || !password) {
            return res
                .status(400)
                .json({
                    success: false, 
                    massage: 'Missing username and/or password'
                });
        };

        try {
            // if register the first will role 'ADMIN'
            const users = await User.find({})
            let userRole = null
            if(users.length === 0) {
                userRole = "ADM"
            } else {
                userRole = "MEM"
            }

            // check for existing user
            const user = await User.findOneWithDeleted({username});
            if(user) {
                return res
                    .status(400)
                    .json({success: false, message: 'username alreadey taken'});
            }

            // register success
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashPassword,
                role: userRole
            });
            // save new User to mongodb
            await newUser.save();

            // return Token
            const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET);
            res.json({
                success: true, 
                message: 'Create user successfully',
                accessToken
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },     
    
    // POST /user/auth/login
    login: async(req,res) => {
        const {username, password} = req.body;

        // validation
        if(!username || !password) {
            return res
                .status(400)
                .json({success: false, message: 'Missing username and/or password'});
        }

        try {
            // check for existing username
            const user = await User.findOne({username});
            if(!user) {
                return res
                    .status(400)
                    .json({success: false,message: 'Username and/or Password incorrect'});
            }

            // username found
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) {
                return res
                    .status(400)
                    .json({success: false,message: 'Username and/or Password incorrect'});
            }

            // Login success and return Token
            const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET);
            res.json({
                success: true, 
                message: 'Login successfully',
                accessToken
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error at login'});
        }
    },

    // PUT /user/changUsername
    changeUsername: async(req,res) => {
        const {password, newUsername} = req.body;

        try {
            // check login
            if(!req.user) {
                return res
                    .status(400)
                    .json({success: false, message: 'You need login'});
            }

            // get user object has password key and check user is locked
            const user = await User.findOne({_id: req.user._id})
            if(!user) {
                return res
                    .status(400)
                    .json({success: false,message: 'User does not exist or is locked'});
            }

            // authenticate old password
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) {
                return res
                    .status(400)
                    .json({success: false,message: 'Password is incorrect'});
            }

            // check for existing username
            const userExist = await User.findOneWithDeleted({username: newUsername});
            if(userExist) {
                return res
                    .status(400)
                    .json({success: false, message: 'username alreadey taken'});
            }

            // if username doesn't exist
            const changedUser = await User.findOneAndUpdate({_id: req.user._id},{username:newUsername},{new:true}).select('-password')
            
            return res.json({
                success: true, 
                message: 'Change Username successfully',
                user: changedUser
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error at change username'});
        };
    },
    
    // PUT /user/changePassword
    changePassword: async(req,res) => {
        const { oldPassword,newPassword } = req.body;

        try {
            // check login
            if(!req.user) {
                return res
                    .status(400)
                    .json({success: false, message: 'You need login'});
            }

            // authenticate old password
            const passwordValid = await argon2.verify(user.password, oldPassword);
            if(!passwordValid) {
                return res
                    .status(400)
                    .json({success: false,message: 'Old Password is incorrect'});
            }

            // check don't change password
            if(oldPassword===newPassword) {
                return res
                    .status(400)
                    .json({success: false,message: 'Old password and new Password are the same'});
            }

            // check newPassword empty
            if(!newPassword) {
                return res
                    .status(400)
                    .json({success: false,message: 'New password is empty'});
            }

            // get user object has password key and check user is locked
            const user = await User.findOne(req.user)
            if(!user) {
                return res
                    .status(400)
                    .json({success: false,message: 'User does not exist or is locked'});
            }

            // hash new password and changepassword
            const hashPassword = await argon2.hash(newPassword);
            const changedUser = await User.findOneAndUpdate({_id: req.user._id},{password:hashPassword},{new:true}).select('-password')

            return res.json({
                success: true, 
                message: 'Change Password successfully',
                user: changedUser
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error at change password'});
        };
    },
};

module.exports = UserControllers;
