export const adjustSnap = (html: string): string => {
    let pattern = new RegExp('<!--_hyper: -\d+;-->');
    return html.replace(/_hyper:\s*-?\d+/g, '');
};
