import { OkPacket, RowDataPacket } from "mysql2";
import {db} from "../mysql";
import { Question } from "./question";

export class Answer {
    private id: string;
    private body: string;
    private question: Question

    public constructor(id: string, body: string, question: Question) {
        this.id = id;
        this.body = body;
        this.question = question;
    }

    public static fromBody(body: string, question: Question): Answer {
        return new this("", body, question);
    }

    public save(callback: (answer: Answer) => void) {
        console.log(this);
        const queryString = `INSERT INTO answers (body, question) VALUES (?, ?)`;
        db.execute(queryString, [this.body, this.question.getId()]);

        this.findByBody(callback);
    }

    private findByBody(callback: (answer: Answer) => void): void {
        const queryString = `SELECT * FROM answers WHERE body = ? LIMIT 1`
        db.query(queryString, [this.body],  (err, result) => {
            const rows = <RowDataPacket[]> result;
            console.log(rows)
            Question.getById(rows[0].question, (question: Question) => {
                const answer:Answer = new Answer(
                    rows[0].id,
                    rows[0].body,
                    question
                )
                callback(answer);          
            })
        });
    }

    public static getFromQuestion(question: Question, callback: (answers: Answer[]) => void): void {
        const queryString = `SELECT * FROM answers WHERE question = ? LIMIT 10`
        db.query(queryString, [question.getId()],  (err, result) => {
            const rows = <RowDataPacket[]> result;
            const answers: Answer[] = [];
            rows.forEach(row => {
                const answer:Answer = new Answer(
                    row.id,
                    row.body,
                    question
                )
                answers.push(answer);
            });
            callback(answers);          
        });
        
    }
}