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
        const queryString = `SELECT * FROM answers WHERE question = ? LIMIT 1`
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

//    private author: User;
/*
    public save(callback: (questions: Question) => void) {
        const queryString = `INSERT INTO questions (body) VALUES (?)`;
        db.execute(queryString, [this.body]);
        this.findByBody(callback);
    
    }

    public static getRandom(callback: (questions: Question) => void): void {
        const queryString = `SELECT * FROM questions ORDER BY RAND() LIMIT 1`
        db.query(queryString, (err, result) => {
            const rows = <RowDataPacket[]> result;
            // console.log(rows)
            
            const question:Question = new Question(
                rows[0].id,
                rows[0].body,
                rows[0].calls
            )
            question.increaseCalls();
            callback(question);          
        });
    }

    public static getById(id: string, callback: (questions: Question) => void): void {
        const queryString = `SELECT * FROM questions WHERE id = ? LIMIT 1`
        db.query(queryString, [id], (err, result) => {
            const rows = <RowDataPacket[]> result;
            const question:Question = new Question(
                rows[0].id,
                rows[0].body,
                rows[0].calls
            )
            question.increaseCalls();
            callback(question);          
        });
    }

    public static getAll(callback: (questions: Question[]) => void ): void {
        const questions: Question[] = [];
        const queryString = `SELECT * FROM questions`
        db.query(queryString, (err, result) => {
            const rows = <RowDataPacket[]> result;
            // console.log(rows)
            rows.forEach(row => {
                const question:Question = new Question(
                    row.id,
                    row.body,
                    row.calls
                )
                console.log(question)
                questions.push(question);
            });
            callback(questions);          
        });
    }

    private increaseCalls(): void {
        const queryString = `UPDATE questions SET calls = calls + 1 WHERE id = ?`
        db.query(queryString, [this.id]);
        // console.log(this.id);
    }

    private findByBody(callback: (questions: Question) => void): void {
        const queryString = `SELECT * FROM questions WHERE body = ? LIMIT 1`
        db.query(queryString, [this.body],  (err, result) => {
            const rows = <RowDataPacket[]> result;
            const question:Question = new Question(
                rows[0].id,
                rows[0].body,
                rows[0].calls
            )
            callback(question);          
        });
    }

    public static fromBody(body: string): Question {
        return new this("", body, 0);
    }

    public constructor(id: string, body: string, calls: number) {
        this.id = id;
        this.body = body;
        this.calls = calls;
    }

    public getId(): string {
        return this.id;
    }

    public getBody(): string {
        return this.body;
    }

    public getCalls(): number {
        return this.calls;
    }

    public toString(): string {
        return "Question: {\n\tid: " + this.id + ",\n\tbody: " + this.body + ",\n\tcalls: " + this.calls +"\n}";
    }
    */
}