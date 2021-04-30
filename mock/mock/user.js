import {
    mock,
    Random
} from "mockjs";
import { checkToken } from '../utils/index';
import { menus} from '../data/viewRoutes'

export default {
    // 获取用户信息
    "GET /getUserInfo": async (req, res) => {
        if (!checkToken(req.headers)) {
            res.send({
                "data": {},
                "code": 23001,
                "message": "登录失效",
            });
        } else {
            res.send({
                "data": {
                    "userInfo":{
                        "username": 'admin',
                        "email": Random.email(),
                        "phone": 15672892041,
                        "avatar": Random.image('128x128'),
                        "name": Random.cname(),
                        "address": Random.county(true)
                    }
                },
                "code": 200,
                "message": "登录成功",
            })
        }
    },
    "GET /permmenu": async (req,res)=>{
        if (!checkToken(req.headers)) {
            res.send({
                "data": {},
                "code": 23001,
                "message": "登录失效",
            });
        } else {
            res.send({
                "data": {
                    "menus": menus,
                    "perms":[
                        "base:sys:menu:add"
                    ]
                },
                "code": 200,
                "message": "success",
            })
        }
    },

};