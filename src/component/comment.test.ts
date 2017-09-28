import { CSS as css } from '../data/css';
import { CommentService } from '../service/comment';
import { CommentComponent } from './comment';
import { CommentFormWidget } from '../data/comment';
import { newClient} from "../test/mock";
import { adjustSnap } from "../test/helper";
import { State } from "../data/state";


class Pager {
    private readonly root: HTMLElement;
    private readonly formWidget: CommentFormWidget;

    constructor(root: HTMLElement, form: CommentFormWidget) {
        this.root = root;
        this.formWidget = form;
    }

    showForm() {
        const el = this.root.querySelector("[data-showForm]") as HTMLElement;
        expect(el).not.toBeNull();
        el.click();
        expect(this.formWidget.placeholder.klass).toEqual(css.hide);
        expect(this.formWidget.form.klass).toEqual(css.show);
    }
    cancelForm() {
        const el = this.root.querySelector("[data-cancel]") as HTMLElement;
        expect(el).not.toBeNull();
        el.click();
        expect(this.formWidget.placeholder.klass).toEqual(css.show);
        expect(this.formWidget.form.klass).toEqual(css.hide);
    }
}


describe("CommentComponent", () => {
    const [mock, client] = newClient();
    const state = State.newIState();
    const service = new CommentService(client, []);
    service.init(state);
    document.body.innerHTML = '<div id="funcbox-comment"></div>';
    const root = document.querySelector("#funcbox-comment") as HTMLElement;
    const page = new Pager(root, state.getState().commentFormWidget);
    const comment = new CommentComponent({ root: root, service: service, state: state });

    test("#render()", () => {
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });

    describe("#form", () => {
        test("#showForm()", () => {
            page.showForm();
            comment.render();
            expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
        });

        test("#cancelForm()", () => {
            page.cancelForm();
            comment.render();
            expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
        })

    })
});
