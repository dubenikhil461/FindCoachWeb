import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
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
        {
            name: 'home',
            path: '/',
            component: () => import('@/components/Home.vue'),
            meta: {
                title: 'Home - MyApp',
                description: 'Find your perfect coach and start your journey to success.',
            }
        },
        {
            name: 'dashboard',
            path: '/@me/dashboard',
            component: () => import('@/components/Dashboard.vue'),
            meta: {
                title: 'Dashboard - MyApp',
                description: 'Manage your account and settings.',
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const userstore = useUserStore()
    // Allow access to home page ('/') for everyone
    if (to.path === '/') {
        return next()
    }
    // For all other routes, require authentication
    if (userstore.IsLoggedIn) {
        return next()
    } else {
        // If not authenticated, redirect to home page
        return next({ path: '/' })
    }
})

export default router;