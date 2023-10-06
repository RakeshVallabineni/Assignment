
const LoginAuthorization=require('../Services/loginService');

exports.authentication=async (req,res,next)=>{
    try{
        const code = req.query.code;
        const client=await LoginAuthorization.Authorization(code)
        if(client){
          res.status(200).send({status:true, oAuth2Client: client, message:'Authentication successful'});
        }
    }
    catch(err){
        res.status(500).send({status:false, message:"Something went wrong"});
    }
}

