import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';



export class AnswerRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuestionRoutes');
    }

    configureRoutes() {

        this.app.route(`/api/answer`)
            .post(async (req: express.Request, res: express.Response) => {
                try {
                    if(!req.body.hasOwnProperty('stupidity')) {req.body.stupidity = null}
                    res.status(200);
                } catch(err) {
                    res.status(400).json({message: "There was an error in your Request"});
                }
            });    
        return this.app;
    }
}