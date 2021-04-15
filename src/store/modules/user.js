import { getToken, setToken } from '@/utils/auth'

const state = () => ({
    token: getToken(),
    userInfo:''
})  

const mutations = {
    setToken(state,token){
        state.token = token;
    },
    setUserInfo(state, userInfo){
        state.userInfo = userInfo;
    },
}

const actions = {
    login({ commit }, data){
        const { token, ...userInfo } = data;
        setToken(token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        commit('setToken', token)
        commit('setUserInfo', userInfo)
    }
}


export default {
    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations
}