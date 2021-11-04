const routes = {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: {
                title: '控制台',
                show: true,
                keepAlive: 1,
                icon: 'desktop',
                type: 1,
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