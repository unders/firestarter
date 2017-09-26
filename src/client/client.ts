import { Error } from '../data/error';
import { Comment } from '../data/comment';
import { Env } from "../data/env";

export class Response {
    readonly json: string;
    readonly err: Error | null;

    constructor(json: string, err: Error | null) {
        this.json = json;
        this.err = err;
    }
}

export interface XHR {

    /**
     * @example
     *          const {json, err} = await xhr.post(path, json));
     *          if (err) {
     *              ...
     *          } else {
     *              ...
     *          }
     *
     */
    post(path: string, json: string): Promise<Response>;
}

export class Headers {
    [key: string]: string;
}

//
// https://xhr.spec.whatwg.org/
//
export class Client {
    readonly timeout: number = 5000; // time in milliseconds (default = 5 seconds)
    readonly headers: Headers;
    readonly host: string; // http://localhost:8080

    constructor(host:string, headers: Headers, timeout: number) {
        this.host = host;
        this.headers = headers;
        this.headers['Content-Type'] = 'application/json; charset=utf-8';
        if (timeout !== 0) {
            this.timeout = timeout;
        }
    }

    static make(env: Env, host: string, headers: Headers, timeout: number): XHR {
        if (!env.isProd()) {
            return new MockClient();
        }
        return new Client(host, headers, timeout);
    }

    async post(path: string, json: string): Promise<Response> {
        return new Promise<Response>((resolve) => {
            try {
                const xhr = new XMLHttpRequest();
                for (let key in this.headers) {
                    xhr.setRequestHeader(key, this.headers[key]);
                }
                xhr.timeout = this.timeout;
                xhr.open("POST", this.host + path);

                xhr.ontimeout = (e: ProgressEvent) => {
                    e.preventDefault();
                    const header = "Request Timeout";
                    const message = "Request took to long, please try again.";
                    const err = new Error(503, header, message);
                    const resp = new Response("{}", err);
                    resolve(resp);
                };

                xhr.onloadend = (e: ProgressEvent) => {
                    e.preventDefault();

                    if (xhr.status < 300) {
                        // 200 ... 299
                        const resp = new Response(xhr.responseText, null);
                        resolve(resp);
                    } else if (xhr.status > 299 && xhr.status < 500) {
                        // 400 .. 499
                        const err =  Error.fromJSON(xhr.responseText);
                        const resp = new Response("{}", err);
                        resolve(resp);
                    } else if (xhr.status === 503) {
                        const header = "Request Timeout";
                        const message = "Request took to long, please try again.";
                        const err = new Error(xhr.status, header, message);
                        const resp = new Response("{}", err);
                        resolve(resp);
                    } else {
                        const header = "A server problem";
                        const message = "It was a problem on our server, please try again.";
                        const err = new Error(xhr.status, header, message);
                        const resp = new Response("{}", err);
                        resolve(resp);
                    }
                };

                xhr.send(json);
            } catch (e) {
                // TODO: log the error
                const header = "The Request failed";
                const message = "We are investigating the problem, please try again.";
                const err = new Error(500, header, message);
                const resp = new Response("{}", err);
                resolve(resp);
            }
        })
    }
}

interface WithBody {
    body: string;
}

class MockClient {
    post(path: string, json: string): Promise<Response> {
        return new Promise<Response>((resolve) => {
            const data = JSON.parse(json) as WithBody;

            switch(data.body) {
                case "400": {
                    const header = "Your comment is not valid, you can do better";
                    const message = "400 is a number and that is not a valid comment.";
                    const err = new Error(400, header, message);
                    const resp = new Response("{}", err);
                    resolve(resp);
                    break;
                }
                default: {
                    // When it works
                    const comment = new Comment(data.body);
                    const resp = new Response(JSON.stringify(comment), null);
                    setTimeout(resolve, 1000, resp);
                    break;
                }
            }
        });
    }
}
