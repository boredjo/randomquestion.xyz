import express from 'express';
import * as http from 'http';
import cors from 'cors';

import {CommonRoutesConfig} from './routes/common.routes.config';
import {QuestionRoutes} from './routes/question.routes.config';
import {AnswerRoutes} from './routes/answer.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000
const routes: Array<CommonRoutesConfig> = [];
const path = require('path');
const runningMessage = `Server running at http://localhost:${port}`;

const allowedOrigins = ['http://dev.jokaendler'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// app.use(cors(options));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'frontend/build')));

routes.push(new QuestionRoutes(app));
routes.push(new AnswerRoutes(app));

// host react app
app.get('*', (req: any,res: any) => {
   res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {});
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});




 


//import express from "express";
// require('dotenv').config();

// const PORT = process.env.PORT || 3000
// const path = require('path');
// const app = express()

// //const questionRouter = require('./routes/question.router')


// app.use(express.json())
// app.use(express.static(path.join(__dirname, 'build')));

// //app.use('/api/question', questionRouter)

// app.get('/api', (req: any, res: any) => {

//     res.status(200).json({message: "Hello World!"})
// })


// app.get('*', (req: any,res: any) => {
//     res.sendFile(path.join(__dirname, 'build/index.html'));
//    });

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
