import { getPermMenu } from '@/api/user'
import { deepTree, revisePath } from '@/utils'
import { ElMessage } from 'element-plus';
import storage from '@/utils/storage';

const state = () => ({
    // 菜单列表
    menuGroup: storage.get('menuGroup') || [],      
    // 权限列表
    permission: storage.get('permission') || [],
    // 路由列表
    viewRoutes: storage.get('viewRoutes') || [],      
    //菜单是否展开
    collapse: false,     
})

const mutations = {
    SET_MENU_GROUP(state, list) {
        state.menuGroup = list;
        storage.set('menuGroup', list)
    },
    SET_PERMIESSION(state, permission) {
        state.permission = permission;
        storage.set('permission', permission)
    },
    SET_VIEW_ROUTES(state, list) {
        state.viewRoutes = list;
        storage.set('viewRoutes', list)
    },
    SET_COLLASPE(state,value = false){
        state.collapse = value
    },
    CLEAR_MENU_GROUP(state){
        state.menuGroup = []
        storage.remove('menuGroup')
    },
    CLEAR_VIEW_ROUTES(state) { 
        state.viewRoutes = []
        storage.remove('viewRoutes')
    },
    CLEAR_PERMIESSION(state) { 
        state.permission = []
        storage.remove('permission')
    },
}

const actions = {
    async generateRoutes({ commit }) {
        return new Promise((resolve, reject) => {
            getPermMenu().then((result) => {
                const { menus, perms } = result.data;
                const routes = menus
                    .filter((e) => e.type != 2)
                    .map((e) => {
                        return {
                            id: e.id,
                            parentId: e.parentId,
                            path: revisePath(e.path),
                            viewPath: e.viewPath,
                            name: e.name,
                            meta: {
                                keepAlive: e.meta.keepAlive == 1,
                                title: e.meta.title || e.name,
                                type: e.meta.type,
                                icon: e.meta.icon,
                                show: e.meta.show,
                            },
                            children: [],
                        };
                    });

                // 格式化菜单
                const menuGroup = deepTree(routes);
                // 设置权限
                commit("SET_PERMIESSION", perms);
                // 设置菜单组
                commit("SET_MENU_GROUP", menuGroup);
                // 设置视图路由
                const viewRoutes = routes.filter((e) => e.meta.type == 1)
                commit("SET_VIEW_ROUTES", viewRoutes);
                resolve(viewRoutes)
            }).catch((err) => {
                console.error("菜单加载异常", err);
                ElMessage.error({
                    message: '"菜单加载异常"',
                    type: 'error'
                });
                reject(err);
            });

        })
    }
}


export default {
    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations
}