const fs = require('fs');
var express = require('express');
const multer = require('multer');

var router = express.Router();
const upload = multer({ dest: 'public/uploads' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/formsub', upload.single('upload'), (req, res, next) => {
  const newPath = `public/uploads/${req.file.originalname}`
  fs.rename(req.file.path, newPath, () => {
    res.json('File uploaded');
  });
  
});

router.post('/formsubarray', upload.array('upload'), (req, res, next) => {
  console.log(req.files)
  const newPath = `public/uploads/${req.files[0].originalname}`
  const newPath2 = `public/uploads/${req.files[1].originalname}`
  
});

module.exports = router;
