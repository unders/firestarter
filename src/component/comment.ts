import { CSS as css } from '../data/css';
import { IState, State } from "../data/state"
import {
    Comment,
    CommentFormWidget,
    CommentListWidget } from "../data/comment"
import { Dom as dom } from "../dom/dom"
import { CommentService } from "../service/comment";

interface Props {
    root: Element | null;
    state: IState
    service: CommentService;
}

export class CommentComponent {
    readonly root: Element;
    readonly form: Form;
    readonly list: List;
    html: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(props: Props) {
        if (props.root) {
            this.root = props.root;
            this.html = dom.bind(this.root);
            this.form = new Form(this.root, props.state, props.service);
            this.list = new List(props.state);
        }
    }

    onStateChange(): void {
        if (this.root) {
            this.form.onStateChange();
            this.list.onStateChange();
        }
    }

    render() {
        if (this.root) {
            this.html`${[
                this.form.render(),
                this.list.render()
            ]}`;
        }
    }
}


class Form {
    readonly root: Element;
    readonly state: IState;
    readonly service: CommentService;
    readonly widget: CommentFormWidget;
    readonly html: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(root: Element, state: IState, service: CommentService) {
        this.root = root;
        this.html = dom.wire(this);
        this.service = service;
        this.state = state;
        this.widget = state.getState().commentFormWidget;
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.removeError = this.removeError.bind(this);
        this.saveInput = this.saveInput.bind(this);
        this.publish = this.publish.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
    }

    onStateChange(): void { /* no-op: this class don't depend on external state changes */ }

    removeError() {
        if (this.widget.form.klass !== css.empty) {
            const callback = (s: State): any => {
                const w = s.commentFormWidget;
                w.form.klass = css.empty;
            };
            this.state.setState(callback);
        }
    }

    // focus must be called after this.state.setState()
    focus() {
        const el = this.root.querySelector(".funcbox-comment-textarea");
        (el as HTMLTextAreaElement).focus();
    }

    showForm(e: Event) {
        const callback = (s: State): any => {
            const w = s.commentFormWidget;
            w.placeholder.klass = css.hide;
            w.form.klass = css.show;
        };

        this.state.setState(callback);
        this.focus();
    }

    cancelForm(e: Event) {
        e.preventDefault();
        this.hideForm();
    }

    hideForm() {
        const callback = (s: State): any => {
            const w = s.commentFormWidget;
            w.placeholder.klass = css.show;
            w.form.klass = css.hide;
            w.submit.disable = false;
            w.data.body = "";
        };

        this.state.setState(callback);
    }

    saveInput(e: Event) {
        const input = e.target as HTMLInputElement;
        const callback = (s: State): any => {
            const w = s.commentFormWidget;
            w.data[input.name] = input.value.trim();
        };

        this.state.setState(callback);
    }

    disableSubmit() {
        const callback = (s: State): any => {
            const w = s.commentFormWidget;
            w.submit.disable = true;
        };
        this.state.setState(callback);
    }

    setError() {
        const callback = (s: State): any => {
            const w = s.commentFormWidget;
            w.submit.disable = false;
            w.form.klass = css.error;
        };
        this.state.setState(callback);
        this.focus();
    }

    isValid(): boolean {
        return (this.widget.data.body !== "")
    }


    publish(e: Event) {
        e.preventDefault();

        this.disableSubmit();
        if (!this.isValid()) {
            this.setError();
            return
        }

        const comment = this.widget.toComment();
        setTimeout(this.hideForm, 500);
        this.service.submitComment(comment, 500*2);
    }

    render() {
        const w = this.widget;

        return this.html`
                    <h3 class="funcbox-comment-heading">Comments</h3>
                    <div    class="${['funcbox-placeholder', w.placeholder.klass].join(' ')}"
                            data-showForm="1"
                            onclick="${this.showForm}">
                        <span class="funcbox-placeholder-text">
                            Write a comment...
                        </span>
                    </div>
                    <form   class="${['funcbox-comment-form', w.form.klass].join(' ')}"
                            onsubmit="${this.publish}"
                            oninput=${this.saveInput}>
                        <textarea   class="funcbox-comment-textarea"
                                    name="body"
                                    oninput="${this.removeError}"
                                    value=${w.data.body}
                                    placeholder="Write a comment..."></textarea>
                        <div class="funcbox-comment-footer">
                            <button class="funcbox-comment-submit"
                                    data-cancel="1"
                                    onclick=${this.cancelForm}>Cancel</button>
                            <button class="funcbox-comment-submit publish"
                                    disabled="${w.submit.disable}">Publish</button>
                        </div>
                    </form>`;
    }
}

class List {
    state: IState;
    widget: CommentListWidget;
    html: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(state: IState) {
        this.html = dom.wire(this);
        this.state = state;
        this.widget = state.getState().commentListWidget;
        this.closeError = this.closeError.bind(this);
    }

    closeError(e: Event) {
        const el = e.currentTarget as Element;
        const i = Number(el.getAttribute("data-index"));
        this.state.setState((state: State): any => {
            const comments = state.commentListWidget.comments.filter((comment, index) => {
                return i !== index;
            });
            state.commentListWidget.comments = comments;
        });
    }

    onStateChange(): void { /* no-op: this class don't depend on external state changes */ }

    render() {
        const comments = this.widget.comments;

        return this.html`
            <ul class="funcbox-comment-list">
                ${comments.map( (comment, index) => dom.wire(comment)`
                <li class="${['funcbox-comment-item', comment.klass].join(' ')}">
                    <div class="${['funcbox-comment-item-error', comment.errorKlass].join(' ')}">
                        <div class="funcbox-comment-item-error-header">
                            <h3>${comment.errorHeader}</h3>
                            <svg
                                class="close"
                                data-index="${index}"
                                onclick="${this.closeError}"
                                fill="#000000"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </div>
                        <p>${comment.errorMessage}</p>
                    </div>
                    ${comment.data.body}</li>`)}
            </ul>`;
    }
}
