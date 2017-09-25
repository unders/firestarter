import { CSS as css } from '../data/css';
import { IState, State } from "../data/state"
import { Comment, CommentFormWidget } from "../data/comment"
import { Poster} from "../client/client"
import { Dom as dom } from "../dom/dom"

interface Props {
    root: string;
    state: IState
    client: Poster;
    comments: Comment[];
}

export class Component {
    readonly root: Element;
    readonly state: IState;
    readonly form: Form;
    readonly list: List;
    html: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(props: Props) {
        const root = document.querySelector(props.root);

        if (root) {
            this.root = root;
            this.html = dom.bind(this.root);
            this.form = new Form(props.client, props.state, root);
            this.list = new List(props.comments);
            this.state = props.state;
        }
    }

    onStateChange(): void {
        this.form.onStateChange();
        // this.list.onStateChange();
    }

    render() {
        if (this.root) {
            this.html`${[
                this.form.render()
                // this.list.render()
            ]}`;
        }
    }
}


class Form {
    readonly root: Element;
    readonly state: IState;
    readonly client: Poster;
    readonly html: (template: TemplateStringsArray, ...args : any[]) => void;
    readonly widget: CommentFormWidget;

    constructor(client: Poster, state: IState, root: Element) {
        this.root = root;
        this.html = dom.wire(this);
        this.client = client;
        this.state = state;
        this.widget = state.getState().commentFormWidget;
        this.showForm = this.showForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.saveInput = this.saveInput.bind(this);
        this.removeError = this.removeError.bind(this);
        this.publish = this.publish.bind(this);
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

    dataAndJSON(): [Comment, string] {
        const c = new Comment(this.widget.data.body);
        const json = JSON.stringify(this.widget.data);
        return [c, json]
    }

    isValid(): boolean {
        return (this.widget.data.body !== "")
    }

    async publish(e: Event) {
        e.preventDefault();

        this.disableSubmit();
        if (!this.isValid()) {
            this.setError();
            return
        }
        const [comment, req] = this.dataAndJSON();
        setTimeout(this.hideForm, 500);

        console.log(comment, req);

        //  add to comments state list submitted

         const {json, err} = await this.client.post(req);
         if (err) {
             // animate and replace list item with error message
             if (err.code == 400) {
            }
             console.log(err.code, err.status, err.message, err.value);
         } else {
        //     // resolve optimistic update
        //     // update store.
             console.log("json: ", json);
         }
    }

    render() {
        const w = this.widget;

        return this.html`
                    <h3 class="funcbox-comment-heading">Comments</h3>
                    <div    class="${['funcbox-placeholder', w.placeholder.klass].join(' ')}"
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
                                    onclick=${this.cancelForm}>Cancel</button>
                            <button class="funcbox-comment-submit publish"
                                    disabled="${w.submit.disable}">Publish</button>
                        </div>
                    </form>`;
    }
}

class List {
    comments: Comment[];
    html: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(comments: Comment[]) {
        this.html = dom.wire(this);
    }

    render() {
        return this.html`
            <ul class="comments">${this.comments.map( (comment) => dom.wire(comment)`
                <li>${comment.body}</li>`)}
            </ul>`;
    }
}
