export class Comment {
   readonly body: string;

    constructor(body: string) {
       this.body = body;
    }
}

export class CommentError {
    body: string;
    err: string;

    constructor(body: string, err: string) {
        this.body = body;
        this.err = err;
    }
}
