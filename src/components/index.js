import { defineAsyncComponent } from 'vue'
// 加载全局组件
export function loadComponents(app) {
    app.component("scroll", defineAsyncComponent({
        loader: () => import("./scroll/index.vue")
    }));
    app.component("icon-svg", defineAsyncComponent({
        loader: () => import("./icon-svg/index.vue")
    }));
    app.component("filter-switch",defineAsyncComponent({
        loader:()=>import('./filter-switch/index.vue')
    }))
    app.component("param-selector", defineAsyncComponent({
        loader: () => import('./param-selector/index.vue')
    }))
}