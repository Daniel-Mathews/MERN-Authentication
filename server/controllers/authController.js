const User = require('../models/user')
const {hashPassword, comparePassword}= require('../helpers/auth')
const jwt = require('jsonwebtoken');

//Function to test if app connections are working between frontend and backend
const test= (req, res) =>{
    res.json("test is working");
    console.log("Test is working")
}

//Function to handle post request at register page
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        //Check if name was entered:
        if(!name){
            return res.json({
                error: 'Name is required.'
            })
        };

        //Check if email was entered
        if(!email){
            return res.json({
                error: 'Email is required.'
            })
        };

        //Check if password is entered and is strong
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be atleast 6 characters long.'
            })
        };

        //Check email existence in database
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email is already registered.'
            })
        }

        //Create a variable to store the hashed password
        const hashedPassword = await hashPassword(password);    
        //Create new user in database
        const user = await User.create({
            name, email, password: hashedPassword,
        })

        //For security purposes it is not required to return the user details
        //return res.json(user)
        //We can return the following instead
        return res.json({message: "Registration successful!"})

    }catch(error){
        console.log(error)
    }

}

//Function to handle user logins
const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        //Check if email was entered
        if(!email){
            return res.json({
                error: 'Email is required.'
            })
        };

        //Check if user exists in database
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: 'Please register before login!'
            })
        }

        //Check if password is entered and is strong
        if(!password){
            return res.json({
                error: 'Password is required.'
            })
        };

        /* Comparing the user entered password and the hashed password from database.
            We dont need to hash the user entered password as that is done from the bcrypt
            library backend during comparison.
        */
        const match = await comparePassword(password, user.password);
        console.log("Password entered: "+password, "User Password: "+user.password);
        if(match){
            
            console.log("User with email: "+user.email+" authorized.")
            //return res.json("Passwords match")
            
            //Creating json webtoken(for tracking the user) if the passwords match
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                console.log("Cookie set for user: "+user.email+"\nToken: "+token);
                //I think we can write res.cookie since we are using cookie parser and attaching it to express
                res.cookie('token', token, {
                    sameSite: 'None', // Explicitly set SameSite attribute
                    secure: true // Ensure cookie is only sent over HTTPS
                }).json(user);
                
            })

        }
        if(!match){
            return res.json({
                error: "Incorrect password!"
            })
        }
    }catch(error){
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const{token}= req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }

}

module.exports= {
    test,
    registerUser,
    loginUser,
    getProfile
}