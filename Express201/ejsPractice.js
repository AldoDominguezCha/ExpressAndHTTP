const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const validateUser = (req, res, next) => {
    // Some validation logic...
    res.locals.validated = true;
    next();
};

app.use(validateUser);

app.get('/', (req, res, next) => {
    res.render("index", {
         name: 'Aldo',
         msg: 'Finished',
         html: `<p><img src="" /></p>`
     });
});

app.listen(3000, () => console.log('HTTP server with express listening on port 3000'));