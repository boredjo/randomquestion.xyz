import { CommonRoutesConfig } from './common.routes.config';
import { Question } from '../models/question'
import express from 'express';



export class QuestionRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuestionRoutes');
    }

    configureRoutes() {

        this.app.route(`/api/question`)
            .get(async (req: express.Request, res: express.Response) => {
                try {
                    await Question.getRandom((question: Question) => {
                        res.status(200).send(question);
                    });
                } catch {
                    res.status(500);
                }
            })
            .post(async (req: express.Request, res: express.Response) => {
                try {
                    const newQuestion = Question.fromBody(req.body.body);
                    newQuestion.save((question: Question) => {
                        res.status(200).send(question);
                    });
                } catch {
                    res.status(400).json({message: "There was an error in your Request"})
                }      
            });
    
        this.app.route(`/api/question/:id`)
            .get(async (req: express.Request, res: express.Response) => {
                try {
                    await Question.getById(req.params.id, (question: Question) => {
                        res.status(200).send(question);
                    });
                } catch {
                    res.status(500);
                }
            })
        
        // this.app.route(`/api/question/:id/answers`)
        //     .get(async (req: express.Request, res: express.Response) => {
        //         res.status(200).send(answers);
        //     })
    
        return this.app;
    }
}