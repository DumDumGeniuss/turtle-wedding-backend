import http from 'http';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config/config';
import db from './lib/db.js';

let app = express();
app.server = http.createServer(app);
console.log('The mode now is ' + process.env.NODE_ENV);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// internal middleware
app.use(middleware);

// api router
app.use('/api', api);

const server = http.createServer(app);
server.listen(process.env.PORT || config.port);

// console.log(`Started on port ${app.server.address().port}`);

export default app;
