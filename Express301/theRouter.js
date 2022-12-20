const express = require('express');

let router = express.Router();

router.get('/check', (req, res, next) => {
    res.json({
        message: 'Router works',
    });
});

module.exports = router;