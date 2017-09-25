import { State } from "../data/state"
import * as comment from "../component/comment"
import { CommentService } from "../service/comment";

export class App {
    readonly state: State;
    readonly comment: comment.Component;

    constructor(commentService: CommentService) {
        this.state = State.init();
        commentService.init(this);
        this.comment = new comment.Component({
                root: "#funcbox-comment",
                commentService: commentService,
                state: this
            });
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
