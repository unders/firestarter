import { Comment } from "../data/comment"
import { Poster} from "../client/client"
import { Dom as dom } from "../dom/dom"

export interface Props {
    root: string;
    listTitle: string;
    client: Poster;
    comments: Comment[];
}

export class Component {
    root: Element;
    form: Form;
    list: List;
    bind: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(props: Props) {
        const root = document.querySelector(props.root);

        if (root) {
            this.root = root;
            this.bind = dom.bind(this.root);
            this.form = new Form(props.client, new View(root));
            this.list = new List(props.listTitle, props.comments);

            this.render();
        }
    }

    render() {
        if (this.root) {
            this.bind`${[
                this.form.render()
                // this.list.render()
            ]}`;
        }
    }
}

class View {
    root: Element;
    data: Data = new Data();
    body: Body = new Body();
    submit: Submit = new Submit();

    constructor(root: Element) {
        this.root = root;
        this.resetBodySize = this.resetBodySize.bind(this);
    }

    focusBody() {
        const el = this.root.querySelector(".funcbox-textarea") as HTMLTextAreaElement;
        el.focus();
    }

    resetBodySize() {
        const el = this.root.querySelector(".funcbox-textarea") as HTMLTextAreaElement;
        el.style.height = "inherit";
        el.style.height = el.scrollHeight + "px";
    }

    isValid(): boolean {
        return this.body.isValid(this.data.body);
    }

    toJSON(): string {
        return JSON.stringify(this.data);
    }

    disableSubmit(): void {
        this.submit.disable = true;
    }

    enableSubmit(): void {
        this.submit.disable = false;
    }

    reset(): void {
        this.data.body = "";
        this.body.setOk();
        this.submit.disable = false;
        setTimeout(this.resetBodySize, 1);
    }
}
class Data {
    [key: string]: string;
    body: string = "";
}
class Body {
    static readonly ok: string = "";
    static readonly error: string = "error";
    errorKlass: string = "";
    errorMsg: string = "Please, write something.";
    placeholder: string = "Write a comment";

    isValid(value: string): boolean {
       if (value === "") {
           return this.setError();
       } else {
           return this.setOk();
       }
    }

    setError() {
        this.errorKlass = Body.error;
        return false;
    }

    setOk() {
        this.errorKlass = Body.ok;
        return true
    }
}
class Submit {
    readonly title: string = "Send";
    disable: boolean = false;
}


class Form {
    readonly client: Poster;
    readonly html: (template: TemplateStringsArray, ...args : any[]) => void;
    view: View;
    bodyHasGrow: boolean = false;

    constructor(client: Poster, view: View) {
        this.view = view;
        this.client = client;
        this.html = dom.wire(this);
        this.submit = this.submit.bind(this);
        this.saveInput = this.saveInput.bind(this);
        this.removeError = this.removeError.bind(this);
        this.grow = this.grow.bind(this);
        // this.shrink = this.shrink.bind(this);
    }

    saveInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.view.data[input.name] = input.value.trim();
    }

    removeError(e: Event) {
        if (this.view.body.errorKlass !== Body.ok) {
            this.view.body.errorKlass = Body.ok;
            this.render();
        }
    }

    grow(e: Event) {
        const el = e.target as HTMLTextAreaElement;

        if (!this.bodyHasGrow && el.scrollHeight > el.clientHeight) {
            this.bodyHasGrow = true;
            el.style.height = el.scrollHeight + "px";
        }

        if (this.bodyHasGrow) {
            el.style.height = "inherit";
            el.style.height = el.scrollHeight + "px";
        }
    }

    async submit(e: Event) {
        e.preventDefault();

        this.view.disableSubmit();
        this.render();

        if(!this.view.isValid()) {
            this.view.enableSubmit();
            this.render();
            this.view.focusBody();
            return;
        }
        const req = this.view.toJSON();
        this.view.reset();
        this.render();

        // animate a fast add at the top of list...

        const {json, err} = await this.client.post(req);
        if (err) {
            // animate and replace list item with error message
            if (err.code == 400) {

            }
            console.log(err.code, err.status, err.message, err.value);
        } else {
            // resolve optimistic update
            // update store.
            console.log("json: ", json);
        }
    }

    render() {
        const data = this.view.data;
        const body = this.view.body;
        const submit = this.view.submit;

        return this.html`
            <form   class="funcbox-comment-form"
                    onsubmit=${this.submit}
                    oninput=${this.saveInput}>
                <div class="${['funcbox-comment-group', body.errorKlass].join(' ')}">
                    <textarea   class="funcbox-textarea"
                                oninput="${this.grow}"
                                onkeydown="${this.removeError}"
                                tabindex="1"
                                name='body'
                                placeholder="${body.placeholder}"
                                value="${data.body}"></textarea>
                    <span class="funcbox-textarea-error">${body.errorMsg}</span>
                </div>
                <button class="funcbox-button"
                        tabindex="2"
                        disabled=${submit.disable}>${submit.title}</button>
            </form>`;
    }
}

class List {
    title: string;
    comments: Comment[];
    html: (template: TemplateStringsArray, ...args : any[]) => void;

    constructor(title: string, comments: Comment[]) {
        this.title = title;
        this.html = dom.wire(this);
    }

    click(e: Event) {
        console.log(e);
        console.log(e.target);
    }

    render() {
        return this.html`
            <h3>${this.title}</h3>
            <ul class="comments">${this.comments.map( (comment) => dom.wire(comment)`
                <li onclick="${this.click}">${comment.body}</li>`)}
            </ul>`;
    }
}
