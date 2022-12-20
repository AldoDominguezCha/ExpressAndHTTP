var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /* const date = new Date(1969, 6, 20);
  res.set('Date', date);
  res.set('X-Powered-By', 'My Stuff');
  res.set('Content-Type', 'text/plain');
  res.set('Cache-Control', 'no-store'); */
  console.log(`Accepts HTML? ${req.accepts('html')}`);
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  
  res.format({
    'text/plain' : () => {
      res.send('Hello, this is just text');
    },
    'text/html' : () => {
      res.send(`<h1>Hello, this is HTML</h1>`)
    },
    'application/json' : () => {
      res.send({ message: 'Hello, this is JSON' })
    },
    'default' : () => {
      res.status(406).send('Not Acceptable');
    }
  });

});

module.exports = router;
