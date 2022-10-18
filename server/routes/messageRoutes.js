
import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageController.js';
import { authCheck } from '../middleware/authMiddleware.js';
import { uploader } from '../utilites/singleUploader.js';

const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
 )

const router = express.Router()
// router.post("/", authCheck , sendMessage);
router.post("/", authCheck , upload.single('myImage'), sendMessage);
router.get("/:chatId", authCheck, getAllMessages);

export default router;