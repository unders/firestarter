import { Client } from "../client/client"
import {IState, State} from "../data/state"
import {Comment, CommentListItem} from "../data/comment"

export class CommentService {
    readonly client: Client;
    readonly comments: Comment[];
    _state: IState;

    constructor(client: Client, comments: Comment[]) {
        this.client = client;
        this.comments = comments;
    }

    init(state: IState) {
        this._state = state;

        const listItems: CommentListItem[] = [];
        this.comments.forEach((comment) => {
            const listItem = new CommentListItem(comment);
            listItems.push(listItem);
        });

        this._state.getState().commentListWidget.comments = listItems;
    }

    submitComment(comment: Comment, timeout: number) {
        const listItem = new CommentListItem(comment);

        const callback = (state: State): any => {
            state.commentListWidget.comments.unshift(listItem)
        };

        const add = () => {
            this._state.setState(callback);
        };

        setTimeout(add, timeout);
    }
}
