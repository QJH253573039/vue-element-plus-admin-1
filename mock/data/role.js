import { mock, Random } from "mockjs";
const Roles = mock([
    {
        id: 1,
        label: "admin",
        name: "系统管理员",
        remark: null,
        create_at: () => Random.datetime(),
    },
    {
        id: 2,
        label: "dev",
        name: "开发",
        remark: null,
        create_at: () => Random.datetime(),
    },
    {
        id: 3,
        label: "admin",
        name: "visitor",
        remark: null,
        create_at: () => Random.datetime(),
    },
    {
        id: 4,
        label: "test",
        name: "测试",
        remark: null,
        create_at: () => Random.datetime(),
    },
])


export {
    Roles,
}