const express = require('express');
const scriptsRouter = require('./scripts.router');

const app = express();

app.use('/api/scripts', scriptsRouter);

app.listen(8000);
