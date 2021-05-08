
import { loadRouter } from '@/router';
import { loadStore } from '@/store';
import { loadGuards } from '@/router/guards';
import { loadRoutes} from '@/router';
import { loadElement } from '@/plugins/elementplus';
import { loadComponents } from '@/components';
import { loadSvg } from '@/icons';
import { loadDirectives } from '@/directives';
import { loadI18n } from '@/i18n'

export async function bootstrap(options){
    const { app} = options;


    const store = loadStore(app)
    const router = loadRouter(app)

    loadI18n(app)
    loadElement(app)
    loadComponents(app)
    loadSvg()
    loadDirectives(app)

    await loadRoutes({ store})
    await loadGuards(router);

    return { router}
}