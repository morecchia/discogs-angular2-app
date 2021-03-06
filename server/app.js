'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Router = require('./router');
const api = new Router(app);

const port = process.env.PORT || 8888;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

api.start();

app.listen(port);
console.log('Api started on port ' + port);