import { CommentFormWidget, CommentListWidget, Comment } from './comment'

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
}




