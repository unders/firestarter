import { Comment } from "../data/comment"
import { Poster, Request} from "../client/client"
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
            this.form = new Form(props.client, new View());
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
    data: Data = new Data();
    body: Body = new Body();
    submit: Submit = new Submit();

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
    }
}
class Data {
    [key: string]: string;
    body: string = "";
}
class Body {
    klass: string = viewState.ok;
    style: string = viewState.hideError;
    error: string = "Please write something...";
    placeholder: string = "write a comment";

    isValid(value: string): boolean {
       if (value === "") {
           return this.setError();
       } else {
           return this.setOk();
       }
    }

    setError() {
        this.klass = viewState.error;
        this.style = viewState.showError;
        return false;
    }

    setOk() {
        this.klass = viewState.ok;
        this.style = viewState.hideError;
        return true
    }
}
class Submit {
    readonly title: string = "Send";
    disable: boolean = false;
}

class viewState {
    static readonly hideError: string = "visibility: hidden;";
    static readonly showError: string = "";
    static readonly error: string = "error";
    static readonly ok: string = "ok";
}

class Form {
    readonly client: Poster;
    readonly html: (template: TemplateStringsArray, ...args : any[]) => void;
    view: View;

    constructor(client: Poster, view: View) {
        this.view = view;
        this.client = client;
        this.html = dom.wire(this);
        this.submit = this.submit.bind(this);
        this.input = this.input.bind(this);
    }

    input(e: Event) {
        const input = e.target as HTMLInputElement;
        this.view.data[input.name] = input.value;
    }

    async submit(e: Event) {
        e.preventDefault();

        this.view.disableSubmit();
        this.render();

        if(!this.view.isValid()) {
            this.view.enableSubmit();
            this.render();
            return;
        }
        const json = this.view.toJSON();
        this.view.reset();
        this.render();

        // animate a fast add at top of list...

        const {value, err} = await this.client.post(new Request(true, {json: json}));
        if (err) {
            // animate and replace list item with error message
            console.log(err.code, err.text, value);
        } else {
            // resolve optimistic update
            // update store.
            console.log("value: ", value);
        }
    }

    render() {
        const data = this.view.data;
        const body = this.view.body;
        const submit = this.view.submit;

        return this.html`
            <form   class="funcbox-form"
                    onsubmit="${this.submit}"
                    oninput=${this.input}>
                <textarea   class="${['funcbox-textarea', body.klass].join(' ')}"
                            name='body'
                            placeholder="${body.placeholder}"
                            cols="50"
                            value="${data.body}"
                            rows="5"></textarea>
                </br>
                <span class="funcbox-textarea-error" style="${body.style}">
                    ${body.error}
                </span>
                <button class="funcbox-button"
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
