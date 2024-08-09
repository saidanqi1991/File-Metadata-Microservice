var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const multer = require('multer');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
//set up multer for file upload
const upload = multer({ dest: 'uploads/' });


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//Handle the file upload via POST Request
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if(!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }
  return res.json({
    'name': req.file.originalname,
    'type': req.file.mimetype,
    'size': req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
