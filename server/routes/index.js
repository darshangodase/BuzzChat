const express=require('express');
const router=express.Router();

const registerUser = require('../controllers/registerUser');
const LoginEmail = require('../controllers/LoginEmail');
const LoginPassword=require('../controllers/LoginPassword');
const userDeatails = require('../controllers/userDetails');
const logout = require('../controllers/logout');
const updateUserDetails = require('../controllers/updateUserDetails');


//create user register router
router.post('/register',registerUser);
//verify user email
router.post('/login-email',LoginEmail);
//verify user password
router.post('/login-password',LoginPassword);
//to get user details
router.get('/user',userDeatails);
//to logout user
router.get('/logout',logout);
//to update user
router.post('/update',updateUserDetails);

module.exports=router;