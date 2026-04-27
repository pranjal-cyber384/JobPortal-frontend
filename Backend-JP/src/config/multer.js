import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/")
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes){
         if (err) return cb(err);
        const fileName = bytes.toString("hex") + path.extname(file.originalname)
        cb(null, fileName)
    });
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFiles = [".jpg", ".png", ".jpeg", ".pdf"];
   const ext = path.extname(file.originalname).toLowerCase();
   if (allowedFiles.includes(ext))
      {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, png, jpeg, pdf allowed"), false);
    }
   };
  

const upload = multer({ storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
 });

 export default upload;