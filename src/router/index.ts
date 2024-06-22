import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/game/GameView.vue'
import SetUpView from '../views/game/SetUpView.vue'
import HistoryView from '../views/history/HistoryView.vue'
import PlayersView from '../views/players/PlayersView.vue'
import SettingsView from '../views/settings/SettingsView.vue'

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
      component: SetUpView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/Settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})


export default router
