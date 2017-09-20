import { Error } from '../data/error';
import {Comment, CommentError} from '../data/comment';
import {Env} from "../data/env";

export class Response {
    readonly json: string;
    readonly err: Error | null;

    constructor(json: string, err: Error | null) {
        this.json = json;
        this.err = err;
    }
}

export interface Poster {

    /**
     * @example
     *          const {json, err} = await client.post(json));
     *          if (err) {
     *              ...
     *          } else {
     *              ...
     *          }
     *
     */
    post(json: string): Promise<Response>;
}

export class Client {
    static make(env: Env): Poster {
        if (!env.isProd()) {
            return new MockClient();
        }
        return new Client();
    }

    async post(json: string): Promise<Response> {
        return new Promise<Response>((resolve) => {
                const resp = new Response("No implementation" + json, null);
                resolve(resp);
        });
    }
}

interface WithBody {
    body: string;
}

class MockClient {
    post(json: string): Promise<Response> {
        return new Promise<Response>((resolve) => {
            const data = JSON.parse(json) as WithBody;

            switch(data.body) {
                case "400": {
                    const comment = new CommentError("400", "400 is a number an not a valid comment.");
                    const json = JSON.stringify(comment); // this is how it comes from the server.
                    const err = new Error(400, "Bad Request", JSON.parse(json));
                    const j =  JSON.stringify(err);
                    const resp = new Response(j, err);
                    resolve(resp);
                    break;
                }
                default: {
                    // when it works...
                    const comment = new Comment(data.body);
                    const resp = new Response(JSON.stringify(comment), null);
                    setTimeout(resolve, 1000, resp);
                    break;
                }
            }
        });
    }
}
