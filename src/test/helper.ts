export const adjustSnap = (html: string): string => {
    let pattern = new RegExp('<!--_hyper: -\d+;-->');
    return html.replace(/_hyper:\s*-?\d+/g, '');
};


// await sleep(1000) // sleep for 1 second.
export const sleep = (ms: number): Promise<any> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
