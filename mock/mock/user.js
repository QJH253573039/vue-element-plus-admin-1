import {mock,Random} from "mockjs";
import { checkToken, getRandomArrayElements, sample } from '../utils/index';
import { routes } from '../data/viewRoutes'
import { menus} from '../data/menu'
import { Roles } from '../data/role'

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
                    "userInfo": {
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
    "GET /permmenu": async (req, res) => {
        if (!checkToken(req.headers)) {
            res.send({
                "data": {},
                "code": 23001,
                "message": "登录失效",
            });
        } else {
            res.send({
                "data": {
                    "menus": routes,
                    "perms": [
                        "base:sys:menu:add"
                    ]
                },
                "code": 200,
                "message": "success",
            })
        }
    },
    // 用户列表
    "POST /sys/user/list":async (req,res) => {
        let {pageNo,pageSize,} = req.body;
        pageSize = parseInt(pageSize);
        pageNo = parseInt(pageNo);
        let totalPage = Math.ceil(1000 / pageSize);
        let departmentList = ['开发','游客','测试','管理员','Root','产品','商务'];
        let roleList = ['开发', '游客', '测试', '管理员', 'Root', '产品', '商务'];
        res.send(mock({
            "data": {
                "pageNo": pageNo || 1,
                "pageSize": pageSize || 10,
                "total": 1000,
                "totalPage": totalPage,
                "rows|10": [{
                    "id": () => Random.increment(),
                    "username": () => Random.word(),
                    "nickname": () => Random.name(),
                    "name": () => Random.cname(),
                    "avatar": () => Random.image('200x200'),
                    "status": () => Random.integer(0, 1),
                    "departmentName": () => sample(departmentList),
                    "email": () => Random.email(),
                    "roleName": () => getRandomArrayElements(roleList),
                    "phone":"",
                    "remark":"",
                    "create_at": () => Random.datetime(),
                }]
            },
            "code": 200,
            "message": "请求成功",
            "result": "SUCCESS"
        }));
    },
    // 上传图片
    "POST /uploadFile":async (req,res)=>{
        res.send(mock({
            "data": {
                "url": () => Random.image('200x200'),
            },
            "code": 200,
            "message": "请求成功",
            "result": "SUCCESS"
        }))
    },
    // 菜单列表
    "POST /sys/menu/list":async (req,res)=>{
        res.send({
            "data": menus,
            "code": 200,
            "message": "请求成功",
            "result": "SUCCESS"
        })
    },
    "POST /sys/role/list":async(req,res)=>{
        res.send({
            "data": {
                "pageNo": 1,
                "pageSize": 10,
                "total": 4,
                "totalPage": 1,
                "rows": Roles
            },
            "code": 200,
            "message": "请求成功",
            "result": "SUCCESS"
        });
    },
    "POST /sys/role/info":async(req,res)=>{
        res.send(mock({
            "data": {
                id: 1,
                label: "",
                menuIdList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                name: "",
                remark: null,
                create_at: '',
            },
            "code": 200,
            "message": "请求成功",
            "result": "SUCCESS"
        }))
    }
};