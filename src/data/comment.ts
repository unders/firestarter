import { CSS as css } from './css';

export class Comment {
   readonly body: string;

    constructor(body: string) {
       this.body = body;
    }

    toJSON(): string {
        return JSON.stringify({body: this.body});
    }
}

export class CommentError {
    header: string;
    message: string;

    constructor(header: string, message: string) {
        this.header = header;
        this.message = message;
    }
}

//
// Comment Widgets - Form and List
//

export class CommentListItem {
    readonly data: Comment;
    readonly klass: string = "";
    readonly errorKlass: string = "hide";
    readonly errorHeader: string = "";
    readonly errorMessage: string = "";

    constructor(comment: Comment, klass: string, errorHeader: string, errorMessage: string) {
        this.data = comment;
        this.klass = klass;

        if (errorHeader !== "") {
            this.errorKlass = "";
            this.errorHeader = errorHeader;
            this.errorMessage = errorMessage;
        }
    }
}

export class CommentListWidget {
    comments: CommentListItem[] = [];
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

    toComment(): Comment {
        return new Comment(this.data.body);
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

