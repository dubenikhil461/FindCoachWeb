import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // This will use '/app' if set in Vite
    routes: [
        {
            name: 'register',
            path: '/register',
            component: () => import('@/components/Register.vue'),
            meta: {
                title: 'Register - MyApp',
                description: 'Create a new account to get started with MyApp.',
            }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/components/Login.vue'),
            meta: {
                title: 'Login - MyApp',
                description: 'Login to your MyApp account to access personalized features and content.',
            }
        },
    ]
})

export default router;