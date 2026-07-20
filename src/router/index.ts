import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/setup'
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/game/SetUpView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/game/GameView.vue')
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('../views/players/PlayersView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/history/HistoryView.vue')
    },
    {
      path: '/Settings',
      name: 'settings',
      component: () => import('../views/settings/SettingsView.vue')
    }
  ]
})


export default router
