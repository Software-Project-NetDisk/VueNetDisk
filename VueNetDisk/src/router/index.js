import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import About from '~/pages/about.vue'
import Login from '~/pages/login.vue'


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
    path: '/index',
    component: Index
}
];

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;