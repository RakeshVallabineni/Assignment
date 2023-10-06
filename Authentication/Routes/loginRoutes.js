const express=require("express");

const route=express.Router();

const loginController=require('../Controllers/loginController');

const AuthorizationController=require('../Controllers/AuthorizationController');

route.get('/auth',loginController.login);

route.get('/auth/callback',AuthorizationController.authentication);

module.exports=route;