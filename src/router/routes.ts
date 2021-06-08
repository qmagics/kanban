import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const constantRoutes: RouteRecordRaw[] = [
    // home page
    {
        path: '/',
        component: Layout,
        redirect: "home",
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: "首页"
                }
            }
        ]
    },

    // login page
    {
        path: '/login',
        component: () => import('@/views/common/login/index.vue')
    },

    // play
    {
        path: '/play',
        component: () => import('@/views/Play.vue')
    },

    // 404 page
    {
        path: '/404',
        component: () => import('@/views/common/error-page/404.vue'),
    },

    // 401 page
    {
        path: '/401',
        component: () => import('@/views/common/error-page/401.vue'),
    },

    // *
    {
        path: "/:pathMatch(.*)*",
        redirect: '/404',
    }
]

export default constantRoutes;