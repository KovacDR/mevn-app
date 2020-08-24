import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, nanoid(7) + path.extname(file.originalname));
    }
});


export default multer({storage});