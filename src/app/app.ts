import { Poster } from "../client/client"
import { State } from "../data/state"
import * as comment from "../component/comment"

export class App {
    state: State;
    comment: comment.Component;

    constructor(client: Poster) {
        this.state = State.init();

        this.comment = new comment.Component({
                root: "#funcbox-comment",
                state: this,
                client: client,
                comments:  [{body: "This is the body text. Very cool"}],
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
