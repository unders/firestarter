import { Client } from "../client/client"
import {IState, State} from "../data/state"
import {CSS as css} from "../data/css"
import {Comment, CommentError, CommentListItem} from "../data/comment"

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
            const listItem = new CommentListItem(comment, "", "", "");
            listItems.push(listItem);
        });

        this._state.getState().commentListWidget.comments = listItems;
    }

    async submitComment(comment: Comment, timeout: number) {
        const wait = this.minWait(timeout);
        const {json, err} = await this.client.post(comment.toJSON());

        if (err) {
            const e = (err.value as CommentError);
            const listItem = new CommentListItem(comment, css.errHighlight, e.header, e.message);

            await wait;
            this._state.setState((state: State): any => {
                state.commentListWidget.comments.unshift(listItem);
            });
            return;
        }

        const listItem = new CommentListItem(comment, css.highlight, "", "");

        await wait;
        this._state.setState((state: State): any => {
            state.commentListWidget.comments.unshift(listItem);
        });
    }

    minWait(timeout: number): Promise<any> {
        return new Promise<any>((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
}
