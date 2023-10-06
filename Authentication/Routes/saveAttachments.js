const express=require("express");

const route=express.Router();

const AttachmentController=require('../Controllers/AttachmentController');

route.post('/download',AttachmentController.attachmentController);

module.exports=route;