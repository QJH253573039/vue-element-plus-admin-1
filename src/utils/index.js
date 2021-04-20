export function deepTree(list) {
    let newList = [];
    let map = {};

    list.forEach((e) => (map[e.id] = e));

    list.forEach((e) => {
        let parent = map[e.parentId];

        if (parent) {
            (parent.children || (parent.children = [])).push(e);
        } else {
            if (!e.parentId) {
                newList.push(e);
            }
        }
    });

    const fn = (list) => {
        list.map((e) => {
            if (e.children instanceof Array) {
                fn(e.children);
            }
        });
    };

    fn(newList);

    return newList;
}


export const revisePath = (path) => {
    if (!path) {
        return "";
    }
    
    if (path[0] == "/") {
        return path;
    } else {
        return `/${path}`;
    }
};