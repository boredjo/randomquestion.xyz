import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';
import prisma from '../prisma'
import {Md5} from 'ts-md5';


export class QuestionRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuestionRoutes');
    }

    configureRoutes() {

        this.app.route(`/api/question`)
            .get(async (req: express.Request, res: express.Response) => {
                const questionCount = await prisma.question.count();
                const skip = Math.floor(Math.random() * questionCount);
                const question =  await prisma.question.findMany({
                    take: 1,
                    skip: skip,
                    orderBy: {
                        id: 'desc',
                    },
                });
                res.status(200).send(question[0]);
            })
            .post(async (req: express.Request, res: express.Response) => {
                if(!req.body.hasOwnProperty('stupidity')) {req.body.stupidity = null}
                try {
                    await prisma.question.create({
                        data: {
                            id: "Q-" + Md5.hashAsciiStr(req.body.text),
                            text: req.body.text,
                            calls: 0,
                            stupidity: req.body.stupidity as number
                        },
                    })
                    res.status(201).json({id: "Q-" + Md5.hashAsciiStr(req.body.text)})
                } catch(err) {
                    res.status(400).json({message: "There was an error in your Request"})
                }
                
            });
    
        this.app.route(`/api/question/:id`)
            .get(async (req: express.Request, res: express.Response) => {
                const QuestionById = await prisma.question.findUnique({
                    where: {                  
                      id: req.params.id,                  
                    },
                  })
                res.status(200).send(QuestionById);
            })
        
        this.app.route(`/api/question/:id/answers`)
            .get(async (req: express.Request, res: express.Response) => {
                const answers = await prisma.answer.findMany({
                    where: {
                      questionId: req.params.id,
                    },
                  })
                res.status(200).send(answers);
            })
    
        return this.app;
    }
}