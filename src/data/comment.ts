import { CSS as css } from './css';

export class Comment {
   readonly body: string;

    constructor(body: string) {
       this.body = body;
    }
}

export class CommentError {
    body: string;
    err: string;

    constructor(body: string, err: string) {
        this.body = body;
        this.err = err;
    }
}

export class CommentFormWidget {
    placeholder: CommentFormPlaceholder;
    form: CommentForm;
    submit: CommentFormSubmit;
    data: CommentFormData;

    constructor(submitText: string, placeholderText: string) {
        this.placeholder = new CommentFormPlaceholder(placeholderText);
        this.form = new CommentForm();
        this.submit = new CommentFormSubmit(submitText);
        this.data = new CommentFormData();
    }
}

class CommentFormPlaceholder {
    readonly text: string = "Write a comment...";
    klass: string = css.show;
    constructor(text: string) {
        this.text = text;
    }
}

class CommentForm {
    klass: string = css.hide;
}

class CommentFormSubmit {
    readonly title: string = "Publish";
    disable: boolean = false;

    constructor(title: string) {
        this.title = title
    }
}

class CommentFormData {
    [key: string]: string;
    body: string = "";
}

