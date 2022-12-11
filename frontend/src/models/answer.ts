import { Question } from "./question";

export class Answer {
    id: string;
    body: string;
    question: Question;
//    private author: User;


    public constructor(id: string, body: string, question: Question) {
        this.id = id;
        this.body = body;
        this.question = question;
    }


}