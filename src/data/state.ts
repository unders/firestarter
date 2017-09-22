import { CommentFormWidget } from './comment'

export interface IState {
    setState(callback: (s: State) => {}): void
    getState(): State
}

export class State {
    commentFormWidget: CommentFormWidget;

    static init(): State {
        const s = new State();
        s.commentFormWidget = new CommentFormWidget("Publish", "Write a comment...");
        return s
    }
}




