import { createRouter, createWebHashHistory } from 'vue-router';
import NotFound from '~/views/404.vue'
import About from '~/views/about.vue'
import Login from '~/views/login.vue'
import Register from '~/views/register.vue'
import AppLayout from '~/layout/AppLayout.vue'


const routes = [{
    path: '/',
    component: About
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}, {
    path: '/login',
    component: Login
}, {
    path: '/register',
    component: Register

}, {
    path: '/index',
    component: AppLayout,
    children: [
        {
            path: '',
            // 软加载，可节省空间
            component: () => import('~/components/FileList.vue'),
        },
        {
            path: 'fileList',
            // 软加载，可节省空间
            component: () => import('~/components/FileList.vue'),
        },
        {
            //根据路由参数file_pid动态加载文件列表
            path: 'fileList/:file_pid/:file_name',
            // 软加载，可节省空间
            name: 'fileList',
            component: () => import('~/components/FileList.vue'),
        }
    ]
}
];

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;