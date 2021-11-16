const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/orden', component: () => import('pages/Orden.vue') },
      { path: '/oti', component: () => import('pages/Oti.vue') },
      { path: '/asignar', component: () => import('pages/AsignarTarea.vue') }
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
