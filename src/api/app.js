import request from '../http/request'

export function uploadFile(data) {
    return request({
        method: "POST",
        url: '/uploadFile',
        data,
    });
}