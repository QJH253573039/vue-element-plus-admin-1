
const state = () => ({
    list: [
        {
            label: "首页",
            value: "/",
            keepAlive:true,
            active: true
        }
    ]
})

const mutations = {
    ADD_PROCESS(state, item) {
        const index = state.list.findIndex(
            (e) => e.value.split("?")[0] === item.value.split("?")[0]
        );

        state.list.map((e) => {
            e.active = e.value == item.value;
        });

        if (item.value == "/") {
            item.label = '首页'
        }

        if (index < 0) {
            if (item.label) {
                state.list.push({
                    ...item,
                    active: true
                });
            }
        } else {
            state.list[index].active = true;
            state.list[index].keepAlive = item.keepAlive;
            state.list[index].label = item.label;
            state.list[index].value = item.value;
            state.list[index].name = item.name;
        }
    },

    DEL_PROCESS(state, index) {
        state.list.splice(index, 1);
    },

    SET_PROCESS(state, list) {
        state.list = list;
    },

    RESET_PROCESS(state) {
        state.list = [
            {
                label: "首页",
                value: "/",
                keepAlive: true,
                active: true
            }
        ];
    }
}

const actions = {

}


export default {
    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations
}