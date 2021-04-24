import NProgress from 'nprogress';
import { checkToken } from '@/utils/auth';
import { useStore} from '@/store';

NProgress.configure({ showSpinner: false });

const loginIgnore = {
    names: ['404', '401'],      //根据路由名称匹配
    paths: ['/login'],   //根据路由fullPath匹配
    // 判断路由是否包含在该配置中
    includes(route) {
        return this.names.includes(route.name) || this.paths.includes(route.path)
    }
}

// 加载路由守卫
export function loadGuards(router) {

    router.beforeEach(async (to, from, next) => {
        if (!NProgress.isStarted()) {
            NProgress.start()
        }

        if (checkToken()) {
            if(to.name == 'login'){
                next({ path:'/login'})
                NProgress.done();
            } else {

                const store = useStore();
                if (!store.getters.userInfo){
                    await store.dispatch('user/queryUserInfo');
                }
                
                store.commit('process/ADD_PROCESS', {
                    keepAlive: to.meta.keepAlive,
                    label: to.meta.title,
                    value: to.fullPath,
                    name: to.name
                })
                
                const hasRoute = router.hasRoute(to.name)
                if (!hasRoute) {
                    next({ ...to, replace: true })
                } else {
                    next()
                }
                
            }
        } else {
            if (!loginIgnore.includes(to)) {
                next({
                    path: "/login",
                    replace:true
                });
                NProgress.done();
            } else {
                next()
            }
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })
}
