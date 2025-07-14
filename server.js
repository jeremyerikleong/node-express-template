import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import productRoutes from './routes/products.js'
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/error.js';
import notFound from './middlewares/notFound.js'

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// use static folder
// rm comment if want to use static html file
// app.use(express.static(path.join(__dirname, 'public')));

// config for ejs
// rm comment if want to use ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// render from template engine
app.get('/', (_, res) => {
    res.render('index', {
        title: "EJS Templating",
        message: "Hello EJS",
        users: ['John Doe', 'Jane Doe', 'Jessica Doe']
    });
});

// middleware routes
app.use('/api/v1/products', productRoutes);

// middleware error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
});