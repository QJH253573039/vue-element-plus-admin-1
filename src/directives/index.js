import clipboard from './clipboard'
const directives = {
    clipboard
};

console.log(directives);

export function loadDirectives(app){
    Object.keys(directives).forEach((key) => {
        app.directive(key, directives[key])
    })
}