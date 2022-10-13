import { uploader } from "../utilites/singleUploader"

export const avatarUpload = (req, res, next) =>{
 const upload = uploader(
     "avatars",
     ["image/jpeg", "image/jpg", "image/png"],
     1000000,
     "Only .jpg, jpeg or .png format allowed!"
 )
}
