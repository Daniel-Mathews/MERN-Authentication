/*Importing express(For routing), dotenv(For not hard coding secure info), cors (Resource access control)*/
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Database connected"))
.catch((err)=> console.log('Database not connected', err))

//middleware for getting info from html body
app.use(express.json())
//Middleware for being able to use the cookies we set
app.use(cookieParser())

app.use(express.urlencoded({extended: false}))
//Telling app to go to authRoutes to handle get and post requests
app.use('/', require('./routes/authRoutes'))

//Starting server listen on port defined.
const port=8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
