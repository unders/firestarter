export class Error {
    readonly code: number;
    readonly status: string;
    readonly header: string;
    readonly message: string;

    constructor(code: number, header: string, message: string) {
        this.code = code;
        this.status = Error.statusText(code);
        this.header = header;
        this.message = message;
    }

    static fromJSON(json: string): Error {
        const body = JSON.parse(json) as JSONError;
        return new Error(body.error.code, body.error.header, body.error.message);
    }

    static statusText(code: number): string {
        switch(code) {
            case 400: {
                // if a form is invalid (form validation)
                return "Bad Request";
            }
            case 401: {
                // if the user must be logged in to perform the action
                return "Unauthorized";
            }
            case 403: {
                // if logged in user does not have access to the resource
                return "Forbidden";
            }
            case 404: {
                // if trying to edit a removed resource (edit of form)
                return "Not Found";
            }
            case 409: {
                // two users are editing the same resource
                return "Conflict";
            }
            case 500: {
                // the server crashed for unknown reason
                return "Internal Server Error";
            }
            case 503: {
                // the server is overloaded with request
                return "Service Unavailable";
            }
            default: {
                return "Unknown error";
            }
        }
    }
}

interface JSONError {
    error: JSONErrorBody;
}

interface JSONErrorBody {
    code: number;
    status: string;
    header: string;
    message: string;
}

