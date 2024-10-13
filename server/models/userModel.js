const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    profilePic: { 
         type: String, 
         default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
   
},{
    timestamps: true
});

const UserModel = mongoose.model('User', userSChema);
module.exports = UserModel;