import elementVariables from '@/styles/element-variables.scss'

const state = () => ({
    theme: elementVariables.theme,
})

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations
}