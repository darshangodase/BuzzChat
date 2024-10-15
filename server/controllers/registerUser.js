const UserModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');

async function registerUser(req, res) {
  try {
    const { name, email, password, profilePic } = req.body;

    if (!name || !email || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const checkemail = await UserModel.findOne({ email });
    if (checkemail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      profilePic
    });

    await user.save();
    return res.status(201).json({ message: 'User registered successfully',success:true});
  } 
  catch (err) {
    return res.status(500).json({ message: "Failed to Register" ,error:true});
  }
}

module.exports = registerUser;