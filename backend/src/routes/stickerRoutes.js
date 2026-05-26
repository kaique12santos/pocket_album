import express from 'express';
import { getAllStickers, getStickerById } from '../controllers/stickerController.js';

const router = express.Router();

router.get('/', getAllStickers);
router.get('/:id', getStickerById);

export default router;