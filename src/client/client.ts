import { Error } from '../data/error';

export class Request {
    readonly ok: boolean;
    readonly data: object;

    constructor(ok: boolean, data: object) {
        this.ok = ok;
        this.data = data;
    }
}

export class Response {
    readonly value: string;
    readonly err: Error | null;

    constructor(value:string, err: Error | null) {
        this.value = value;
        this.err = err;
    }
}

export interface Poster {

    /**
     * @example
     *          const {value, err} = await client.post(req));
     *          if (err) {
     *              ...
     *          } else {
     *              ...
     *          }
     *
     */
    post(req: Request): Promise<Response>;
}

export class Client {
    static async post(req: Request): Promise<Response> {
        return new Promise<Response>((resolve) => {


            if (req.ok) {
                const resp = new Response("OK", null);
                resolve(resp);
            } else {
                const resp = new Response("NOK", new Error(500, {}, ""));
                resolve(resp);
            }
        });
    }
}
