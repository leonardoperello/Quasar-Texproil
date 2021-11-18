const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') },
      {
        path: '/menu',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/about',
        component: () => import('pages/About.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/orden',
        component: () => import('pages/Orden.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/oti',
        component: () => import('pages/Oti.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/menuOperario',
        component: () => import('pages/operario.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/asignar',
        component: () => import('pages/AsignarTarea.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
