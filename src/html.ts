import hyperHTML = require('hyperhtml');

export class HTML {
    static wire(obj?: object, typeID?: string): (template: TemplateStringsArray, ...args : any[]) => void {
        return hyperHTML.wire(obj, typeID)
    }
    static bind(element: Element): (template: TemplateStringsArray, ...args : any[]) => void {
        return hyperHTML.bind(element)
    }
}
