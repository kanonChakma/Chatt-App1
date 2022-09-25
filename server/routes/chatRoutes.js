import express from 'express';
import { accessChat } from '../controllers/chattControllers.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router(
    
)
router.route("/").post(authCheck, accessChat)


export default router;