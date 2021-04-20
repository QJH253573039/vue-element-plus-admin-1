import { loadGuards } from '@/router/guards';
import { loadRoutes} from '@/router';


export async function bootstrap(options){
    const { router,store} = options;
    await loadRoutes({ store})
    await loadGuards(router);
}