const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));

// Serve up static files

app.use(express.static('public'));

/* Parse json and url encoded data
   into req.body */

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
    res.render("index");
});

app.listen(3000, () => console.log('HTTP server with express listening on port 3000'));