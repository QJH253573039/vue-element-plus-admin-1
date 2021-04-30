import {
    mock,
    Random
} from "mockjs";

export default {
    // list
    "POST /table/list": async (req, res) => {
        let {
            pageNo,
            pageSize,
        } = req.body;
        pageSize = parseInt(pageSize);
        pageNo = parseInt(pageNo);
        let totalPage = Math.ceil(1000 / pageSize);
        res.send(mock({
            "data": {
                "pageNo": pageNo || 1,
                "pageSize": pageSize || 10,
                "total": 1000,
                "totalPage": totalPage,
                "rows|10": [{
                    "id": () => Random.increment(),
                    "create_at": 1568861371000,
                    "title": () =>  Random.title(),
                    "author": () =>  Random.name(),
                    "star|1-5": () => Random.integer(1, 5),
                    "status": () => Random.integer(0, 2),
                    "viewCount": () => Random.integer(10, 100000)
                }]
            },
            "code": 200,
            "message": "请求成功",
            "result": "SUCCESS"
        }));
    },
}