import express from 'express';
import { getTouristSpots } from '../controllers/mapController.js';

const router = express.Router();

router.get('/tourist-spots', getTouristSpots);

export default router;