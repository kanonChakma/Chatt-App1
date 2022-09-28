
import express from 'express';
import { addMessage, getAllMessages } from '../controllers/messageController.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router()
router.post("/asdfd", addMessage);
router.get("/:chatId", authCheck, getAllMessages);

export default router;