import express from 'express';
import { accessChat, fetchChats, groupChat, renameGroup } from '../controllers/chattControllers.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route("/").post(authCheck, accessChat).get(authCheck,fetchChats);
router.post("/group", authCheck, groupChat);
router.put("/rename", authCheck, renameGroup);
router.post("/add", authCheck)
export default router;