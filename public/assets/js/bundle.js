/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var css_1 = __webpack_require__(1);
var Comment = /** @class */ (function () {
    function Comment(body) {
        this.body = body;
    }
    Comment.prototype.toJSON = function () {
        return JSON.stringify({ body: this.body });
    };
    return Comment;
}());
exports.Comment = Comment;
//
// Comment Widgets - Form and List
//
var CommentListItem = /** @class */ (function () {
    function CommentListItem(comment, klass, errorHeader, errorMessage) {
        this.klass = "";
        this.errorKlass = css_1.CSS.hide;
        this.errorHeader = "";
        this.errorMessage = "";
        this.data = comment;
        this.klass = klass;
        if (errorHeader !== "") {
            this.errorKlass = "";
            this.errorHeader = errorHeader;
            this.errorMessage = errorMessage;
        }
    }
    return CommentListItem;
}());
exports.CommentListItem = CommentListItem;
var CommentListWidget = /** @class */ (function () {
    function CommentListWidget() {
        this.comments = [];
    }
    return CommentListWidget;
}());
exports.CommentListWidget = CommentListWidget;
var CommentFormWidget = /** @class */ (function () {
    function CommentFormWidget(submitText, placeholderText) {
        this.placeholder = new CommentFormPlaceholder(placeholderText);
        this.form = new CommentForm();
        this.submit = new CommentFormSubmit(submitText);
        this.data = new CommentFormData();
    }
    CommentFormWidget.prototype.toComment = function () {
        return new Comment(this.data.body);
    };
    return CommentFormWidget;
}());
exports.CommentFormWidget = CommentFormWidget;
var CommentFormPlaceholder = /** @class */ (function () {
    function CommentFormPlaceholder(text) {
        this.text = "Write a comment...";
        this.klass = css_1.CSS.show;
        this.text = text;
    }
    return CommentFormPlaceholder;
}());
var CommentForm = /** @class */ (function () {
    function CommentForm() {
        this.klass = css_1.CSS.hide;
    }
    return CommentForm;
}());
var CommentFormSubmit = /** @class */ (function () {
    function CommentFormSubmit(title) {
        this.title = "Publish";
        this.disable = false;
        this.title = title;
    }
    return CommentFormSubmit;
}());
var CommentFormData = /** @class */ (function () {
    function CommentFormData() {
        this.body = "";
    }
    return CommentFormData;
}());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CSS = /** @class */ (function () {
    function CSS() {
    }
    CSS.errHighlight = "error-highlight";
    CSS.highlight = "highlight";
    CSS.error = "error";
    CSS.hide = "hide";
    CSS.show = "";
    CSS.empty = "";
    return CSS;
}());
exports.CSS = CSS;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(3);
var client_1 = __webpack_require__(8);
var env_1 = __webpack_require__(10);
var comment_1 = __webpack_require__(11);
var main = function () {
    var env = new env_1.Env("dev");
    var client = client_1.Client.make(env, "", new client_1.Headers(), 5);
    var commentService = new comment_1.CommentService(client, funcboxComments());
    var app = new app_1.App(commentService);
    app.render();
};
main();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = __webpack_require__(4);
var comment_1 = __webpack_require__(5);
var App = /** @class */ (function () {
    function App(commentService) {
        this.state = state_1.State.init();
        commentService.init(this);
        var comment = document.querySelector("#funcbox-comment");
        this.comment = new comment_1.CommentComponent({
            root: comment,
            service: commentService,
            state: this
        });
    }
    App.prototype.setState = function (callback) {
        callback(this.state);
        this.comment.onStateChange();
        this.render();
    };
    App.prototype.getState = function () {
        return this.state;
    };
    App.prototype.render = function () {
        this.comment.render();
    };
    return App;
}());
exports.App = App;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = __webpack_require__(0);
var State = /** @class */ (function () {
    function State() {
    }
    State.init = function () {
        var s = new State();
        s.commentFormWidget = new comment_1.CommentFormWidget("Publish", "Write a comment...");
        s.commentListWidget = new comment_1.CommentListWidget();
        return s;
    };
    State.newIState = function () {
        return new App(State.init());
    };
    return State;
}());
exports.State = State;
var App = /** @class */ (function () {
    function App(state) {
        this.state = state;
    }
    App.prototype.setState = function (callback) {
        callback(this.state);
    };
    App.prototype.getState = function () {
        return this.state;
    };
    return App;
}());


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var css_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(6);
var CommentComponent = /** @class */ (function () {
    function CommentComponent(props) {
        if (props.root) {
            this.root = props.root;
            this.html = dom_1.Dom.bind(this.root);
            this.form = new Form(this.root, props.state, props.service);
            this.list = new List(props.state);
        }
    }
    CommentComponent.prototype.onStateChange = function () {
        if (this.root) {
            this.form.onStateChange();
            this.list.onStateChange();
        }
    };
    CommentComponent.prototype.render = function () {
        if (this.root) {
            (_a = ["", ""], _a.raw = ["",
                ""], this.html(_a, [
                this.form.render(),
                this.list.render()
            ]));
        }
        var _a;
    };
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
var Form = /** @class */ (function () {
    function Form(root, state, service) {
        this.root = root;
        this.html = dom_1.Dom.wire(this);
        this.service = service;
        this.state = state;
        this.widget = state.getState().commentFormWidget;
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.removeError = this.removeError.bind(this);
        this.saveInput = this.saveInput.bind(this);
        this.publish = this.publish.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
    }
    Form.prototype.onStateChange = function () { };
    Form.prototype.removeError = function () {
        if (this.widget.form.klass !== css_1.CSS.empty) {
            var callback = function (s) {
                var w = s.commentFormWidget;
                w.form.klass = css_1.CSS.empty;
            };
            this.state.setState(callback);
        }
    };
    // focus must be called after this.state.setState()
    Form.prototype.focus = function () {
        var el = this.root.querySelector(".funcbox-comment-textarea");
        el.focus();
    };
    Form.prototype.showForm = function (e) {
        var callback = function (s) {
            var w = s.commentFormWidget;
            w.placeholder.klass = css_1.CSS.hide;
            w.form.klass = css_1.CSS.show;
        };
        this.state.setState(callback);
        this.focus();
    };
    Form.prototype.cancelForm = function (e) {
        e.preventDefault();
        this.hideForm();
    };
    Form.prototype.hideForm = function () {
        var callback = function (s) {
            var w = s.commentFormWidget;
            w.placeholder.klass = css_1.CSS.show;
            w.form.klass = css_1.CSS.hide;
            w.submit.disable = false;
            w.data.body = "";
        };
        this.state.setState(callback);
    };
    Form.prototype.saveInput = function (e) {
        var input = e.target;
        var callback = function (s) {
            var w = s.commentFormWidget;
            w.data[input.name] = input.value.trim();
        };
        this.state.setState(callback);
    };
    Form.prototype.disableSubmit = function () {
        var callback = function (s) {
            var w = s.commentFormWidget;
            w.submit.disable = true;
        };
        this.state.setState(callback);
    };
    Form.prototype.setError = function () {
        var callback = function (s) {
            var w = s.commentFormWidget;
            w.submit.disable = false;
            w.form.klass = css_1.CSS.error;
        };
        this.state.setState(callback);
        this.focus();
    };
    Form.prototype.isValid = function () {
        return (this.widget.data.body !== "");
    };
    Form.prototype.publish = function (e) {
        e.preventDefault();
        this.disableSubmit();
        if (!this.isValid()) {
            this.setError();
            return;
        }
        var comment = this.widget.toComment();
        setTimeout(this.hideForm, 500);
        this.service.submitComment(comment, 500 * 2);
    };
    Form.prototype.render = function () {
        var w = this.widget;
        return (_a = ["\n                    <h3 class=\"funcbox-comment-heading\">Comments</h3>\n                    <div    class=\"", "\"\n                            data-showForm=\"1\"\n                            onclick=\"", "\">\n                        <span class=\"funcbox-placeholder-text\">\n                            Write a comment...\n                        </span>\n                    </div>\n                    <form   class=\"", "\"\n                            onsubmit=\"", "\"\n                            oninput=", ">\n                        <textarea   class=\"funcbox-comment-textarea\"\n                                    name=\"body\"\n                                    oninput=\"", "\"\n                                    value=", "\n                                    placeholder=\"Write a comment...\"></textarea>\n                        <div class=\"funcbox-comment-footer\">\n                            <button class=\"funcbox-comment-submit\"\n                                    data-cancel=\"1\"\n                                    onclick=", ">Cancel</button>\n                            <button class=\"funcbox-comment-submit publish\"\n                                    data-submit=\"1\"\n                                    disabled=\"", "\">Publish</button>\n                        </div>\n                    </form>"], _a.raw = ["\n                    <h3 class=\"funcbox-comment-heading\">Comments</h3>\n                    <div    class=\"", "\"\n                            data-showForm=\"1\"\n                            onclick=\"", "\">\n                        <span class=\"funcbox-placeholder-text\">\n                            Write a comment...\n                        </span>\n                    </div>\n                    <form   class=\"", "\"\n                            onsubmit=\"", "\"\n                            oninput=", ">\n                        <textarea   class=\"funcbox-comment-textarea\"\n                                    name=\"body\"\n                                    oninput=\"", "\"\n                                    value=", "\n                                    placeholder=\"Write a comment...\"></textarea>\n                        <div class=\"funcbox-comment-footer\">\n                            <button class=\"funcbox-comment-submit\"\n                                    data-cancel=\"1\"\n                                    onclick=", ">Cancel</button>\n                            <button class=\"funcbox-comment-submit publish\"\n                                    data-submit=\"1\"\n                                    disabled=\"", "\">Publish</button>\n                        </div>\n                    </form>"], this.html(_a, ['funcbox-placeholder', w.placeholder.klass].join(' '), this.showForm, ['funcbox-comment-form', w.form.klass].join(' '), this.publish, this.saveInput, this.removeError, w.data.body, this.cancelForm, w.submit.disable));
        var _a;
    };
    return Form;
}());
var List = /** @class */ (function () {
    function List(state) {
        this.html = dom_1.Dom.wire(this);
        this.state = state;
        this.widget = state.getState().commentListWidget;
        this.closeError = this.closeError.bind(this);
    }
    List.prototype.closeError = function (e) {
        var el = e.currentTarget;
        var i = Number(el.getAttribute("data-index"));
        this.state.setState(function (state) {
            var comments = state.commentListWidget.comments.filter(function (comment, index) {
                return i !== index;
            });
            state.commentListWidget.comments = comments;
        });
    };
    List.prototype.onStateChange = function () { };
    List.prototype.render = function () {
        var _this = this;
        var comments = this.widget.comments;
        return (_a = ["\n            <ul class=\"funcbox-comment-list\">\n                ", "\n            </ul>"], _a.raw = ["\n            <ul class=\"funcbox-comment-list\">\n                ",
            "\n            </ul>"], this.html(_a, comments.map(function (comment, index) {
            return (_a = ["\n                <li class=\"", "\">\n                    <div class=\"", "\">\n                        <div class=\"funcbox-comment-item-error-header\">\n                            <h3>", "</h3>\n                            <svg\n                                class=\"close\"\n                                data-index=\"", "\"\n                                onclick=\"", "\"\n                                fill=\"#000000\"\n                                height=\"24\"\n                                viewBox=\"0 0 24 24\"\n                                width=\"24\"\n                                xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\n                                <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n                            </svg>\n                        </div>\n                        <p>", "</p>\n                    </div>\n                    ", "</li>"], _a.raw = ["\n                <li class=\"", "\">\n                    <div class=\"", "\">\n                        <div class=\"funcbox-comment-item-error-header\">\n                            <h3>", "</h3>\n                            <svg\n                                class=\"close\"\n                                data-index=\"", "\"\n                                onclick=\"", "\"\n                                fill=\"#000000\"\n                                height=\"24\"\n                                viewBox=\"0 0 24 24\"\n                                width=\"24\"\n                                xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\n                                <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n                            </svg>\n                        </div>\n                        <p>", "</p>\n                    </div>\n                    ", "</li>"], dom_1.Dom.wire(comment)(_a, ['funcbox-comment-item', comment.klass].join(' '), ['funcbox-comment-item-error', comment.errorKlass].join(' '), comment.errorHeader, index, _this.closeError, comment.errorMessage, comment.data.body));
            var _a;
        })));
        var _a;
    };
    return List;
}());


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyperHTML = __webpack_require__(7);
var Dom = /** @class */ (function () {
    function Dom() {
    }
    Dom.wire = function (obj, typeID) {
        return hyperHTML.wire(obj, typeID);
    };
    Dom.bind = function (element) {
        return hyperHTML.bind(element);
    };
    return Dom;
}());
exports.Dom = Dom;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hyperHTML=function(e,t){"use strict";function n(e){return arguments.length<2?null==e?q("html"):"string"==typeof e?i(null,e):"raw"in e?q("html")(e):"nodeType"in e?r(e):F(e,"html"):("raw"in e?q("html"):i).apply(null,arguments)}function r(e){return l.bind(e)}function i(e,t){return arguments.length<1?q("html"):null==e?q(t||"html"):F(e,t||"html")}function o(){}function a(e,n){return this.node=e,this.childNodes=n,t.aura(this,n)}function l(e){var t=we.get(this);return t&&t.template===re(e)||(t=B.apply(this,arguments),we.set(this,t)),z.apply(t.updates,arguments),this}function c(e,t,n){var r,i=e.ownerElement,o=/^on/.test(n),a="data"===n||x(i,n)&&!K.test(n),l=o?n.slice(2):"",c=o||a;return o&&n.toLowerCase()in i&&(l=l.toLowerCase()),c&&t.push(i,n),o?function(e){r!==e&&(r&&i.removeEventListener(l,r,!1),r=e,e&&i.addEventListener(l,e,!1))}:a?function(e){r!==e&&(r=e,i[n]!==e&&(null==e?(i[n]=null,i.removeAttribute(n)):i[n]=e))}:function(t){r!==t&&(r=t,e.value!==t&&(null==t?c||(c=!0,i.removeAttributeNode(e)):(e.value=t,c&&(c=!1,i.setAttributeNode(e)))))}}function u(e){var t;return function(n){n!==t&&(t=n,e.textContent=n)}}function s(e,r,i){var a;return function l(c){switch(typeof c){case"string":case"number":case"boolean":var u=r.length;1===u&&r[0].nodeType===Z?a!==c&&(a=c,r[0].textContent=c):(a=c,u?i.splice(0,u,w(e,c)):r[0]=e.parentNode.insertBefore(w(e,c),e));break;case"function":l(c(e.parentNode,r,0));break;case"object":case"undefined":if(null==c){a=c,l("");break}c instanceof o&&(c=c.render());default:if(a=c,ce(c)){var u=c.length;if(0===u)i.splice(0);else switch(typeof c[0]){case"string":case"number":case"boolean":l({html:c});break;case"function":for(var s=e.parentNode,f=0;f<u;f++)c[f]=c[f](s,r,f);l(c.concat.apply([],c));break;case"object":if(ce(c[0])&&(c=c.concat.apply([],c)),T(c[0])){Promise.all(c).then(l);break}for(var f=0,u=c.length;f<u;f++)c[f]instanceof o&&(c[f]=c[f].render());default:t(i,c,n.MAX_LIST_SIZE)}}else if(C(c))t(i,c.nodeType===W?ie.call(c.childNodes):[c],n.MAX_LIST_SIZE);else if(T(c))c.then(l);else if("placeholder"in c)S(l,c);else if("text"in c)l(String(c.text));else if("any"in c)l(c.any);else if("html"in c){var h=[].concat(c.html).join("");i.splice(0);var p=m(e,h);r.push.apply(r,p.childNodes),e.parentNode.insertBefore(p,e)}else l("length"in c?ie.call(c):E(c))}}}function f(e,t,n){for(var r,i,o=Q,a=e.attributes,l=0,c=a.length;l<c;l++)i=a[l],i.value===o&&(r=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1"),t.push(M("attr",e.attributes[r.toLowerCase()],r)))}function h(e,t,n){for(var r,i=e.childNodes,o=i.length,a=0;a<o;a++)switch(r=i[a],r.nodeType){case R:f(r,t,n),h(r,t,n);break;case V:r.textContent===Q&&(n.shift(),t.push(M("any",r)));break;case Z:K.test(e.nodeName)&&ue.call(r.textContent)===U&&(n.shift(),t.push(M("text",e)))}}function p(e){return oe[e]}function d(e){return{html:e}}function v(e){for(var t,n=[],r=e.childNodes,i=0,o=r.length;i<o;i++)t=r[i],t.nodeType!==R&&0===ue.call(t.textContent).length||n.push(t);return 1===n.length?n[0]:n}function g(e){return e.createDocumentFragment()}function m(e,t){return(G in e?b:y)(e,t.replace(ge,ye))}function y(e,t){var n,r=e.ownerDocument,i=r.createElement("template"),o="content"in i,a=!1;if(o||(n=g(r),a=/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)),a){var l=RegExp.$1;i.innerHTML="<table>"+t+"</table>",pe(n,ie.call(i.querySelectorAll(l)))}else i.innerHTML=t,o?n=i.content:pe(n,ie.call(i.childNodes));return n}function b(e,t){var n=e.ownerDocument,r=g(n);if(te||ne){var i=n.createElement("div");i.innerHTML='<svg xmlns="'+J+'">'+t+"</svg>",pe(r,ie.call(i.firstChild.childNodes))}else{var i=n.createElementNS(J,"svg");i.innerHTML=t,pe(r,ie.call(i.childNodes))}return r}function w(e,t){return e.ownerDocument.createTextNode(t)}function N(e){var t=n.document,r=t.customElements||t.defaultView.customElements;return r&&r.get(e.nodeName.toLowerCase())}function x(e,t){var n=!(G in e);if(n&&/-/.test(e.nodeName)){var r=N(e);r&&(e=r.prototype)}return n&&t in e}function S(e,t){e(t.placeholder),"text"in t?Promise.resolve(t.text).then(String).then(e):"any"in t?Promise.resolve(t.any).then(e):"html"in t?Promise.resolve(t.html).then(d).then(e):Promise.resolve(E(t)).then(e)}function E(e){for(var t in fe)if(e.hasOwnProperty(t))return fe[t](e[t])}function C(e){return"ELEMENT_NODE"in e}function T(e){return null!=e&&"then"in e}function k(e,t){var n="_"+e+"$";return{get:function(){return this[n]||(this[e]=t.call(this,e))},set:function(e){se(this,n,{configurable:!0,value:e})}}}function A(e){for(var t=0,n=e.length;t<n;t++)e[t++].removeAttribute(e[t])}function L(e,t,n,r){var i;switch(e.type){case"any":i=s(t,r,new a(t,r));break;case"attr":i=c(t,n,e.name);break;case"text":i=u(t)}return i}function M(e,t,n){return{type:e,path:H(t),name:n}}function _(e){var t="_"+e.join(U);return he[t]||(he[t]=e)}function D(e,t){var n=t.previousSibling;n&&n.nodeType===Z&&(e.removeChild(n),D(e,t))}function O(e,t,n){n?e.insertBefore(t,n):e.appendChild(t)}function j(e,t,n,r){for(var i=e,o=e.ownerDocument,a=n.path,l=ve(t,a),c=0,u=a.length;c<u;c++)switch(a[c++]){case"attributes":var s=l.name;e.hasAttribute(s)||e.setAttribute(s,""),i=e.attributes[s];break;case"childNodes":var f=de(e),h=de(l.parentNode);i=Te(l);var p=i?a.indexOf.call(h,i)+1:-1;i=Ce(l);var d=i?a.indexOf.call(h,i):-1;switch(i=o.createComment(Q),!0){case d<0:d=f.length;break;case p<0:p=0;default:d=-(h.length-d)}r.push.apply(r,ie.call(f,p,d)),r.length?O(e,i,Ce(r[r.length-1])):O(e,i,ie.call(f,d)[0]),0===r.length&&D(e,i);break;default:i=de(e)[a[c]]||e.appendChild(e.ownerDocument.createElement(ve(t,a.slice(0,c+1)).nodeName)),e=i}return i}function I(e,t){for(var n,r,i=[],o=[],a=0,l=t.length;a<l;a++)r=[],n=t[a],i[a]=L(n,j(this,e,n,r),o,r);return A(o),i}function P(e){var t=[],n=m(this,e.join(U)),r={fragment:n,paths:t};return h(n,t,e.slice()),xe.set(e,r),r}function H(e){var t,n=[];switch(e.nodeType){case R:case W:t=e;break;case V:t=e.parentNode,n.unshift("childNodes",n.indexOf.call(t.childNodes,e));break;case X:default:t=e.ownerElement,n.unshift("attributes",e.name)}for(e=t;t=t.parentNode;e=t)n.unshift("children",n.indexOf.call(de(t),e));return n}function $(e,t){for(var n,r=[],i=[],o=0,a=t.length;o<a;o++)n=t[o],r[o]=L(n,ve(e,n.path),i,[]);return A(i),r}function z(){for(var e=1,t=arguments.length;e<t;e++)this[e-1](arguments[e])}function B(e){e=re(e);var t,n=xe.get(e)||P.call(this,e);if(Se){var r=Ee(n.fragment);t=$.call(this,r,n.paths),this.textContent="",this.appendChild(r)}else t=I.call(this,n.fragment,n.paths);return{template:e,updates:t}}function q(e){function t(t){c=g(t),l="svg"===e?t.createElementNS(J,"svg"):c,u=r(l)}function i(){return s&&(s=!1,"svg"===e&&pe(c,ie.call(l.childNodes)),a=v(c)),a}var o,a,l,c,u,s,f;return"adopt"===e?function(r){var a=arguments;return r=re(r),f!==r&&(s=!0,f=r,o=function(r,o,f){return s&&(f<o.length?(l=o[f],c={ownerDocument:l.ownerDocument,childNodes:[l],children:[l]},u=n.adopt(c)):(G in r&&(e="svg"),t(r.ownerDocument))),u.apply(null,a),i()}),o}:function(e){return e=re(e),f!==e&&(s=!0,f=e,t(n.document)),u.apply(null,arguments),i()}}function F(e,t){var n=Ne.get(e),r=t.indexOf(":"),i=t;return-1<r&&(i=t.slice(r+1),t=t.slice(0,r)||"html"),n||(n={},Ne.set(e,n)),n[i]||(n[i]=q(t))}/*! (c) 2017 Andrea Giammarchi @WebReflection, (ISC) */
n.document=e,n.hyper=n,n.adopt=function(e){return function(){return Se=!1,l.apply(e,arguments),Se=!0,e}},n.bind=r,n.define=function(e,t){fe[e]=t},n.escape=function(e){return e.replace(/[&<>'"]/g,p)},n.wire=i,n.Component=o,Object.defineProperties(o.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:k("html",q),svg:k("svg",q),state:k("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},setState:{value:function(e){var t=this.state,n="function"==typeof e?e.call(this,t):e;for(var r in n)t[r]=n[r];this.render()}}});var R=1,X=2,Z=3,V=8,W=11,G="ownerSVGElement",J="http://www.w3.org/2000/svg",K=/^style$/i,Q="_hyper: "+(Math.random()*new Date|0)+";",U="\x3c!--"+Q+"--\x3e";a.prototype.splice=function(e,t){for(var n,r=e,i=this.node,o=this.childNodes,a=i.parentNode,l=o.length,c=null==t?l:e+t;r<l&&r<c;r++)a.removeChild(o[r]);if(r=2,l=arguments.length,r<l){if(l-r==1)n=arguments[r];else for(n=g(a.ownerDocument);r<l;)n.appendChild(arguments[r++]);a.insertBefore(n,o[c]||i)}return o.splice.apply(o,arguments)};var _,Y=g(e),ee="object"==typeof navigator&&/Firefox\/(\d+)/.test(navigator.userAgent)&&parseFloat(RegExp.$1)<55,te=function(){var t=e.createElement("p");return t.innerHTML='<i data-i="" class=""></i>',/class/i.test(t.firstChild.attributes[0].name)}(),ne=!("children"in Y),re=function(e){return(re=e.propertyIsEnumerable("raw")||ee?_:function(e){return e})(e)},ie=[].slice,oe={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},ae=typeof WeakMap==typeof ae?function(){return{get:function(e){return e["_hyper: "]},set:function(e,t){Object.defineProperty(e,"_hyper: ",{configurable:!0,value:t})}}}:WeakMap,le=typeof Map==typeof le?function(){var e=[],t=[];return{get:function(n){return t[e.indexOf(n)]},set:function(n,r){t[e.push(n)-1]=r}}}:Map,ce=Array.isArray||function(){var e={}.toString,t=e.call([]);return function(n){return e.call(n)===t}}(),ue="_hyper: ".trim||function(){return this.replace(/^\s+|\s+$/g,"")},se=Object.defineProperty,fe={},he={},pe="append"in Y?function(e,t){e.append.apply(e,t)}:function(e,t){for(var n=0,r=t.length;n<r;n++)e.appendChild(t[n])},de=ne||te?function(e){for(var t,n=[],r=e.childNodes,i=0,o=0,a=r.length;o<a;o++)t=r[o],t.nodeType===R&&(n[i++]=t);return n}:function(e){return e.children},ve=te||ne?function(e,t){for(var n,r=0,i=t.length;r<i;r++)switch(n=t[r++]){case"children":e=de(e)[t[r]];break;default:e=e[n][t[r]]}return e}:function(e,t){for(var n=0,r=t.length;n<r;n++)e=e[t[n++]][t[n]];return e},ge=/(<[a-z]+[a-z0-9:_-]*)((?:[^\S]+[a-z0-9:_-]+(?:=(?:'.*?'|".*?"|<.+?>|\S+))?)+)([^\S]*\/?>)/gi,me=new RegExp("([^\\S][a-z]+[a-z0-9:_-]*=)(['\"]?)"+U+"\\2","gi"),ye=function(e,t,n,r){return t+n.replace(me,be)+r},be=function(e,t,n){return t+(n||'"')+Q+(n||'"')},we=new ae,Ne=new ae,xe=new le,Se=!0,Ee=function(){return Y.appendChild(w(Y,"g")),Y.appendChild(w(Y,"")),1===Y.cloneNode(!0).childNodes.length?function(e){for(var t=e.cloneNode(),n=e.childNodes||[],r=0,i=n.length;r<i;r++)t.appendChild(Ee(n[r]));return t}:function(e){return e.cloneNode(!0)}}(),Ce=te?function(e){for(;e=e.nextSibling;)if(e.nodeType===R)return e}:function(e){return e.nextElementSibling},Te=te?function(e){for(;e=e.previousSibling;)if(e.nodeType===R)return e}:function(e){return e.previousElementSibling};return n.MAX_LIST_SIZE=1e3,n}(document,function(){"use strict";function e(e,n,o){var a=e.length,l=n.length,c=(o||1/0)<Math.sqrt(a*l);return a<1||c?void((l||c)&&e.splice.apply(e,[0,a].concat(n))):l<1?void e.splice(0):void i(e,r(e,n,t(e,n)))}function t(e,t){var n,r,i,o=e.length+1,a=t.length+1,l=o*a,u=0,s=0,f=0,h=0,p=0,d=0,v=new c(l);for(v[0]=0;++u<a;)v[u]=u;for(;++s<o;){for(f=u=0,p=s*a,d=h*a,v[p+u]=s;++u<a;)n=v[d+u]+1,r=v[p+f]+1,i=v[d+f]+(e[h]==t[f]?0:1),v[p+u]=n<r?n<i?n:i:r<i?r:i,++f;++h}return v}function n(e,t,n,r,i,o){e.unshift({type:t,x:n,y:r,count:i,items:o})}function r(e,t,r){for(var i,c,u,s,f,h,p=[],d=e.length+1,v=t.length+1,g=d-1,m=v-1;m&&g;)f=g*v,h=(g-1)*v,i=r[f+m],c=r[h+m],u=r[f+m-1],s=r[h+m-1],s<=u&&s<=c&&s<=i?(m--,g--,s<i&&n(p,l,m,g,1,[t[m]])):u<=c&&u<=i?(m--,n(p,a,m,g,0,[t[m]])):(g--,n(p,o,m,g,1,[]));for(;m--;)n(p,a,m,g,0,[t[m]]);for(;g--;)n(p,o,m,g,1,[]);return p}function i(e,t){var n,r,i,l=0,c=1,u=t.length;if(u){for(i=r=t[0];c<u;)n=t[c++],r.type===n.type&&n.x-r.x<=1&&n.y-r.y<=1?(i.count+=n.count,i.items=i.items.concat(n.items)):(e.splice.apply(e,[i.y+l,i.count].concat(i.items)),l+=i.type===a?i.items.length:i.type===o?-i.count:0,i=n),r=n;e.splice.apply(e,[i.y+l,i.count].concat(i.items))}}/*! Copyright (c) 2017, Andrea Giammarchi, @WebReflection */
var o="del",a="ins",l="sub",c=/^u/.test(typeof Int32Array)?Array:Int32Array;return e.aura=function(e,t){var n=t.splice;return t.splice=function r(){t.splice=n;var i=e.splice.apply(e,arguments);return t.splice=r,i},t},e}());try{module.exports=hyperHTML}catch(e){}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __webpack_require__(9);
var comment_1 = __webpack_require__(0);
var Response = /** @class */ (function () {
    function Response(json, err) {
        this.json = json;
        this.err = err;
    }
    return Response;
}());
exports.Response = Response;
var Headers = /** @class */ (function () {
    function Headers() {
    }
    return Headers;
}());
exports.Headers = Headers;
//
// https://xhr.spec.whatwg.org/
//
var Client = /** @class */ (function () {
    function Client(host, headers, timeout) {
        this.timeout = 5000; // time in milliseconds (default = 5 seconds)
        this.host = host;
        this.headers = headers;
        this.headers['Content-Type'] = 'application/json; charset=utf-8';
        if (timeout !== 0) {
            this.timeout = timeout;
        }
    }
    Client.make = function (env, host, headers, timeout) {
        if (!env.isProd()) {
            return new MockClient();
        }
        return new Client(host, headers, timeout);
    };
    Client.newRequest = function () {
        return new XMLHttpRequest();
    };
    Client.prototype.post = function (path, json) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        try {
                            var xhr_1 = Client.newRequest();
                            for (var key in _this.headers) {
                                xhr_1.setRequestHeader(key, _this.headers[key]);
                            }
                            xhr_1.timeout = _this.timeout;
                            xhr_1.open("POST", _this.host + path);
                            xhr_1.ontimeout = function (e) {
                                e.preventDefault();
                                var header = "Request Timeout";
                                var message = "Request took to long, please try again.";
                                var err = new error_1.Error(503, header, message);
                                var resp = new Response("{}", err);
                                resolve(resp);
                            };
                            xhr_1.onloadend = function (e) {
                                e.preventDefault();
                                if (xhr_1.status < 300) {
                                    // 200 ... 299
                                    var resp = new Response(xhr_1.responseText, null);
                                    resolve(resp);
                                }
                                else if (xhr_1.status > 299 && xhr_1.status < 500) {
                                    // 400 .. 499
                                    var err = error_1.Error.fromJSON(xhr_1.responseText);
                                    var resp = new Response("{}", err);
                                    resolve(resp);
                                }
                                else if (xhr_1.status === 503) {
                                    var header = "Request Timeout";
                                    var message = "Request took to long, please try again.";
                                    var err = new error_1.Error(xhr_1.status, header, message);
                                    var resp = new Response("{}", err);
                                    resolve(resp);
                                }
                                else {
                                    var header = "A server problem";
                                    var message = "It was a problem on our server, please try again.";
                                    var err = new error_1.Error(xhr_1.status, header, message);
                                    var resp = new Response("{}", err);
                                    resolve(resp);
                                }
                            };
                            xhr_1.send(json);
                        }
                        catch (e) {
                            // TODO: log the error
                            var header = "Request failed";
                            var message = "We are investigating the problem, please try ";
                            var err = new error_1.Error(500, header, message);
                            var resp = new Response("{}", err);
                            resolve(resp);
                        }
                    })];
            });
        });
    };
    return Client;
}());
exports.Client = Client;
var MockClient = /** @class */ (function () {
    function MockClient() {
    }
    MockClient.prototype.post = function (path, json) {
        return new Promise(function (resolve) {
            var data = JSON.parse(json);
            switch (data.body) {
                case "400": {
                    var header = "Your comment is not valid, you can do better";
                    var message = "400 is a number and that is not a valid comment.";
                    var err = new error_1.Error(400, header, message);
                    var resp = new Response("{}", err);
                    resolve(resp);
                    break;
                }
                default: {
                    // When it works
                    var comment = new comment_1.Comment(data.body);
                    var resp = new Response(JSON.stringify(comment), null);
                    setTimeout(resolve, 1000, resp);
                    break;
                }
            }
        });
    };
    return MockClient;
}());


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(code, header, message) {
        this.code = code;
        this.status = Error.statusText(code);
        this.header = header;
        this.message = message;
    }
    Error.prototype.toJSON = function () {
        return "{\"error\": {\n                    \"code\": " + this.code + ",\n                    \"status\": \"" + this.status + "\",\n                    \"header\": \"" + this.header + "\",\n                    \"message\": \"" + this.message + "\" }\n                 }";
    };
    Error.fromJSON = function (json) {
        try {
            var body = JSON.parse(json);
            return new Error(body.error.code, body.error.header, body.error.message);
        }
        catch (_a) {
            var header = "A server problem";
            var message = "It was a problem on our server, please try again.";
            return new Error(500, header, message);
        }
    };
    Error.statusText = function (code) {
        switch (code) {
            case 400: {
                // if a form is invalid (form validation)
                return "Bad Request";
            }
            case 401: {
                // if the user must be logged in to perform the action
                return "Unauthorized";
            }
            case 403: {
                // if logged in user does not have access to the resource
                return "Forbidden";
            }
            case 404: {
                // if trying to edit a removed resource (edit of form)
                return "Not Found";
            }
            case 409: {
                // two users are editing the same resource
                return "Conflict";
            }
            case 500: {
                // the server crashed for unknown reason
                return "Internal Server Error";
            }
            case 503: {
                // the server is overloaded with request
                return "Service Unavailable";
            }
            default: {
                return "Unknown Error";
            }
        }
    };
    return Error;
}());
exports.Error = Error;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Env = /** @class */ (function () {
    function Env(env) {
        this.env = "prod";
        switch (env) {
            case "dev": {
                this.env = "dev";
                break;
            }
            case "test": {
                this.env = "test";
                break;
            }
            default: {
                this.env = "prod";
            }
        }
    }
    Env.prototype.isProd = function () {
        return (this.env === "prod");
    };
    return Env;
}());
exports.Env = Env;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(12);
var css_1 = __webpack_require__(1);
var comment_1 = __webpack_require__(0);
var CommentService = /** @class */ (function () {
    function CommentService(xhr, comments) {
        this.xhr = xhr;
        this.comments = comments;
    }
    CommentService.prototype.init = function (state) {
        this.state = state;
        var listItems = [];
        this.comments.forEach(function (comment) {
            var listItem = new comment_1.CommentListItem(comment, "", "", "");
            listItems.push(listItem);
        });
        this.state.getState().commentListWidget.comments = listItems;
    };
    CommentService.prototype.submitComment = function (comment, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var wait, _a, json, err, listItem_1, listItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wait = this.minWait(timeout);
                        return [4 /*yield*/, this.xhr.post(router_1.Router.commentPath, comment.toJSON())];
                    case 1:
                        _a = _b.sent(), json = _a.json, err = _a.err;
                        if (!err) return [3 /*break*/, 3];
                        listItem_1 = new comment_1.CommentListItem(comment, css_1.CSS.errHighlight, err.header, err.message);
                        return [4 /*yield*/, wait];
                    case 2:
                        _b.sent();
                        this.state.setState(function (state) {
                            state.commentListWidget.comments.unshift(listItem_1);
                        });
                        return [2 /*return*/];
                    case 3:
                        listItem = new comment_1.CommentListItem(comment, css_1.CSS.highlight, "", "");
                        return [4 /*yield*/, wait];
                    case 4:
                        _b.sent();
                        this.state.setState(function (state) {
                            state.commentListWidget.comments.unshift(listItem);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentService.prototype.minWait = function (timeout) {
        return new Promise(function (resolve) {
            setTimeout(resolve, timeout);
        });
    };
    return CommentService;
}());
exports.CommentService = CommentService;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.commentPath = "/api/comments";
    return Router;
}());
exports.Router = Router;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map