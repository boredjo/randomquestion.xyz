export class Question {
    id: string;
    body: string;
    calls: number;
//    private author: User;


    public constructor(id: string, body: string, calls: number) {
        this.id = id;
        this.body = body;
        this.calls = calls;
    }


}