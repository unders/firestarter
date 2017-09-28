import { CSS as css } from '../data/css';
import { CommentService } from '../service/comment';
import { CommentComponent } from './comment';
import { CommentFormWidget, CommentListWidget } from '../data/comment';
import { newClient} from "../test/mock";
import {adjustSnap, sleep} from "../test/helper";
import { State } from "../data/state";
import { XMLHttpRequestMock } from "../test/mock";


class Pager {
    private readonly mock: XMLHttpRequestMock;
    private readonly root: HTMLElement;
    private readonly formWidget: CommentFormWidget;
    private readonly listWidget: CommentListWidget;

    constructor(root: HTMLElement, form: CommentFormWidget, list: CommentListWidget, mock: XMLHttpRequestMock) {
        this.root = root;
        this.formWidget = form;
        this.listWidget = list;
        this.mock = mock
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
        expect(this.formWidget.submit.disable).toBeFalsy();
        expect(this.formWidget.data.body).toEqual("");
    }
    submitInvalidForm() {
        const el = this.root.querySelector("[data-submit]") as HTMLElement;
        expect(el).not.toBeNull();
        el.click();
        expect(this.formWidget.placeholder.klass).toEqual(css.hide);
        expect(this.formWidget.form.klass).toEqual(css.error);
    }
    writeComment(text: string) {
        const el = this.root.querySelector("[data-body]") as HTMLTextAreaElement;
        expect(el).not.toBeNull();
        el.value = text;
        const evt = new Event("input", {
            'bubbles': true,
            'cancelable': true
        });
        el.dispatchEvent(evt);
        expect(this.formWidget.form.klass).toEqual(css.empty);
        expect(this.formWidget.data.body).toEqual(text);
    }
    async submitForm(status: number) {
        const el = this.root.querySelector("[data-submit]") as HTMLElement;
        expect(el).not.toBeNull();
        el.click();
        expect(this.formWidget.form.klass).toEqual(css.hide);
        expect(this.formWidget.placeholder.klass).toEqual(css.show);
        expect(this.formWidget.submit.disable).toBeFalsy();
        expect(this.formWidget.data.body).toEqual("");
        await this.mock.simulateResponse(status, "{}");
    }
    hasHighlightedComment(index: number, want: string) {
        const comment = this.listWidget.comments[index];
        expect(comment.data.body).toEqual(want);
        expect(comment.klass).toEqual(css.highlight);
        expect(comment.errorKlass).toEqual(css.hide);
    }
    hasErrorComment(index: number, want: string) {
        const comment = this.listWidget.comments[index];
        expect(comment.data.body).toEqual(want);
        expect(comment.klass).toEqual(css.errHighlight);
        expect(comment.errorKlass).toEqual(css.show);
    }
}

describe("CommentComponent", () => {
    const [mock, client] = newClient();
    const state = State.newIState();
    const service = new CommentService(client, []);
    service.init(state);
    document.body.innerHTML = '<div id="funcbox-comment"></div>';
    const root = document.querySelector("#funcbox-comment") as HTMLElement;
    CommentComponent.timeout = () => { return 0; };
    const comment = new CommentComponent({ root: root, service: service, state: state });
    const s = state.getState();
    const page = new Pager(root, s.commentFormWidget, s.commentListWidget, mock);

    test("#render()", () => {
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });

    test("show form", () => {
        page.showForm();
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });

    test("cancel form", () => {
        page.cancelForm();
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
    });

    test("publish form", async () => {
        // Add comment without any text
        page.showForm();
        page.submitInvalidForm();
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();

        // add valid comment
        page.writeComment("This is a comment text.");
        comment.render();
        await page.submitForm(200);
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
        await sleep(1);
        page.hasHighlightedComment(0,"This is a comment text.")

        // add comment that fails on server...
        page.writeComment("This is another comment.");
        comment.render();
        await page.submitForm(500); // crash on server
        comment.render();
        expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
        await sleep(1);
        page.hasErrorComment(0, "This is another comment.")
    });

});
