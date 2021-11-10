import * as ElIconModules from '@element-plus/icons'



export default function generateElIcons(){
    let icons = [];
    for (let key in ElIconModules) {
        icons.push(key)
    }
    return icons
}