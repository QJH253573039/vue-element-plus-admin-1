import { toRaw } from 'vue'
export default {
    // 用户token
    token: (state) => state.user.token,
    // 用户信息
    userInfo: (state) => state.user.userInfo,
    // 菜单列表
    menuGroup: (state) => toRaw(state.menu.menuGroup),
    // 权限列表
    permission: (state) => toRaw(state.menu.permission),
    // 路由列表
    viewRoutes: (state) => toRaw(state.menu.viewRoutes),
    // 菜单是否展开
    menuCollapse:(state)=>state.menu.collapse,
}