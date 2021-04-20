import { getToken } from '@/utils/auth'

const actions = {
    appLoad({dispatch}){
        if (getToken()) {
            dispatch("menu/generateRoutes", null, { root: true });
            dispatch("user/queryUserInfo", null, { root: true });
        }
    }
}


export default {
    namespaced: true,
    actions: actions,
}