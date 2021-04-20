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