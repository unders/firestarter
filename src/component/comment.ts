import { Comment } from "../data/comment"
import { Poster, Request} from "../client/client"
import { Dom as dom } from "../dom/dom"

export interface Props {
    root: string;
    listTitle: string;
    client: Poster;
    // comments will be replaced by CommentService or repo.Comment interface
    // import { CommentRepo } from '../repo/comment'
    comments: Comment[];
    // investigate: wait, async...
    // client.Request{Action: "", JSON: "json-string", callback(resp)}
    // client: Client // client.send(req, callback); wait, async..
    // repo: CommentRepo || CommentService || repo.Comment
    // repo.Comments(), repo.pushComment(new Comment())
    // comment: CommentService
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
            this.form = new Form(props.client);
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

class Form {
    readonly client: Poster;
    readonly html: (template: TemplateStringsArray, ...args : any[]) => void;

    disableSubmit: boolean;

    constructor(client: Poster) {
        this.disableSubmit = false;
        this.client = client;
        this.html = dom.wire(this);
        this.submit = this.submit.bind(this);
    }

    async submit(e: Event) {
        e.preventDefault();

        // disable.submit
        // this.disableSubmit = true;


        // if (form data is not valid) {
        //    show form errors
        //    enable submit
        //    form.enableSubmit(_form);
        //    return
        // }

        //
        // optimistic update...
        //

        //
        // enable submit
        //

        const {value, err} = await this.client.post(new Request(false, {json: "{}"}));
        if (err) {
            console.log(err.code, err.text, value);
        } else {
            // clear form
            // resolve optimistic update
            // update store.
            console.log("value: ", value);
        }

        //
        // enable submit
        //
    }

    render() {
        return this.html`
            <form onsubmit="${this.submit}">
                <textarea placeholder="Write a comment..." cols="50" rows="5"></textarea>
                </br>
                <button disabled=${this.disableSubmit}>Send</button>
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
