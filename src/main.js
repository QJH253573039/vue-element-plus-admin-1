import { createApp } from 'vue';
import App from './App.vue';
import { bootstrap } from './bootstrap';
import { loadRouter } from '@/router';
import { loadStore } from '@/store';
import { loadElement } from '@/plugins/elementplus'

import 'normalize.css';
import 'nprogress/nprogress.css';
import '@/styles/index.scss';

const app = createApp(App)
const store =  loadStore(app)
const router =  loadRouter(app)
loadElement(app)

bootstrap({ router, store }).then(async () => {
    router.isReady().then(() => app.mount('#app'))
})


