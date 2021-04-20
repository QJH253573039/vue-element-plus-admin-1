import { login, getUserInfo} from "@/api/user";
import { getToken, setToken, removeToken } from '@/utils/auth'
import storage from '@/utils/storage'

const state = () => ({
    token: getToken() || null,
    userInfo: storage.get('userInfo') || {}
})  

const mutations = {
    SET_TOKEN(state,token){
        setToken(token)
        state.token = token;
    },
    SET_USERINFO(state, userInfo){
        storage.set('userInfo', userInfo)
        state.userInfo = userInfo;
    },
    CLEAR_USER(state){
        state.userInfo = {}
        storage.remove('userInfo')
    },
    CLEAR_TOKEN(state){
        state.token = null
        removeToken()
    },
}

const actions = {
    async login({ commit }, form){
        return login(form).then((res)=>{
            commit('SET_TOKEN', res.data)
            return res.data;
        });
        
    },
    async logout({commit}){
        commit('CLEAR_USER');
        commit('CLEAR_TOKEN')
        commit('menu/CLEAR_MENU_GROUP', null, { root: true })
        commit("menu/CLEAR_VIEW_ROUTES", null, { root: true })
        commit('menu/CLEAR_PERMIESSION', null, { root: true })
    },
    async queryUserInfo({ commit}){
        return getUserInfo().then((res) => {
            commit("SET_USERINFO", res.data.userInfo);
            return res.data.userInfo;
        });
    }
}


export default {
    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations
}