import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import MonitoringView from '../views/MonitoringView.vue'
import EducationView from '../views/EducationView.vue'
import ReportsView from '../views/ReportsView.vue'
import ResourcesView from '../views/ResourcesView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/dashboard', component: DashboardView },
  { path: '/monitoreo', component: MonitoringView },
  { path: '/educacion', component: EducationView },
  { path: '/reportes', component: ReportsView },
  { path: '/recursos', component: ResourcesView }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})