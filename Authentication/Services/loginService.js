

const { google } = require('googleapis');

const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
  ];

const YOUR_CLIENT_ID = process.env.YOUR_CLIENT_ID;
const YOUR_CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET;
const YOUR_REDIRECT_URI = process.env.YOUR_REDIRECT_URI;

let oAuth2Client = new google.auth.OAuth2(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URI);


exports.loginService=async ()=>{
  try{
    const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'online',
          scope: SCOPES,
    });
    const tokens=authUrl;
    return tokens;
  }
  catch(err){
    console.log(err)
  }
}

exports.Authorization= async (code)=>{
  try{
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date,
      });  
      return oAuth2Client;
 
    }
    catch(err){
      console.log(err)
    }
  
}

const fs=require('fs');
const path=require('path');

const uploadPath = 'uploads/';

exports.saveAttachment = async (req,res,next) => {
  try{
      
    let { fileId }=req.body;

    if(!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath)
    }
      
    const downloadPath = path.join(uploadPath,`${fileId+'-'+Date.now()}.mp4`); 
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const destStream = fs.createWriteStream(downloadPath);
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );
      
    response.data
    .on('end', () => {
      res.status(200).send({ success: true, message: 'Downloaded' });
    })
    .on('error', (err) => {
      res.status(500).send({ success: false, message: 'failed' });
    })
    .pipe(destStream);  
  }
  catch(err){
    res.status(500).send({ success: false, message: 'failed' });
  }
};