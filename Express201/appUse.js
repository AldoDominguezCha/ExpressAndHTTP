const express = require('express');

const app = express();

/*  Express is mainly two things:
      1. Router
      2. Series of middleware that comprises a web framework
*/

function validateUser (req, res, next) {
    /* In a typical middleware function we could 
       get info out of the request object,
       do some stuff in the database
    */

    res.locals.validated = true;
    console.log('Mock validation took place');

    /* The next function is to hand over control of 
       the process to the next middleware function in line*/
    next();
};

/* This will run the 'validateUser' middleware
   on the '/admin' path, all methods
*/

app.use('/admin', validateUser);

app.get('/', (req, res, next) => {
    res.send('<h1>Main page</h1>');
    console.log(res.locals.validated);
});

app.get('/admin', (req, res, next) => {
    res.send('<h1>Admin page</h1>');
    console.log(res.locals.validated);
});

app.listen(3000, () => console.log('HTTP server with express listening on port 3000'));