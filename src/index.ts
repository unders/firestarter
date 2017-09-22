import { App }  from "./app/app"
import { Client } from "./client/client"
import { Env } from "./data/env";

const main = () => {
    const env = new Env("dev");
    const client = Client.make(env);

    const app = new App(client);
    app.render();
};

main();
