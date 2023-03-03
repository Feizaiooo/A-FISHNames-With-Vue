const layoutRoutes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout/layout.vue'),
        meta: {
            title: 'layout',
            canActivate: 'AuthGuard'
        },
        children: [{
            path: '',
            name: 'home',
            component: () => import('@/views/home.vue'),
            meta: {
                title: 'layout',
                // canActivate: 'AuthGuard'
            },
        },{
            path: 'index',
            name: 'index',
            component: () => import('@/views/index.vue'),
            meta: {
                title: 'layout',
                canActivate: 'AuthGuard'
            },
        }, {
            path: 'report',
            name: 'report',
            component: () => import('@/views/report/report.vue'),
            meta: {
                title: 'layout',
                canActivate: 'AuthGuard'
            },
        }, {
            path: 'canvas',
            name: 'canvas',
            component: () => import('@/views/canvas/index.vue'),
        }, {
            path: 'test',
            name: 'test',
            component: () => import('@/views/test.vue'),
        }]
    },
]

export default layoutRoutes
