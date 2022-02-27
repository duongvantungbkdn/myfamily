require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(
            // connect to MongoDB Cloud
            `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@mern-tung-project.yyw5m.mongodb.net/mern-tung-project?retryWrites=true&w=majority`,
            
            // conect to mongoDB Compass
            //'mongodb://localhost:27017/mernLearn',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('Connect successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
