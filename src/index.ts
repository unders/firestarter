import { Dom as dom } from "./dom/dom"

const clock = document.querySelector('#root');
const el = document.querySelector('#hello');
if (el !== null && clock !== null) {
    let options: Options = {
        element: el,
        title: "Comments",
        comments: [{body: "This is the body text. Very cool"}]
    };

    comment(options)
    const render = dom.bind(clock)
    tick(render);
    setInterval(tick, 1000, render);
}

function tick(render: (template: TemplateStringsArray, ...args : any[]) => void): void {
    render`
    <div>
      <h2>It is ${new Date().toLocaleTimeString()}.</h2>
    </div>
  `;
}

interface Options {
    element: Element;
    title: string;
    comments: Comment[];
}

interface Comment {
    body: string;
    // author: string;
    // publishedAt: Date;
}

function comment(o: Options): void {
    dom.bind(o.element)`
    <form onsubmit="${submit}">
        <textarea placeholder="Write a comment..." cols="50" rows="5"></textarea>
        </br>
        <button>Send</button>
    </form>
    <h3>${o.title}</h3>
    <ul class="comments">${o.comments.map( (comment) => dom.wire(comment)`
        <li>
            ${comment.body}
        </li>`)}
    </ul>`;
}

function submit(event: Event) {
    event.preventDefault();
    console.log("event", event.target);
}
