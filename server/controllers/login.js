const UserModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(req, res) {
  try 
  {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    const verifypassword = await bcryptjs.compare(password, user.password);

    
    if (!verifypassword) {
      return res.status(400)
      .json({ 
        message: "Password is incorrect" ,
        error:true
    })
  }

    const tokendata={
        id:user._id,
        emsil:user.email
    }
    const token = await jwt.sign(tokendata, process.env.SECRET_KEY);

    const cookieOptions = {
        htttp:true,
        secure:true
    }
    return res
       .cookie('token',token,cookieOptions)
      .status(200)
      .json({ 
        message: "Login successfully", 
        token: token, 
        success: true 
    });
  }  catch (err) {
    return res
    .status(500)
    .json({ 
        message: err.message,
        error:true 
    });
  }
}

module.exports = checkPassword;
