const express=require('express');
const router=express.Router();

const registerUser = require('../controllers/registerUser');
const checkEmail = require('../controllers/checkEmail');
const login=require('../controllers/login');
const userDeatails = require('../controllers/userDetails');
const logout = require('../controllers/logout');
const updateUserDetails = require('../controllers/updateUserDetails');


//create user register router
router.post('/register',registerUser);
//verify user email
router.post('/email',checkEmail);
//verify user password
router.post('/login',login)
//to get user details
router.get('/user',userDeatails);
//to logout user
router.get('/logout',logout);
//to update user
router.post('/update',updateUserDetails);

module.exports=router;