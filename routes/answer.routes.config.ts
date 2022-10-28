import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';
import prisma from '../prisma'
import {Md5} from 'ts-md5';


export class AnswerRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuestionRoutes');
    }

    configureRoutes() {

        this.app.route(`/api/answer`)
            .post(async (req: express.Request, res: express.Response) => {
                try {
                    if(!req.body.hasOwnProperty('stupidity')) {req.body.stupidity = null}
                    await prisma.answer.create({
                        data: {
                            id: "A-" + Md5.hashAsciiStr(req.body.text),
                            text: req.body.text,
                            stupidity: req.body.stupidity as number,
                            question: {
                                connect: { id: "Q-230f61628b297b66e612c152cfaad967" },
                            }
                        },
        
                    })
                    
                    res.status(201).json({id: "A-" + Md5.hashAsciiStr(req.body.text)})
                } catch(err) {
                    res.status(400).json({message: "There was an error in your Request"})
                }
            });    
        return this.app;
    }
}