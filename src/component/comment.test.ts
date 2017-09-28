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

    async submitForm(text: string) {
        const el = this.root.querySelector("[data-submit]") as HTMLElement;
        expect(el).not.toBeNull();
        el.click();
        expect(this.formWidget.form.klass).toEqual(css.hide);
        expect(this.formWidget.placeholder.klass).toEqual(css.show);
        expect(this.formWidget.form.klass).toEqual(css.hide);
        expect(this.formWidget.submit.disable).toBeFalsy();
        expect(this.formWidget.data.body).toEqual("");
        await this.mock.simulateResponse(200, "{}");
        await sleep(1);
        expect(this.listWidget.comments[0].data.body).toEqual(text);
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
        });

        test("#PublishForm()", async () => {
            page.showForm();
            page.submitInvalidForm();
            comment.render();
            expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();

            page.writeComment("This is a comment text.");
            comment.render();
            await page.submitForm("This is a comment text.");
            comment.render();
            expect(adjustSnap(document.body.innerHTML)).toMatchSnapshot();
        });

    })
});
