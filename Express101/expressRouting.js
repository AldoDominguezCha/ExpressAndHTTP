const express = require('express');

const app = express();

/* 'app' has a few methods matching the HTTP REST verbs
     1. GET
     2. POST
     3. DELETE
     4. PUT
    When making an HTTP request, we need to specify the request method
    so we can indicate the desired action to be performed on the targeted
    resource(s). The default for all browsers is always a GET request
*/

// app.all('/', (req, res) => {
//     res.send('<h1>Welcome to the home page!</h1>');
// });

app.get('/', (req, res) => {
    console.log(req);
    res.send('<h1>Welcome to the GET home page!</h1>');
});

app.post('/', (req, res) => {
    console.log(req);
    res.send('<h1>Welcome to the POST home page!</h1>');
});

app.listen(3000, () => console.log('HTTP server with express listening on port 3000'));