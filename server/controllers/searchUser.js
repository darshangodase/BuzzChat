const UserModel = require('../models/userModel');
const getUserDetails = require('../helpers/getUserDetails');

async function searchUser(request, response) {
  try {
    const token = request.cookies.token || "";
    const currentUser = await getUserDetails(token);
    const { search } = request.body;
    const query = new RegExp(search, "i");

    const users = await UserModel.find({
      "$or": [
        { name: query },
        { email: query }
      ],
      _id: { $ne: currentUser._id } // Exclude current user
    }).select("-password");

    return response.json({
      message: 'all user',
      data: users,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true
    });
  }
}

module.exports = searchUser;