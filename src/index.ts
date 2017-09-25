import { App }  from "./app/app"
import { Comment } from './data/comment'
import { Client } from "./client/client"
import { Env } from "./data/env";
import { CommentService } from "./service/comment";

// This is rendered on the server...
declare function funcboxComments() : Comment[];

const main = () => {
    const env = new Env("dev");
    const client = Client.make(env);
    const commentService = new CommentService(client, funcboxComments());
    const app = new App(commentService);
    app.render();
};

main();
