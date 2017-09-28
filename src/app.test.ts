import {Client, Headers} from "./client/client";
import {App} from "./app/app";
import {CommentService} from "./service/comment";
import {adjustSnap} from "./test/helper";
import {CommentComponent} from "./component/comment";

class Page {
    showForm() {

    }
}

describe("App", () => {
    document.body.innerHTML = '<div id="funcbox-comment"></div>';
    CommentComponent.timeout = () => { return 0; };
    const client = new Client("", new Headers(), 0);
    const commentService = new CommentService(client, []);
    const app = new App(commentService);

    test("#render()", () => {
        app.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });
});
