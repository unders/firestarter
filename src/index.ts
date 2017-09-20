import * as comment from "./component/comment"
import {Client} from "./client/client"
import {Env} from "./data/env";

const main = () => {
    const env = new Env("dev");

    new comment.Component({
            root: "#funcbox-comment",
            client: Client.make(env),
            comments:  [{body: "This is the body text. Very cool"}],
            listTitle: "Comments"
        });
};

main();
