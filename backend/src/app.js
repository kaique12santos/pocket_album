import express from 'express';
import cors from 'cors';
import stickerRoutes from './routes/stickerRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => res.send('API Pocket Album Rodando! ⚽'));
app.use('/api/stickers', stickerRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/profiles', profileRoutes);


export default app;