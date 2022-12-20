const express = require('express');
const helmet = require('helmet');

const appRouter = require('./theRouter');
const userRouter = require('./userRouter');

const app = express();

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.use('/test', appRouter);
app.use('/user', userRouter)

app.listen(3001, () => console.log('HTTP server listening on port 3001'));