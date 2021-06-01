export const routes = [
    {
        id: 1,
        name: 'dashboard',
        parentId: 0,
        path: '/dashboard',
        viewPath: null,
        meta: {
            title: '控制台',
            show: true,
            keepAlive: 1,
            icon: 'desktop',
            type: 0,
        }
    },
    {
        id: 2,
        name: 'data',
        parentId: 1,
        path: '/dashboard/data',
        viewPath: 'views/dashboard/index.vue',
        meta: {
            title: '数据统计',
            show: true,
            keepAlive: 1,
            icon: 'dashboard',
            type: 1,
        }
    },
    {
        id: 14,
        name: 'icon',
        parentId: 0,
        path: 'icon',
        viewPath: null,
        meta: {
            title: '图标',
            show: true,
            keepAlive: 1,
            icon: 'icon',
            type: 0,
        }
    },
    {
        id: 3,
        name: 'charts',
        parentId: 0,
        path: 'charts',
        viewPath: null,
        meta: {
            title: '图表',
            show: true,
            keepAlive: 1,
            icon: 'charts',
            type: 0,
        }
    },
    {
        id: 4,
        name: 'table',
        parentId: 0,
        path: 'table',
        viewPath: null,
        meta: {
            title: 'Table',
            show: true,
            keepAlive: 1,
            icon: 'table',
            type: 0,
        }
    },
    {
        id: 5,
        name: 'error',
        parentId: 0,
        path: 'error',
        viewPath: null,
        meta: {
            title: '错误页面',
            show: true,
            keepAlive: 1,
            icon: 'error',
            type: 0,
        }
    },
    {
        id: 6,
        name: 'line',
        parentId: 3,
        path: 'charts/line',
        viewPath: 'views/charts/line.vue',
        meta: {
            title: '折线图',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 7,
        name: 'error404',
        parentId: 5,
        path: 'error/404',
        viewPath: 'views/error/404.vue',
        meta: {
            title: '404',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 8,
        name: 'error401',
        parentId: 5,
        path: 'error/401',
        viewPath: 'views/error/401.vue',
        meta: {
            title: '401',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 9,
        name: 'level',
        parentId: 0,
        path: 'level',
        viewPath: null,
        meta: {
            title: '多级嵌套菜单',
            show: true,
            keepAlive: 1,
            icon: 'menu',
            type: 0,
        }
    },
    {
        id: 10,
        name: 'menu1',
        parentId: 9,
        path: 'menu1',
        viewPath: null,
        meta: {
            title: 'menu1',
            show: true,
            keepAlive: 1,
            icon: 'menu',
            type: 0,
        }
    },
    {
        id: 11,
        name: 'menu1-1',
        parentId: 10,
        path: 'menu1-1',
        viewPath: null,
        meta: {
            title: 'menu1-1',
            show: true,
            keepAlive: 1,
            icon: 'menu',
            type: 0,
        }
    },
    {
        id: 12,
        name: 'menu1-1-1',
        parentId: 11,
        path: 'menu1-1-1',
        viewPath: 'views/level/menu1.vue',
        meta: {
            title: 'menu1-1-1',
            show: true,
            keepAlive: 1,
            icon: 'menu',
            type: 1,
        }
    },
    {
        id: 13,
        name: 'menu2',
        parentId: 9,
        path: 'menu2',
        viewPath: 'views/level/menu2.vue',
        meta: {
            title: 'menu2',
            show: true,
            keepAlive: 1,
            icon: 'menu',
            type: 1,
        }
    },
    // {
    //     id: 15,
    //     name: 'documentation',
    //     parentId: 0,
    //     path: '/documentation',
    //     viewPath: 'views/documentation/index.vue',
    //     meta: {
    //         title: '文档',
    //         show: true,
    //         keepAlive: 1,
    //         icon: 'documentation',
    //         type: 1,
    //     }
    // },
    {
        id: 16,
        name: 'components',
        parentId: 0,
        path: '/components',
        viewPath: null,
        meta: {
            title: '组件',
            show: true,
            keepAlive: 1,
            icon: 'all',
            type: 0,
        }
    },
    {
        id: 17,
        name: 'ricttext',
        parentId: 16,
        path: '/components/ricttext',
        viewPath: 'views/components/ricttext.vue',
        meta: {
            title: '富文本编辑器',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 18,
        name: 'markdown',
        parentId: 16,
        path: '/components/markdown',
        viewPath: 'views/components/markdown.vue',
        meta: {
            title: 'Markdown',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    // {
    //     id: 19,
    //     name: 'avatar-upload',
    //     parentId: 16,
    //     path: '/components/avatar-upload',
    //     viewPath: 'views/components/avatar-upload.vue',
    //     meta: {
    //         title: '头像上传',
    //         show: true,
    //         keepAlive: 1,
    //         icon: '',
    //         type: 1,
    //     }
    // },
    {
        id: 22,
        name: 'dynamic-table',
        parentId: 4,
        path: '/table/dynamic-table',
        viewPath: 'views/table/dynamic-table.vue',
        meta: {
            title: '动态Table',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 23,
        name: 'complex-table',
        parentId: 4,
        path: '/table/complex-table',
        viewPath: 'views/table/complex-table.vue',
        meta: {
            title: '综合Table',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 24,
        name: 'clipboard',
        parentId: 0,
        path: '/clipboard',
        viewPath: 'views/clipboard/index.vue',
        meta: {
            title: 'Clipboard',
            show: true,
            keepAlive: 1,
            icon: 'copy',
            type: 1,
        }
    },
    {
        id: 25,
        name: 'i18n',
        parentId: 0,
        path: '/i18n',
        viewPath: 'views/i18n/index.vue',
        meta: {
            title: '国际化',
            show: true,
            keepAlive: 1,
            icon: 'international',
            type: 1,
        }
    },
    {
        id: 26,
        name: 'theme',
        parentId: 0,
        path: '/theme',
        viewPath: 'views/theme/index.vue',
        meta: {
            title: '主题',
            show: true,
            keepAlive: 1,
            icon: 'theme',
            type: 1,
        }
    },
    {
        id: 27,
        name: 'bar',
        parentId: 3,
        path: '/charts/bar',
        viewPath: 'views/charts/bar.vue',
        meta: {
            title: '柱状图',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 29,
        name: 'pie',
        parentId: 3,
        path: '/charts/pie',
        viewPath: 'views/charts/pie.vue',
        meta: {
            title: '饼图',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 30,
        name: 'map',
        parentId: 3,
        path: 'charts/map',
        viewPath: 'views/charts/map.vue',
        meta: {
            title: '地理坐标',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 30,
        name: 'gauge',
        parentId: 3,
        path: 'charts/gauge',
        viewPath: 'views/charts/gauge.vue',
        meta: {
            title: '仪表盘',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 31,
        name: 'svg',
        parentId: 14,
        path: '/icon/svg',
        viewPath: 'views/icon/svg.vue',
        meta: {
            title: 'svg',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 32,
        name: 'element',
        parentId: 14,
        path: '/icon/element',
        viewPath: 'views/icon/element.vue',
        meta: {
            title: 'element',
            show: true,
            keepAlive: 1,
            icon: '',
            type: 1,
        }
    },
    {
        id: 33,
        name: 'system',
        parentId: 0,
        path: '/system',
        viewPath: null,
        meta: {
            title: '系统管理',
            show: true,
            keepAlive: 1,
            icon: 'system',
            type: 0,
        }
    },
    {
        id: 34,
        name: 'auth',
        parentId: 33,
        path: '/system/auth',
        viewPath: null,
        meta: {
            title: '权限管理',
            show: true,
            keepAlive: 1,
            icon: 'safetycertificate',
            type: 0,
        }
    },
    {
        id: 35,
        name: 'user',
        parentId: 34,
        path: '/system/auth/user',
        viewPath: 'views/system/auth/user/index.vue',
        meta: {
            title: '用户列表',
            show: true,
            keepAlive: 1,
            icon: 'user-fill',
            type: 1,
        }
    },
    {
        id: 36,
        name: 'menu',
        parentId: 34,
        path: '/system/auth/menu',
        viewPath: 'views/system/auth/menu/index.vue',
        meta: {
            title: '菜单列表',
            show: true,
            keepAlive: 1,
            icon: 'menu',
            type: 1,
        }
    },
    {
        id: 37,
        name: 'role',
        parentId: 34,
        path: '/system/auth/role',
        viewPath: 'views/system/auth/role/index.vue',
        meta: {
            title: '角色列表',
            show: true,
            keepAlive: 1,
            icon: 'customermanagement-fill',
            type: 1,
        }
    }
]; 

