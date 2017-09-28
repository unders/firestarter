import { CSS as css } from '../data/css';
import { CommentService } from '../service/comment';
import { CommentComponent } from './comment';
import { newClient} from "../test/mock";
import { adjustSnap } from "../test/helper";
import { State } from "../data/state";

describe("CommentComponent", () => {
    const [mock, client] = newClient();
    const state = State.newIState();
    const service = new CommentService(client, []);
    service.init(state);
    const widget = state.getState().commentFormWidget;
    document.body.innerHTML = '<div id="funcbox-comment"></div>';
    const root = document.querySelector("#funcbox-comment");

     const comment = new CommentComponent({
         root: root,
         commentService: service,
         state: state
     });
    comment.render();

    test("#render()", () => {
        const got = adjustSnap(document.body.innerHTML);
        expect(got).toMatchSnapshot();
    });

    describe("#form", () => {
        test("#showForm()", () => {
            const el = document.body.querySelector(".funcbox-placeholder") as HTMLElement;
            el.click();
            expect(widget.placeholder.klass).toEqual(css.hide);
            expect(widget.form.klass).toEqual(css.show);

            comment.render();
            const got = adjustSnap(document.body.innerHTML);
            expect(got).toMatchSnapshot();
        });

        test("#cancelForm()", () => {
            const el = document.body.querySelector("[data-cancel]") as HTMLElement;
            el.click();
            expect(widget.placeholder.klass).toEqual(css.show);
            expect(widget.form.klass).toEqual(css.hide);

            comment.render();
            const got = adjustSnap(document.body.innerHTML);
            expect(got).toMatchSnapshot();
        })

    })
});
