export class Error {
    readonly code: number;
    readonly text: string;
    readonly description: string;
    readonly value: object;

    constructor(code: number, data: object, desc: string) {
        this.code = code;
        this.text = Error.text(code);
        this.description = desc;
        this.value = data;
    }

    static text(code: number): string {
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
