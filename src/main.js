import { createApp } from 'vue';

import {loadElement} from './plugins/elementplus';  // element plus UI

import App from './App.vue'

import router from './router'  // 路由

import store from './store'  // 状态管理

import 'normalize.css'

const app = createApp(App)
app.use(store);
app.use(router);

loadElement(app);   // 加载 element plus 组件 

app.mount('#app');