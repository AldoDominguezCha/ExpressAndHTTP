const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(express.static('public'));

/* req.body only exists because the 
   express.json() and express.urlencoded()
   middleware created it
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ajax', (req, res) => {
    console.log(req.body);
    res.json('Test');
});

app.listen(3000);