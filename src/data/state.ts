import { CommentFormWidget, CommentListWidget } from './comment'

export interface IState {
    setState(callback: (s: State) => {}): void
    getState(): State
}

export class State {
    commentFormWidget: CommentFormWidget;
    commentListWidget: CommentListWidget;

    static init(): State {
        const s = new State();
        s.commentFormWidget = new CommentFormWidget("Publish", "Write a comment...");
        s.commentListWidget = new CommentListWidget();
        return s
    }

    static newIState(): IState {
        return new App(State.init());
    }
}

class App implements IState {
    private readonly state: State;

    constructor(state: State) {
        this.state = state;
    }

    setState(callback: (s: State) => {}): void {
        callback(this.state);
    }

    getState(): State {
        return this.state;
    }
}




