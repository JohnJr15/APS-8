require('dotenv').config();

const express = require('express');
const { application } = require('./config');
const Routes = require('./src/routes/Routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', Routes);

const port = application.port || 3000;

app.listen(port, () => {
    console.log(`Application running on ${application.baseUrl}:${port}`);
});