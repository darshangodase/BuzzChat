const UserModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function LoginPassword(req, res) {
  try {
    const { password, userId } = req.body;
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", error: true });
    }

    const verifypassword = await bcryptjs.compare(password, user.password);
    if (!verifypassword) {
      return res.status(400).json({ message: "Password is incorrect", error: true });
    }

    const tokendata = {
      id: user._id,
      email: user.email
    };
    const token = await jwt.sign(tokendata, process.env.SECRET_KEY);

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };
    return res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({ message: "Login Successfully", token: token, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, error: true });
  }
}

module.exports = LoginPassword;