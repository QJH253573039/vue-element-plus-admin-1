import request from '../http/request'

export function login(data){
    return request({
        method:"POSt",
        url:'/login',
        data
    });
}