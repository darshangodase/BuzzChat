const getUserDetails = require("../helpers/getuserdetails");
const UserModel = require("../models/userModel")

async function updateUserDetails(request,response){
    try {
        const token = request.cookies.token || ""
        const user = await getUserDetails(token)
        const { name, profile_pic } = request.body

        const updateUser = await UserModel.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const updateduser = await UserModel.findById(user._id)

        return response.json({
            message : "user update successfully",
            data : updateduser,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = updateUserDetails