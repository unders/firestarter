import { Error } from './error'

test("Error.fromJSON returns Error when valid json", () => {
    const json = `{ "error": {
                        "code": 400,
                        "header": "This is the header",
                        "message": "a message" }
                  }`;

    const got = Error.fromJSON(json);
    const want = new Error(400, "This is the header", "a message");

    expect(got).toEqual(want);
});

test("Error.fromJSON returns Error when invalid json", () => {
    const json = `{ "error": {
                        "code" 400,
                        "header": "This is the header",
                        "message": "a message" }
                  }`;

    const got = Error.fromJSON(json);
    const want = new Error(500, "A server problem",
        "It was a problem on our server, please try again.");

    expect(got).toEqual(want);
});

test("Error.StatusText returns status text of given code", () => {
   const tests = [
       {code: 400, want: "Bad Request"},
       {code: 401, want: "Unauthorized"},
       {code: 403, want: "Forbidden"},
       {code: 404, want: "Not Found"},
       {code: 409, want: "Conflict"},
       {code: 500, want: "Internal Server Error"},
       {code: 503, want: "Service Unavailable"},
       {code: 499, want: "Unknown Error"}];

   for (let t of tests) {
       const got = Error.statusText(t.code);
       expect(got).toEqual(t.want);
   }
});
