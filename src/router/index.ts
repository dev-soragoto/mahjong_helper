import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/game/GameView.vue'
import HistoryView from '../views/history/HistoryView.vue'
import PlayersView from '../views/players/PlayersView.vue'
import SettingsView from '../views/settings/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/game'
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersView 
    },
    {
      path: '/Settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})


export default router
