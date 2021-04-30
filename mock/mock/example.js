import {
  mock,
  Random
} from "mockjs";

export default {
  // list
  "GET /example/list": async (req, res) => {
    res.send({
      "data": {
        "id": 5,
        "version": 1,
        "createTime": 1568081706000,
      },
      "code": 200,
      "message": "请求成功",
      "result": "SUCCESS"
    });
  },

  // PaginationList
  "POST /example/getPaginationList": async (req, res) => {
    let {
      pageNo,
      pageSize,
    } = req.body;
    pageSize = parseInt(pageSize);
    pageNo = parseInt(pageNo);

    res.send(mock({
      "data": {
        "pageNo": pageNo,
        "pageSize": pageSize,
        "total": 35,
        "totalPage": 4,
        "rows|10": [{
          "id": () => Random.increment(),
          "createTime": 1568861371000,
          "userId": 5
        }]
      },
      "code": 200,
      "message": "请求成功",
      "result": "SUCCESS"
    }));
  },

};