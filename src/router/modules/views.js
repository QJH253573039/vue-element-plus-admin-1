const routes = {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
            meta: {
                show: false,
                icon: '',
                keepAlive: 1,
                type: 1,
                title: '首页'
            }
        },
        {
            path: '/my/info',
            name: 'info',
            component: () => import('@/views/my/info.vue'),
            meta: {
                show: false,
                icon: '',
                keepAlive: 1,
                type: 1,
                title: '个人中心'
            }
        }
    ],
}

export default routes;