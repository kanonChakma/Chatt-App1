
import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageController.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router()
router.post("/", authCheck , sendMessage);
//router.post("/", authCheck , avatarUpload);
router.get("/:chatId", authCheck, getAllMessages);

export default router;