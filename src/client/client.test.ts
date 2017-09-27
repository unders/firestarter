import { Error } from '../data/error'
import { Client, Headers, Request} from  './client'

//
//      TEST MOCK
//
class XMLHttpRequestMock implements Request {
    responseText: string;
    status: number;
    timeout: number;

    setRequestHeader(header: string, value: string): void {

    }
    open(method: string, url: string): void {

    }
    send(data?: string): void {

    }
    onloadend: (this: Request, ev: ProgressEvent) => any;
    ontimeout: (this: Request, ev: ProgressEvent) => any;

    //
    // Simulation methods
    //
    async simulateTimeout() {
        await this.sleep(1);
        this.ontimeout(new ProgressEvent("xx"));
    }

    async simulateResponse(status: number, responseText: string) {
        await this.sleep(1);
        this.status = status;
        this.responseText = responseText;
        this.onloadend(new ProgressEvent("xx"));
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


describe("Client", () => {
    const mock = new XMLHttpRequestMock();
    const client = new Client("localhost:8000", new Headers(), 0);
    Client.newRequest = (): Request => {
        return mock;
    };

    test("#post returns Error when timeout (status:503)", async () => {
        expect.assertions(1);
        mock.simulateTimeout();
        const {json, err} = await client.post("/api/comments/", "{}");
        if (err) {
            expect(err.code).toEqual(503);
        }
    });

    test("#post returns Error when status > 299 and status < 500", async () => {
        expect.assertions(1);
        const error = new Error(304, "header", "Message");
        mock.simulateResponse(304, error.toJSON());
        const {json, err} = await client.post("/api/comments/", "{}");
        if (err) {
            expect(err.code).toEqual(304);
        }
    });

    test("#post returns Error when status > 499", async () => {
        expect.assertions(1);
        mock.simulateResponse(500, "");
        const {json, err} = await client.post("/api/comments/", "{}");
        if (err) {
            expect(err.code).toEqual(500);
        }
    });

    test("#post returns json when success (status < 300)", async () => {
        expect.assertions(2);
        mock.simulateResponse(299, `{'status': "ok"}`);
        const {json, err} = await client.post("/api/comments/", "{}");
        expect(err).toBeNull();
        expect(json).toEqual(`{'status': "ok"}`);
    });
});

