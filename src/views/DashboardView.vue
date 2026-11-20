<script setup>
import { ref } from 'vue'
import {
  Flower2, Sprout, GraduationCap, Map,
  Bell, Plus, ClipboardList
} from 'lucide-vue-next'
import StatCard from '../components/StatCard.vue'

const stats = [
  {
    title: 'Colmenas registradas',
    value: 12,
    description: 'Este mes',
    color: 'yellow',
    icon: Flower2
  },
  {
    title: 'Especies de polinizadores',
    value: 8,
    description: 'Identificadas',
    color: 'green',
    icon: Sprout
  },
  {
    title: 'Personas capacitadas',
    value: 156,
    description: 'En total',
    color: 'blue',
    icon: GraduationCap
  },
  {
    title: 'Áreas monitoreadas',
    value: 5,
    description: 'Registradas',
    color: 'purple',
    icon: Map
  }
]

const activities = ref([
  { icon: '🐝', title: 'Nueva observación de abeja registrada', time: 'Hace 2 horas' },
  { icon: '📚', title: 'Se añadió un nuevo recurso educativo', time: 'Hace 5 horas' },
  { icon: '📊', title: 'Reporte de monitoreo actualizado', time: 'Hace 1 día' },
  { icon: '👤', title: 'Se registró un nuevo usuario', time: 'Hace 1 día' }
])
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>¡Hola, bienvenido! 🐝</h1>
        <p>Juntos por un planeta más verde y lleno de vida.</p>
      </div>
      <Bell />
    </header>

    <section class="stats-grid">
      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        v-bind="stat"
      />
    </section>

    <section class="dashboard-grid">
      <div class="panel map-panel">
        <div class="panel-heading">
          <h3>Mapa de monitoreo</h3>
          <RouterLink to="/monitoreo">Ver mapa completo →</RouterLink>
        </div>
        <div class="map-preview">
          <iframe
            title="Mapa de Costa Rica"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-85.0%2C8.0%2C-82.5%2C11.3&layer=mapnik"
          ></iframe>
        </div>
      </div>

      <div class="panel">
        <div class="panel-heading">
          <h3>Actividad reciente</h3>
          <ClipboardList />
        </div>

        <div class="activity-list">
          <article v-for="item in activities" :key="item.title">
            <span class="activity-icon">{{ item.icon }}</span>
            <div>
              <strong>{{ item.title }}</strong>
              <small>{{ item.time }}</small>
            </div>
          </article>
        </div>

        <RouterLink to="/monitoreo" class="btn-primary full-btn">
          <Plus :size="17" /> Nueva observación
        </RouterLink>
      </div>
    </section>
  </div>
</template>