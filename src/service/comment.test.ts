import { newClient } from '../test/mock'
import { State, IState } from '../data/state'
import { CSS as css } from '../data/css'
import { Comment } from '../data/comment'
import { CommentService } from './comment'

describe("CommentService", () => {
    const [mock, client] = newClient();
    const state = State.newIState();
    const service = new CommentService(client, []);
    service.init(state);

    test("#submitComment when success", async () => {
        expect.assertions(3);
        mock.simulateResponse(200, "{}");
        await service.submitComment(new Comment("the body text"), 0);

        const widget = state.getState().commentListWidget;
        const got = widget.comments[0];
        expect(got.data.body).toEqual("the body text");
        expect(got.klass).toEqual(css.highlight);
        expect(got.errorKlass).toEqual(css.hide);
        widget.comments = [];
    });

    test("#submitComment when failure", async () => {
        expect.assertions(3);
        mock.simulateResponse(300, "{}");
        await service.submitComment(new Comment("a body text"), 0);

        const widget = state.getState().commentListWidget;
        const got = widget.comments[0];
        expect(got.data.body).toEqual("a body text");
        expect(got.klass).toEqual(css.errHighlight);
        expect(got.errorKlass).toEqual(css.show);
        widget.comments = [];
    });
});
