const { trusted } = require("mongoose");
const UserModel = require("../models/userModel");

async function checkEmail(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const checkemail = await UserModel.findOne({ email }).select("-password");
    if (!checkemail) {
      return res.status(400).json({ message: "user not exist", error: true });
    }
    return res
      .status(200)
      .json({ message: "Email verified", success: true, data: checkemail });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = checkEmail;
