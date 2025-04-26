import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from '../store/loggedInUser'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue'),
    meta: { accessibleTo: ['editor', 'viewer'] }
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/login.vue')
  },
  {
    path: '/clientform',
    name: 'clientform',
    // only authenticated users can create clients
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor']
    },
    component: () => import('../views/clientform.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor', 'viewer']
    },
    component: () => import('../views/findclient.vue')
  },
  {
    path: '/clientdetails/:id',
    name: 'clientdetails',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor', 'viewer']
    },
    component: () => import('../views/clientdetails.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor']
    },
    component: () => import('../views/eventform.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor', 'viewer']
    },
    component: () => import('../views/findevents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor', 'viewer']
    },
    component: () => import('../views/eventdetails.vue')
  },
  {
    path: '/serviceform',
    name: 'serviceform',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor']
    },
    component: () => import('../views/serviceform.vue')
  },
  {
    path: '/findservice',
    name: 'findservice',
    meta: {
      requiresAuth: true,
      accessibleTo: ['editor', 'viewer']
    },
    component: () => import('../views/findservice.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    meta: {
        requiresAuth: true,
        accessibleTo: ['editor', 'viewer']
    },
    component: () => import('../views/servicedetails.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// protecting the routes
router.beforeEach((to) => {
  const store = useLoggedInUserStore();

  // Redirect unauthenticated users from protected routes
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }

  // If route defines roles and user is logged in but has wrong role
  if (
    to.meta.accessibleTo &&
    store.isLoggedIn &&
    !to.meta.accessibleTo.includes(store.role)
  ) {
    console.warn("Blocked: Unauthorized access attempt to", to.fullPath);
    return '/';
  }
});


export default router

