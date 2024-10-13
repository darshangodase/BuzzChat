const getUserDetails = require("../helpers/getuserdetails");

async function userDetails(req, res) {
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetails(token);
        return res.status(200).json({
            message: "User details fetched successfully",
            data: user,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message, error: true });
    }
}

module.exports = userDetails;