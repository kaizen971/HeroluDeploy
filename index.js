import express from 'express';
import './models/dbConfig.js';
import Routes from './routes/routes.js';
import session from 'express-session'
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';

const app = express();
var port = process.env.PORT || 8000;


app.listen(port, function() {
    console.log("App is running on port " + port);
});

app.use(bodyParser.json());
app.use(
    session({
      name: 'Green_Searcher',
      secret: 'Green_Searcher',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: "mongodb+srv://Kaizen971:Pokemon971971@greensearcher.du860nt.mongodb.net/GreenSearcher?retryWrites=true&w=majority" }),
      cookie: { maxAge: 24 * 3600 * 1000 },
    })
  );

app.use('/product', Routes);
