import { State } from "../data/state"
import { CommentComponent } from "../component/comment"
import { CommentService } from "../service/comment";

export class App {
    readonly state: State;
    readonly comment: CommentComponent;

    constructor(commentService: CommentService) {
        this.state = State.init();
        commentService.init(this);

        const comment = document.querySelector("#funcbox-comment");
        this.comment = new CommentComponent({
                root: comment,
                commentService: commentService,
                state: this });
    }

    setState(callback: (s: State) => {}): void {
        callback(this.state);
        this.comment.onStateChange();
        this.render();
    }

    getState(): State {
        return this.state
    }

    render() {
        this.comment.render();
    }
}
