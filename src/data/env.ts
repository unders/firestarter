export class Env {
    readonly env: string = "prod";

    constructor(env: string) {
        switch(env) {
            case "dev": {
                this.env = "dev";
                break;
            }
            case "test": {
                this.env = "test";
                break;
            }
            default: {
                this.env = "prod";
            }
        }
    }

    isProd(): boolean {
        return (this.env === "prod");
    }
}
