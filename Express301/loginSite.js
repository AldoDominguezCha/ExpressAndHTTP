const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {


    if (req.query.msg === 'fail') {
        res.locals.msg = 'Invalid credentials';
    } else {
        res.locals.msg = '';
    }
    
    /* Send the process on to the next piece of middleware */

    next();

});

/* This middleware will run before every route
   that has a parameter named 'storyId'
   in the path 
*/

app.param('storyId', (req, res, next, storyId) => {

    console.log(storyId);
    next();

});

app.get('/', (req, res, next) => {
    res.send('Sanity check.');
});

app.get('/login', (req, res) => {

    console.log(req.query);

    res.render('login');
});

app.post('/process_login', (req, res, next) => {

    const { username, password } = req.body;

    if (password === 'x') {
        
        /* A cookie is a small piece of data that a server 
           sends to a user's web browser , the browser may store
           the cookie and send it back to the server in later requests */

        /* res.cookie takes two arguments
             1. Name of the cookie
             2. Value to set it to 
        */ 

        res.cookie('username', username);

        /* res.redirect takes one argument,
           which is where to send the browser */

        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=fail');
    }

});

app.get('/welcome', (req, res, next) => {

    /* Get the 'username' cookie we stored previously
       in the /process_login route, and pass it to the
       ejs template 
    */

    /* req.cookies object will have a matching  property for
       every named cookie that has been set, we need the
       'cookieParser' middleware for req.cookies to be available
    */ 

    res.render('welcome', { username: req.cookies.username });

});

app.get('/logout', (req, res, next) => {

    /* Stop 'remembering' the user since they want to
       log out, we do this by deleting the cookie
       which is holding that username information 
    */
    res.clearCookie('username');

    res.redirect('/login');

});

app.get('/statement', (req, res, next) => {
    
    /* This will render the file IN the browser
       res.sendFile(path.join(__dirname, 'userStatements/bankStatement.png')); 
    */

    /* res has a download method, it takes two args
         1. Filename
         2. (Optional) What you want the filename to
            download as

        The download function is setting the headers!
          1. 'Content-Disposition' to 'attachment; filename="THE_FILENAME"'
    */

    res.download(path.join(__dirname, 'userStatements/bankStatement.png'), '1001_A732h.png'); 

});

app.get('/story/:storyId', (req, res) => {

    res.send(`<h1>Story ${req.params.storyId}</h1>`);

});

app.get('/story/:storyId/details', (req, res) => {

    res.send(`<h1>Story details ${req.params.storyId}</h1>`);

});

app.listen(3000, () => console.log('HTTP server listening on port 3000.'));