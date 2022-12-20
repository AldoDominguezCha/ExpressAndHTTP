const express = require('express');

let userRouter = express.Router();

function validateUser(req, res, next) {
    
    /* Maybe some validation logic, and then...*/
    res.locals.validated = true;
    console.log('User validated with the middleware registered in the user router');
    next();
};

/* validateUser is middleware that is only registered for this
   user router, in other words, the app main router doesn't know about it */

/* The router can be thought as a way to create a bunch of mini apps inside of the
   main app, sort of micro-systems (NOT microservices), the router will allow us
   to maintain our app very clean and concern-segmented
*/

userRouter.use(validateUser);

userRouter.get('/health', (req, res, next) => {
    res.json({
        status: 'OK',
        message: 'The user is healthy',
    });
});

module.exports = userRouter;