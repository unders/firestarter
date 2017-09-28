import {Client, Headers} from "../client/client";
import { CSS as css} from '../data/css';
import {App} from "./app";
import {CommentService} from "../service/comment";
import {adjustSnap} from "../test/helper";
import {CommentComponent} from "../component/comment";

class Page {
    readonly app: App;
    constructor(app: App) {
        this.app = app;
    }
    showForm() {
        const root = document.body.querySelector("#funcbox-comment") as Element;
        expect(root).not.toBeNull();
        const el = root.querySelector("[data-showForm]") as HTMLElement;
        expect(el).not.toBeNull();
        el.click();

        const form = this.app.getState().commentFormWidget;
        expect(form.placeholder.klass).toEqual(css.hide);
        expect(form.form.klass).toEqual(css.show);
    }
}

describe("App", () => {
    document.body.innerHTML = '<div id="funcbox-comment"></div>';
    CommentComponent.timeout = () => { return 0; };
    const client = new Client("", new Headers(), 0);
    const commentService = new CommentService(client, []);
    const app = new App(commentService);
    const page = new Page(app);

    test("#render()", () => {
        app.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });

    test("show form", () => {
       page.showForm();
       expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });
});
