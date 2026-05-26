import express from 'express';
import { getAllQuizzes } from '../controllers/quizController.js';

const router = express.Router();

router.get('/', getAllQuizzes); 

export default router;