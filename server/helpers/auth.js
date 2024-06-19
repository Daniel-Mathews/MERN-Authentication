//Import the bcrypt hashing module
const bcrypt= require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) =>{
            if(err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })

        })

    })
}

//Function to compare passwords
const comparePassword = async (password, hashed) => {
    try {
        const result = await bcrypt.compare(password, hashed);
        console.log("Result of comparePassword function: "+result);
        return result;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error; // Rethrow the error if needed
    }
};

//Exporting the modules
module.exports = {
    hashPassword,
    comparePassword
}