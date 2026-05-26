import express from 'express';
import { getGlobalRanking, addPoints } from '../controllers/profileController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/ranking', getGlobalRanking);
router.post('/score', requireAuth, addPoints);

export default router;