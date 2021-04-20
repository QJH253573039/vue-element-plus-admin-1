const routes = {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
        
    ]
}

export default routes;