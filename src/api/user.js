import request from '../http/request'

// 登录
export function login(data){
    return request({
        method:"POST",
        url:'/login',
        data
    });
}

// 获取用户信息
export function getUserInfo(){
    return request({
        method: "GET",
        url: '/getUserInfo',
    });
}

// 获取权限路由
export function getPermMenu(){
    return request({
        method: "GET",
        url: '/permmenu',
    });
}

// 用户列表
export function getUserList(data){
    return request({
        method: "POST",
        url: '/sys/user/list',
        data
    })
}

// 菜单列表
export function getMenuList(data) {
    return request({
        method: "POST",
        url: '/sys/menu/list',
        data
    })
}

// 角色列表
export function getRoleList(data) {
    return request({
        method: "POST",
        url: '/sys/role/list',
        data
    })
}

// 角色信息
export function getRoleInfo(data){
    return request({
        method: "POST",
        url: '/sys/role/info',
        data
    })
}