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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comment = __webpack_require__(1);
var client_1 = __webpack_require__(4);
var env_1 = __webpack_require__(7);
var main = function () {
    var env = new env_1.Env("dev");
    new comment.Component({
        root: "#funcbox-comment",
        client: client_1.Client.make(env),
        comments: [{ body: "This is the body text. Very cool" }],
        listTitle: "Comments"
    });
};
main();


/***/ }),
/* 1 */
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
var dom_1 = __webpack_require__(2);
var Component = /** @class */ (function () {
    function Component(props) {
        var root = document.querySelector(props.root);
        if (root) {
            this.root = root;
            this.bind = dom_1.Dom.bind(this.root);
            this.form = new Form(props.client, new View(root));
            this.list = new List(props.listTitle, props.comments);
            this.render();
        }
    }
    Component.prototype.render = function () {
        if (this.root) {
            (_a = ["", ""], _a.raw = ["",
                ""], this.bind(_a, [
                this.form.render()
                // this.list.render()
            ]));
        }
        var _a;
    };
    return Component;
}());
exports.Component = Component;
var View = /** @class */ (function () {
    function View(root) {
        this.data = new Data();
        this.body = new Body();
        this.submit = new Submit();
        this.root = root;
    }
    View.prototype.focusBody = function () {
        var el = this.root.querySelector(".funcbox-textarea");
        el.focus();
    };
    View.prototype.isValid = function () {
        return this.body.isValid(this.data.body);
    };
    View.prototype.toJSON = function () {
        return JSON.stringify(this.data);
    };
    View.prototype.disableSubmit = function () {
        this.submit.disable = true;
    };
    View.prototype.enableSubmit = function () {
        this.submit.disable = false;
    };
    View.prototype.reset = function () {
        this.data.body = "";
        this.body.setOk();
        this.submit.disable = false;
    };
    return View;
}());
var Data = /** @class */ (function () {
    function Data() {
        this.body = "";
    }
    return Data;
}());
var Body = /** @class */ (function () {
    function Body() {
        this.errorKlass = "";
        this.errorMsg = "Please, write something.";
        this.placeholder = "Write a comment";
    }
    Body.prototype.isValid = function (value) {
        if (value === "") {
            return this.setError();
        }
        else {
            return this.setOk();
        }
    };
    Body.prototype.setError = function () {
        this.errorKlass = Body.error;
        return false;
    };
    Body.prototype.setOk = function () {
        this.errorKlass = Body.ok;
        return true;
    };
    Body.ok = "";
    Body.error = "error";
    return Body;
}());
var Submit = /** @class */ (function () {
    function Submit() {
        this.title = "Send";
        this.disable = false;
    }
    return Submit;
}());
var Form = /** @class */ (function () {
    function Form(client, view) {
        this.bodyHasGrow = false;
        this.view = view;
        this.client = client;
        this.html = dom_1.Dom.wire(this);
        this.submit = this.submit.bind(this);
        this.saveInput = this.saveInput.bind(this);
        this.removeError = this.removeError.bind(this);
        this.grow = this.grow.bind(this);
        // this.shrink = this.shrink.bind(this);
    }
    Form.prototype.saveInput = function (e) {
        var input = e.target;
        this.view.data[input.name] = input.value.trim();
    };
    Form.prototype.removeError = function (e) {
        if (this.view.body.errorKlass !== Body.ok) {
            this.view.body.errorKlass = Body.ok;
            this.render();
        }
    };
    Form.prototype.grow = function (e) {
        var el = e.target;
        if (!this.bodyHasGrow && el.scrollHeight > el.clientHeight) {
            this.bodyHasGrow = true;
            el.style.height = el.scrollHeight + "px";
        }
        if (this.bodyHasGrow) {
            el.style.height = "inherit";
            el.style.height = el.scrollHeight + "px";
        }
    };
    Form.prototype.submit = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var req, _a, json, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        this.view.disableSubmit();
                        this.render();
                        if (!this.view.isValid()) {
                            this.view.enableSubmit();
                            this.render();
                            this.view.focusBody();
                            return [2 /*return*/];
                        }
                        req = this.view.toJSON();
                        this.view.reset();
                        this.render();
                        return [4 /*yield*/, this.client.post(req)];
                    case 1:
                        _a = _b.sent(), json = _a.json, err = _a.err;
                        if (err) {
                            // animate and replace list item with error message
                            if (err.code == 400) {
                            }
                            console.log(err.code, err.status, err.message, err.value);
                        }
                        else {
                            // resolve optimistic update
                            // update store.
                            console.log("json: ", json);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Form.prototype.render = function () {
        var data = this.view.data;
        var body = this.view.body;
        var submit = this.view.submit;
        return (_a = ["\n            <form   class=\"funcbox-comment-form\"\n                    onsubmit=", "\n                    oninput=", ">\n                <div class=\"", "\">\n                    <textarea   class=\"funcbox-textarea\"\n                                oninput=\"", "\"\n                                onkeydown=\"", "\"\n                                tabindex=\"1\"\n                                name='body'\n                                placeholder=\"", "\"\n                                value=\"", "\"></textarea>\n                    <span class=\"funcbox-textarea-error\">", "</span>\n                </div>\n                <button class=\"funcbox-button\"\n                        tabindex=\"2\"\n                        disabled=", ">", "</button>\n            </form>"], _a.raw = ["\n            <form   class=\"funcbox-comment-form\"\n                    onsubmit=", "\n                    oninput=", ">\n                <div class=\"", "\">\n                    <textarea   class=\"funcbox-textarea\"\n                                oninput=\"", "\"\n                                onkeydown=\"", "\"\n                                tabindex=\"1\"\n                                name='body'\n                                placeholder=\"", "\"\n                                value=\"", "\"></textarea>\n                    <span class=\"funcbox-textarea-error\">", "</span>\n                </div>\n                <button class=\"funcbox-button\"\n                        tabindex=\"2\"\n                        disabled=", ">", "</button>\n            </form>"], this.html(_a, this.submit, this.saveInput, ['funcbox-comment-group', body.errorKlass].join(' '), this.grow, this.removeError, body.placeholder, data.body, body.errorMsg, submit.disable, submit.title));
        var _a;
    };
    return Form;
}());
var List = /** @class */ (function () {
    function List(title, comments) {
        this.title = title;
        this.html = dom_1.Dom.wire(this);
    }
    List.prototype.click = function (e) {
        console.log(e);
        console.log(e.target);
    };
    List.prototype.render = function () {
        var _this = this;
        return (_a = ["\n            <h3>", "</h3>\n            <ul class=\"comments\">", "\n            </ul>"], _a.raw = ["\n            <h3>", "</h3>\n            <ul class=\"comments\">",
            "\n            </ul>"], this.html(_a, this.title, this.comments.map(function (comment) {
            return (_a = ["\n                <li onclick=\"", "\">", "</li>"], _a.raw = ["\n                <li onclick=\"", "\">", "</li>"], dom_1.Dom.wire(comment)(_a, _this.click, comment.body));
            var _a;
        })));
        var _a;
    };
    return List;
}());


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyperHTML = __webpack_require__(3);
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
/* 3 */
/***/ (function(module, exports) {

var hyperHTML=function(e,t){"use strict";function n(e){return arguments.length<2?null==e?q("html"):"string"==typeof e?i(null,e):"raw"in e?q("html")(e):"nodeType"in e?r(e):F(e,"html"):("raw"in e?q("html"):i).apply(null,arguments)}function r(e){return l.bind(e)}function i(e,t){return arguments.length<1?q("html"):null==e?q(t||"html"):F(e,t||"html")}function o(){}function a(e,n){return this.node=e,this.childNodes=n,t.aura(this,n)}function l(e){var t=we.get(this);return t&&t.template===re(e)||(t=B.apply(this,arguments),we.set(this,t)),z.apply(t.updates,arguments),this}function c(e,t,n){var r,i=e.ownerElement,o=/^on/.test(n),a="data"===n||x(i,n)&&!K.test(n),l=o?n.slice(2):"",c=o||a;return o&&n.toLowerCase()in i&&(l=l.toLowerCase()),c&&t.push(i,n),o?function(e){r!==e&&(r&&i.removeEventListener(l,r,!1),r=e,e&&i.addEventListener(l,e,!1))}:a?function(e){r!==e&&(r=e,i[n]!==e&&(null==e?(i[n]=null,i.removeAttribute(n)):i[n]=e))}:function(t){r!==t&&(r=t,e.value!==t&&(null==t?c||(c=!0,i.removeAttributeNode(e)):(e.value=t,c&&(c=!1,i.setAttributeNode(e)))))}}function u(e){var t;return function(n){n!==t&&(t=n,e.textContent=n)}}function s(e,r,i){var a;return function l(c){switch(typeof c){case"string":case"number":case"boolean":var u=r.length;1===u&&r[0].nodeType===Z?a!==c&&(a=c,r[0].textContent=c):(a=c,u?i.splice(0,u,w(e,c)):r[0]=e.parentNode.insertBefore(w(e,c),e));break;case"function":l(c(e.parentNode,r,0));break;case"object":case"undefined":if(null==c){a=c,l("");break}c instanceof o&&(c=c.render());default:if(a=c,ce(c)){var u=c.length;if(0===u)i.splice(0);else switch(typeof c[0]){case"string":case"number":case"boolean":l({html:c});break;case"function":for(var s=e.parentNode,f=0;f<u;f++)c[f]=c[f](s,r,f);l(c.concat.apply([],c));break;case"object":if(ce(c[0])&&(c=c.concat.apply([],c)),T(c[0])){Promise.all(c).then(l);break}for(var f=0,u=c.length;f<u;f++)c[f]instanceof o&&(c[f]=c[f].render());default:t(i,c,n.MAX_LIST_SIZE)}}else if(C(c))t(i,c.nodeType===W?ie.call(c.childNodes):[c],n.MAX_LIST_SIZE);else if(T(c))c.then(l);else if("placeholder"in c)S(l,c);else if("text"in c)l(String(c.text));else if("any"in c)l(c.any);else if("html"in c){var h=[].concat(c.html).join("");i.splice(0);var p=m(e,h);r.push.apply(r,p.childNodes),e.parentNode.insertBefore(p,e)}else l("length"in c?ie.call(c):E(c))}}}function f(e,t,n){for(var r,i,o=Q,a=e.attributes,l=0,c=a.length;l<c;l++)i=a[l],i.value===o&&(r=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1"),t.push(M("attr",e.attributes[r.toLowerCase()],r)))}function h(e,t,n){for(var r,i=e.childNodes,o=i.length,a=0;a<o;a++)switch(r=i[a],r.nodeType){case R:f(r,t,n),h(r,t,n);break;case V:r.textContent===Q&&(n.shift(),t.push(M("any",r)));break;case Z:K.test(e.nodeName)&&ue.call(r.textContent)===U&&(n.shift(),t.push(M("text",e)))}}function p(e){return oe[e]}function d(e){return{html:e}}function v(e){for(var t,n=[],r=e.childNodes,i=0,o=r.length;i<o;i++)t=r[i],t.nodeType!==R&&0===ue.call(t.textContent).length||n.push(t);return 1===n.length?n[0]:n}function g(e){return e.createDocumentFragment()}function m(e,t){return(G in e?b:y)(e,t.replace(ge,ye))}function y(e,t){var n,r=e.ownerDocument,i=r.createElement("template"),o="content"in i,a=!1;if(o||(n=g(r),a=/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)),a){var l=RegExp.$1;i.innerHTML="<table>"+t+"</table>",pe(n,ie.call(i.querySelectorAll(l)))}else i.innerHTML=t,o?n=i.content:pe(n,ie.call(i.childNodes));return n}function b(e,t){var n=e.ownerDocument,r=g(n);if(te||ne){var i=n.createElement("div");i.innerHTML='<svg xmlns="'+J+'">'+t+"</svg>",pe(r,ie.call(i.firstChild.childNodes))}else{var i=n.createElementNS(J,"svg");i.innerHTML=t,pe(r,ie.call(i.childNodes))}return r}function w(e,t){return e.ownerDocument.createTextNode(t)}function N(e){var t=n.document,r=t.customElements||t.defaultView.customElements;return r&&r.get(e.nodeName.toLowerCase())}function x(e,t){var n=!(G in e);if(n&&/-/.test(e.nodeName)){var r=N(e);r&&(e=r.prototype)}return n&&t in e}function S(e,t){e(t.placeholder),"text"in t?Promise.resolve(t.text).then(String).then(e):"any"in t?Promise.resolve(t.any).then(e):"html"in t?Promise.resolve(t.html).then(d).then(e):Promise.resolve(E(t)).then(e)}function E(e){for(var t in fe)if(e.hasOwnProperty(t))return fe[t](e[t])}function C(e){return"ELEMENT_NODE"in e}function T(e){return null!=e&&"then"in e}function k(e,t){var n="_"+e+"$";return{get:function(){return this[n]||(this[e]=t.call(this,e))},set:function(e){se(this,n,{configurable:!0,value:e})}}}function A(e){for(var t=0,n=e.length;t<n;t++)e[t++].removeAttribute(e[t])}function L(e,t,n,r){var i;switch(e.type){case"any":i=s(t,r,new a(t,r));break;case"attr":i=c(t,n,e.name);break;case"text":i=u(t)}return i}function M(e,t,n){return{type:e,path:H(t),name:n}}function _(e){var t="_"+e.join(U);return he[t]||(he[t]=e)}function D(e,t){var n=t.previousSibling;n&&n.nodeType===Z&&(e.removeChild(n),D(e,t))}function O(e,t,n){n?e.insertBefore(t,n):e.appendChild(t)}function j(e,t,n,r){for(var i=e,o=e.ownerDocument,a=n.path,l=ve(t,a),c=0,u=a.length;c<u;c++)switch(a[c++]){case"attributes":var s=l.name;e.hasAttribute(s)||e.setAttribute(s,""),i=e.attributes[s];break;case"childNodes":var f=de(e),h=de(l.parentNode);i=Te(l);var p=i?a.indexOf.call(h,i)+1:-1;i=Ce(l);var d=i?a.indexOf.call(h,i):-1;switch(i=o.createComment(Q),!0){case d<0:d=f.length;break;case p<0:p=0;default:d=-(h.length-d)}r.push.apply(r,ie.call(f,p,d)),r.length?O(e,i,Ce(r[r.length-1])):O(e,i,ie.call(f,d)[0]),0===r.length&&D(e,i);break;default:i=de(e)[a[c]]||e.appendChild(e.ownerDocument.createElement(ve(t,a.slice(0,c+1)).nodeName)),e=i}return i}function I(e,t){for(var n,r,i=[],o=[],a=0,l=t.length;a<l;a++)r=[],n=t[a],i[a]=L(n,j(this,e,n,r),o,r);return A(o),i}function P(e){var t=[],n=m(this,e.join(U)),r={fragment:n,paths:t};return h(n,t,e.slice()),xe.set(e,r),r}function H(e){var t,n=[];switch(e.nodeType){case R:case W:t=e;break;case V:t=e.parentNode,n.unshift("childNodes",n.indexOf.call(t.childNodes,e));break;case X:default:t=e.ownerElement,n.unshift("attributes",e.name)}for(e=t;t=t.parentNode;e=t)n.unshift("children",n.indexOf.call(de(t),e));return n}function $(e,t){for(var n,r=[],i=[],o=0,a=t.length;o<a;o++)n=t[o],r[o]=L(n,ve(e,n.path),i,[]);return A(i),r}function z(){for(var e=1,t=arguments.length;e<t;e++)this[e-1](arguments[e])}function B(e){e=re(e);var t,n=xe.get(e)||P.call(this,e);if(Se){var r=Ee(n.fragment);t=$.call(this,r,n.paths),this.textContent="",this.appendChild(r)}else t=I.call(this,n.fragment,n.paths);return{template:e,updates:t}}function q(e){function t(t){c=g(t),l="svg"===e?t.createElementNS(J,"svg"):c,u=r(l)}function i(){return s&&(s=!1,"svg"===e&&pe(c,ie.call(l.childNodes)),a=v(c)),a}var o,a,l,c,u,s,f;return"adopt"===e?function(r){var a=arguments;return r=re(r),f!==r&&(s=!0,f=r,o=function(r,o,f){return s&&(f<o.length?(l=o[f],c={ownerDocument:l.ownerDocument,childNodes:[l],children:[l]},u=n.adopt(c)):(G in r&&(e="svg"),t(r.ownerDocument))),u.apply(null,a),i()}),o}:function(e){return e=re(e),f!==e&&(s=!0,f=e,t(n.document)),u.apply(null,arguments),i()}}function F(e,t){var n=Ne.get(e),r=t.indexOf(":"),i=t;return-1<r&&(i=t.slice(r+1),t=t.slice(0,r)||"html"),n||(n={},Ne.set(e,n)),n[i]||(n[i]=q(t))}/*! (c) 2017 Andrea Giammarchi @WebReflection, (ISC) */
n.document=e,n.hyper=n,n.adopt=function(e){return function(){return Se=!1,l.apply(e,arguments),Se=!0,e}},n.bind=r,n.define=function(e,t){fe[e]=t},n.escape=function(e){return e.replace(/[&<>'"]/g,p)},n.wire=i,n.Component=o,Object.defineProperties(o.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:k("html",q),svg:k("svg",q),state:k("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},setState:{value:function(e){var t=this.state,n="function"==typeof e?e.call(this,t):e;for(var r in n)t[r]=n[r];this.render()}}});var R=1,X=2,Z=3,V=8,W=11,G="ownerSVGElement",J="http://www.w3.org/2000/svg",K=/^style$/i,Q="_hyper: "+(Math.random()*new Date|0)+";",U="\x3c!--"+Q+"--\x3e";a.prototype.splice=function(e,t){for(var n,r=e,i=this.node,o=this.childNodes,a=i.parentNode,l=o.length,c=null==t?l:e+t;r<l&&r<c;r++)a.removeChild(o[r]);if(r=2,l=arguments.length,r<l){if(l-r==1)n=arguments[r];else for(n=g(a.ownerDocument);r<l;)n.appendChild(arguments[r++]);a.insertBefore(n,o[c]||i)}return o.splice.apply(o,arguments)};var _,Y=g(e),ee="object"==typeof navigator&&/Firefox\/(\d+)/.test(navigator.userAgent)&&parseFloat(RegExp.$1)<55,te=function(){var t=e.createElement("p");return t.innerHTML='<i data-i="" class=""></i>',/class/i.test(t.firstChild.attributes[0].name)}(),ne=!("children"in Y),re=function(e){return(re=e.propertyIsEnumerable("raw")||ee?_:function(e){return e})(e)},ie=[].slice,oe={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},ae=typeof WeakMap==typeof ae?function(){return{get:function(e){return e["_hyper: "]},set:function(e,t){Object.defineProperty(e,"_hyper: ",{configurable:!0,value:t})}}}:WeakMap,le=typeof Map==typeof le?function(){var e=[],t=[];return{get:function(n){return t[e.indexOf(n)]},set:function(n,r){t[e.push(n)-1]=r}}}:Map,ce=Array.isArray||function(){var e={}.toString,t=e.call([]);return function(n){return e.call(n)===t}}(),ue="_hyper: ".trim||function(){return this.replace(/^\s+|\s+$/g,"")},se=Object.defineProperty,fe={},he={},pe="append"in Y?function(e,t){e.append.apply(e,t)}:function(e,t){for(var n=0,r=t.length;n<r;n++)e.appendChild(t[n])},de=ne||te?function(e){for(var t,n=[],r=e.childNodes,i=0,o=0,a=r.length;o<a;o++)t=r[o],t.nodeType===R&&(n[i++]=t);return n}:function(e){return e.children},ve=te||ne?function(e,t){for(var n,r=0,i=t.length;r<i;r++)switch(n=t[r++]){case"children":e=de(e)[t[r]];break;default:e=e[n][t[r]]}return e}:function(e,t){for(var n=0,r=t.length;n<r;n++)e=e[t[n++]][t[n]];return e},ge=/(<[a-z]+[a-z0-9:_-]*)((?:[^\S]+[a-z0-9:_-]+(?:=(?:'.*?'|".*?"|<.+?>|\S+))?)+)([^\S]*\/?>)/gi,me=new RegExp("([^\\S][a-z]+[a-z0-9:_-]*=)(['\"]?)"+U+"\\2","gi"),ye=function(e,t,n,r){return t+n.replace(me,be)+r},be=function(e,t,n){return t+(n||'"')+Q+(n||'"')},we=new ae,Ne=new ae,xe=new le,Se=!0,Ee=function(){return Y.appendChild(w(Y,"g")),Y.appendChild(w(Y,"")),1===Y.cloneNode(!0).childNodes.length?function(e){for(var t=e.cloneNode(),n=e.childNodes||[],r=0,i=n.length;r<i;r++)t.appendChild(Ee(n[r]));return t}:function(e){return e.cloneNode(!0)}}(),Ce=te?function(e){for(;e=e.nextSibling;)if(e.nodeType===R)return e}:function(e){return e.nextElementSibling},Te=te?function(e){for(;e=e.previousSibling;)if(e.nodeType===R)return e}:function(e){return e.previousElementSibling};return n.MAX_LIST_SIZE=1e3,n}(document,function(){"use strict";function e(e,n,o){var a=e.length,l=n.length,c=(o||1/0)<Math.sqrt(a*l);return a<1||c?void((l||c)&&e.splice.apply(e,[0,a].concat(n))):l<1?void e.splice(0):void i(e,r(e,n,t(e,n)))}function t(e,t){var n,r,i,o=e.length+1,a=t.length+1,l=o*a,u=0,s=0,f=0,h=0,p=0,d=0,v=new c(l);for(v[0]=0;++u<a;)v[u]=u;for(;++s<o;){for(f=u=0,p=s*a,d=h*a,v[p+u]=s;++u<a;)n=v[d+u]+1,r=v[p+f]+1,i=v[d+f]+(e[h]==t[f]?0:1),v[p+u]=n<r?n<i?n:i:r<i?r:i,++f;++h}return v}function n(e,t,n,r,i,o){e.unshift({type:t,x:n,y:r,count:i,items:o})}function r(e,t,r){for(var i,c,u,s,f,h,p=[],d=e.length+1,v=t.length+1,g=d-1,m=v-1;m&&g;)f=g*v,h=(g-1)*v,i=r[f+m],c=r[h+m],u=r[f+m-1],s=r[h+m-1],s<=u&&s<=c&&s<=i?(m--,g--,s<i&&n(p,l,m,g,1,[t[m]])):u<=c&&u<=i?(m--,n(p,a,m,g,0,[t[m]])):(g--,n(p,o,m,g,1,[]));for(;m--;)n(p,a,m,g,0,[t[m]]);for(;g--;)n(p,o,m,g,1,[]);return p}function i(e,t){var n,r,i,l=0,c=1,u=t.length;if(u){for(i=r=t[0];c<u;)n=t[c++],r.type===n.type&&n.x-r.x<=1&&n.y-r.y<=1?(i.count+=n.count,i.items=i.items.concat(n.items)):(e.splice.apply(e,[i.y+l,i.count].concat(i.items)),l+=i.type===a?i.items.length:i.type===o?-i.count:0,i=n),r=n;e.splice.apply(e,[i.y+l,i.count].concat(i.items))}}/*! Copyright (c) 2017, Andrea Giammarchi, @WebReflection */
var o="del",a="ins",l="sub",c=/^u/.test(typeof Int32Array)?Array:Int32Array;return e.aura=function(e,t){var n=t.splice;return t.splice=function r(){t.splice=n;var i=e.splice.apply(e,arguments);return t.splice=r,i},t},e}());try{module.exports=hyperHTML}catch(e){}

/***/ }),
/* 4 */
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
var error_1 = __webpack_require__(5);
var comment_1 = __webpack_require__(6);
var Response = /** @class */ (function () {
    function Response(json, err) {
        this.json = json;
        this.err = err;
    }
    return Response;
}());
exports.Response = Response;
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.make = function (env) {
        if (!env.isProd()) {
            return new MockClient();
        }
        return new Client();
    };
    Client.prototype.post = function (json) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var resp = new Response("No implementation" + json, null);
                        resolve(resp);
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
    MockClient.prototype.post = function (json) {
        return new Promise(function (resolve) {
            var data = JSON.parse(json);
            switch (data.body) {
                case "400": {
                    var comment = new comment_1.CommentError("400", "400 is a number an not a valid comment.");
                    var json_1 = JSON.stringify(comment); // this is how it comes from the server.
                    var err = new error_1.Error(400, "Bad Request", JSON.parse(json_1));
                    var j = JSON.stringify(err);
                    var resp = new Response(j, err);
                    resolve(resp);
                    break;
                }
                default: {
                    // when it works...
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(code, message, data) {
        this.code = code;
        this.status = Error.statusText(code);
        this.message = message;
        this.value = data;
    }
    Error.fromJSON = function (json) {
        var body = JSON.parse(json);
        return new Error(body.error.code, body.error.message, body.error.value);
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
                return "Unknown error";
            }
        }
    };
    return Error;
}());
exports.Error = Error;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Comment = /** @class */ (function () {
    function Comment(body) {
        this.body = body;
    }
    return Comment;
}());
exports.Comment = Comment;
var CommentError = /** @class */ (function () {
    function CommentError(body, err) {
        this.body = body;
        this.err = err;
    }
    return CommentError;
}());
exports.CommentError = CommentError;


/***/ }),
/* 7 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map