/* path is a native module to node */

const path = require('path');

/* Express is node, it's a node module distributed by npm,
   unlike http which is a native node module, we need to
   run npm install express to obtain the express module
*/

const express = require('express');

/* What we are storing in the express constant is the default export from the index.js file
   in the express module, which is a function called 'createApplication', that's why to
   obtain 'app' we invoke this function we have stored in 'express', 'app' is itself an object
   with a ton of methods and properties
*/

const app = express();

/* Serve up static files with only one line, 
   using the middleware registration/invocation
   method (app.use) 
*/

app.use(express.static('public'));

/* 'all' is a method in 'app', it takes two arguments:
     1. Route
     2. Callback function to execute if the route is requested 
*/

app.all('/', (req, res) => {

    /* Express handles the basic headers (status code and mime-type)
       Express also handles the end of the request. 'all' catches any
       HTTP method for the declared route
    */

    // res.send('<h1>With Express - This is the home page</h1>');
    console.log(path.join(__dirname + '/node.html'));
    res.sendFile(path.join(__dirname + '/node.html'));
});

app.listen(3000, () => console.log('HTTP server with express listening on port 3000'));