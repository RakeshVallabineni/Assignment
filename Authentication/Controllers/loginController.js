
const LoginServices=require('../Services/loginService')

exports.login=async (req,res,next)=>{
    try{
        const authUrl=await LoginServices.loginService();
        if(authUrl){
            res.redirect(authUrl);
        }
    }
    catch(err){
        res.status(500).send({status:false, message:"Something went wrong"});
    }

}