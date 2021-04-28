
import request from '../http/request'

export function getTableList(data) {
    return request({
        method: "POST",
        url: '/table/list',
        data
    });
}
