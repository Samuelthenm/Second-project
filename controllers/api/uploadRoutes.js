const router = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });

router.post('/', upload.single('myFile'), (req, res) => {
  try {
    // req.file contains file info
    console.log(req.file);
    res.json({ message: 'File uploaded successfully', file: req.file });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
