const attachment=require('../Services/loginService');

exports.attachmentController=async (req,res,next)=>{
    try{
        await attachment.saveAttachment(req,res,next);
    }
    catch(err){
        res.status(500).send({status:false, message:"Something went wrong"});
    }
}

