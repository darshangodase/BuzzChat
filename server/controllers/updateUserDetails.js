const getUserDetails = require("../helpers/getuserdetails");
const UserModel = require("../models/userModel");

async function updateUserDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    const user = await getUserDetails(token);
    const { name, profilePic } = request.body;
   
    const updateUser = await UserModel.updateOne({ _id: user._id }, {
      name,
      profilePic
    });

    const updatedUser = await UserModel.findById(user._id);

    return response.json({
      message: "User updated successfully",
      data: updatedUser,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true
    });
  }
}

module.exports = updateUserDetails;