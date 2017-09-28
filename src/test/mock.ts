import { Client, Request, Headers } from  '../client/client'


export const newClient = (): [XMLHttpRequestMock, Client] => {
    const mock = new XMLHttpRequestMock();
    const client = new Client("localhost:8000", new Headers(), 0);
    Client.newRequest = (): Request => { return mock; };
    return [mock, client];
};


export class XMLHttpRequestMock implements Request {
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
