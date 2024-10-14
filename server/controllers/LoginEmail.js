const UserModel = require("../models/userModel");

async function LoginEmail(req, res) {
  try {
    const { email } = req.body;    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const checkemail = await UserModel.findOne({ email }).select("-password");
    if (!checkemail) {
      return res.status(400).json({ message: "User not exist", error: true });
    }
    return res
      .status(200)
      .json({ message: "Email Verified", success: true, userId: checkemail._id });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = LoginEmail;
