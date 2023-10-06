const express = require('express');
const multer = require('multer');
const upload = multer();
const app = express();

const cors = require('cors');
app.use(cors());

const dot_env=require('dotenv');
dot_env.config()

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const loginRouter=require('./Authentication/Routes/loginRoutes');
app.use(loginRouter)

const attachmentRouter=require('./Authentication/Routes/saveAttachments');
app.use(attachmentRouter)


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
