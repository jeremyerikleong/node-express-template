import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import productRoutes from './routes/products.js'
import logger from './middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// middleware routes
app.use('/api/v1/products', productRoutes);

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
});