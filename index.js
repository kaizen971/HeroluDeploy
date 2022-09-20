import express from 'express';
import Routes from './routes/routes.js';

const app = express();
var port = process.env.PORT || 8000;


app.listen(port, function() {
    console.log("App is running on port " + port);
});


app.use('/product', Routes);
