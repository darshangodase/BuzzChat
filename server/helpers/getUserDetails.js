const jwt= require('jsonwebtoken');
const userModel= require('../models/userModel');

const getUserDetails = async (token)=>{
    if(!token){
        return {
            message:"Session out login again",
            logout:"true"
      }
    }
    const decode=await jwt.verify(token,process.env.SECRET_KEY);
    const user=await userModel.findById(decode.id).select('-password');
    return user;
}

module.exports = getUserDetails;