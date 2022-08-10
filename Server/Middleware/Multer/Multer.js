import { v4 as uuidv4 } from 'uuid';
const multer = require('multer');
const path = require('path')
const fs = require('fs')

const id = uuidv4();
// fs.readdir("./", (err, files) => {
//     if (err) throw err;
//     files.forEach((item) => {
//         console.log(item);
//     });
//     console.log("readdir");
// });


const storage = multer.diskStorage({
    destination: './Upload/Data',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const basename = path.basename(file.originalname, ext)
        const date = new Date()
        cb(null, `${basename}-${id}-` + Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only Image File( .png, .jpg and .jpeg) format allowed!'));
        }
    },
    limits: { fileSize: 20 * 1024 * 1024 },
});


module.exports = upload;

export default upload