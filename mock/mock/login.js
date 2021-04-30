import { TOKEN} from '../utils/index'

export default {
    // 登录
    "POST /login": async (req, res) => {
        let body = req.body;
        if (!body.username) {
            res.send({
                "data": {},
                "code": 500,
                "message": "请输入用户名",
            });
        }
        if (!body.password) {
            res.send({
                "data": {},
                "code": 500,
                "message": "请输入密码",
            });
        }
        if(body.username != 'admin' || body.password != '123456'){
            res.send({
                "data": {},
                "code": 500,
                "message": "用户名或密码错误",
            });
        }
        res.send({
            "data": TOKEN,
            "code": 200,
            "message": "success",
        });
    },

};