import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    req.fileName = fileName
    cb(null, fileName);
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {

    const acceptableFileTypes = ['.png','.svg','.jpeg','.jpg'];
    
    const fileExtension = path.extname(file.originalname);

  
    if(acceptableFileTypes.includes(fileExtension.toLocaleLowerCase())){
      cb(null, true);
    } else {
      cb(new Error('Only image file types are acceptable'))
    }
  }
});


router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  return res.status(200).json({
    remark: 'File uploaded successfully',
    code: 200,
    path: `http://localhost:${process.env.PORT}/files/${req.fileName}`
   });
})

export default router
