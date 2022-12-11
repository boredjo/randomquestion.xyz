import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';
import { Answer } from '../models/answer';
import { Question } from '../models/question';



export class AnswerRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuestionRoutes');
    }

    configureRoutes() {

        this.app.route(`/api/answer/`)
            .post(async (req: express.Request, res: express.Response) => {
                try {
                    req.body.question = new Question(req.body.question.id, req.body.question.body, req.body.question.calls);
                    const newAnswer = Answer.fromBody(req.body.body, req.body.question);
                    console.log(newAnswer);
                    newAnswer.save((answer: Answer) => {
                        res.status(200).send(answer);
                    });
                } catch(err) {
                    console.log(err);
                    res.status(400).json({message: "There was an error in your Request"});
                }
            });  
            
        this.app.route(`/api/answers/:id`)
            .get(async (req: express.Request, res: express.Response) => {
                try {
                    await Question.getById(req.params.id, (question: Question) => {
                        Answer.getFromQuestion(question, (answers: Answer[]) => {
                            res.status(200).send(answers);
                        })
                    });
                } catch(err) {
                    console.log(err);
                    res.status(400).json({message: "There was an error in your Request"});
                }
            }); 

        return this.app;
    }
}