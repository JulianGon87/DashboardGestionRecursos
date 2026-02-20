import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ReportsView from '../views/ReportsView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: ReportsView
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: SettingsView
    }
  ]
})

export default router
