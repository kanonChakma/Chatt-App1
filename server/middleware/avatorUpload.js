import { uploader } from "../utilites/singleUploader.js";

export const avatarUpload = (req, res, next) =>{
    console.log(req.body);
 const upload = uploader(
     "avatars",
     ["image/jpeg", "image/jpg", "image/png"],
     1000000,
     "Only .jpg, jpeg or .png format allowed!"
 )
  upload.single('file')
}
