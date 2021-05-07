import { createApp } from 'vue';
import App from './App.vue';
import { bootstrap } from './bootstrap';
import { loadRouter } from '@/router';
import { loadStore } from '@/store';
import { loadElement } from '@/plugins/elementplus';
import { loadComponents } from '@/components';
import { loadSvg} from '@/icons';
import { loadDirectives} from '@/directives';
import { loadI18n} from '@/i18n'

import 'normalize.css';
import 'nprogress/nprogress.css';
import '@/styles/index.scss';


const app = createApp(App)
const store = loadStore(app)
const router = loadRouter(app)
loadI18n(app)
loadElement(app)
loadComponents(app)
loadSvg()
loadDirectives(app)


bootstrap({ router, store }).then(async () => {
    router.isReady().then(() => app.mount('#app'))
})


