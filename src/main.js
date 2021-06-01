import { createApp } from 'vue';
import App from './App.vue';
import { bootstrap } from './bootstrap';

import '@/styles/base.scss'
import 'normalize.css';
import 'nprogress/nprogress.css';


const app = createApp(App)

bootstrap({ app, }).then(async ({ router}) => {
    router.isReady().then(() => app.mount('#app'))
})


