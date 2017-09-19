import * as comment from "./component/comment"
import {Client} from "./client/client"

const main = () => {
    new comment.Component({
            root: "#funcbox-comment",
            client: Client,
            comments:  [{body: "This is the body text. Very cool"}],
            listTitle: "Comments"
        });
};

main();
