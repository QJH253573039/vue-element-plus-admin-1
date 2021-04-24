const directives = {
};

export function loadDirectives(app){
    Object.keys(directives).forEach((key) => {
        app.directive(key, directives[key])
    })
}