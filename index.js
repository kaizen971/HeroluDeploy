import express from 'express';
import Routes from './routes/routes.js';

const app = express();


app.listen(8080)


app.use('/product', Routes);
