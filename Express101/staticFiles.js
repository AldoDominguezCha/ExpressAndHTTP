const express = require('express');

const app = express();

/* 'app' comes with a 'use' method,
   this is how you invoke most middleware in express.
   'use' takes one argument, the middleware function you
   want to run
*/

app.use(express.static('public'));

app.listen(3000, () => console.log('HTTP server with express listening on port 3000'));