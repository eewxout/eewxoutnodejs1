const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/parts', itemRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
