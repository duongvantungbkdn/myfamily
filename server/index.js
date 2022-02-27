const express = require('express');
const route = require('./routes');
const connectDB = require('./models/config')
const cors = require('cors');

const app = express();

// url encode and json 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

//connect to mongodb
connectDB();

// init route
route(app);

// listenning on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT)