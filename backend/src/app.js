import express from 'express';
import cors from 'cors';
// import stickerRoutes from './routes/stickerRoutes.js'; // Exemplo de rota futura

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => res.send('API Pocket Album Rodando! ⚽'));
// app.use('/stickers', stickerRoutes);

export default app;