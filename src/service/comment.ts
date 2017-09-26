import { Router as router} from "../router"
import { XHR } from "../client/client"
import {IState, State} from "../data/state"
import {CSS as css} from "../data/css"
import {Comment, CommentListItem} from "../data/comment"

export class CommentService {
    readonly xhr: XHR;
    readonly comments: Comment[];
    _state: IState;

    constructor(xhr: XHR, comments: Comment[]) {
        this.xhr = xhr;
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
        const {json, err} = await this.xhr.post(router.commentPath, comment.toJSON());

        if (err) {
            const listItem = new CommentListItem(comment, css.errHighlight, err.header, err.message);

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
