<script setup>
import { computed, onMounted, ref } from 'vue'
import { Download, FileText } from 'lucide-vue-next'

const observations = ref([])

onMounted(() => {
  observations.value = JSON.parse(
    localStorage.getItem('abejanexo-observations') || '[]'
  )
})

const speciesCount = computed(() =>
  new Set(observations.value.map(item => item.species)).size
)

const types = computed(() => {
  return ['Abeja', 'Mariposa', 'Abejorro', 'Otros polinizadores'].map(type => ({
    name: type,
    count: observations.value.filter(item => item.type === type).length
  }))
})

function downloadCSV() {
  const headers = ['Especie', 'Tipo', 'Fecha', 'Ubicación', 'Latitud', 'Longitud', 'Notas']

  const rows = observations.value.map(item => [
    item.species, item.type, item.date, item.location,
    item.lat, item.lng, item.notes
  ])

  const escapeCSV = value =>
    `"${String(value ?? '').replace(/"/g, '""')}"`

  const csv = [headers, ...rows]
    .map(row => row.map(escapeCSV).join(','))
    .join('\n')

  const blob = new Blob(['\uFEFF' + csv], {
    type: 'text/csv;charset=utf-8;'
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'reporte-abejanexo.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Reportes y estadísticas 📊</h1>
        <p>Consulta los resultados del monitoreo ambiental.</p>
      </div>

      <button class="btn-primary" @click="downloadCSV">
        <Download :size="17" /> Exportar CSV
      </button>
    </header>

    <section class="stats-grid">
      <article class="stat-card yellow">
        <FileText />
        <p>Observaciones</p>
        <h2>{{ observations.length }}</h2>
      </article>

      <article class="stat-card green">
        <p>Especies identificadas</p>
        <h2>{{ speciesCount }}</h2>
      </article>

      <article class="stat-card blue">
        <p>Registros de polinizadores</p>
        <h2>{{ observations.length }}</h2>
      </article>
    </section>

    <section class="panel">
      <h3>Observaciones por categoría</h3>

      <div v-for="item in types" :key="item.name" class="report-row">
        <div class="report-label">
          <span>{{ item.name }}</span>
          <strong>{{ item.count }}</strong>
        </div>
        <div class="progress">
          <div
            class="progress-fill"
            :style="{ width: observations.length ? (item.count / observations.length * 100) + '%' : '0%' }"
          ></div>
        </div>
      </div>

      <h3>Registros recientes</h3>

      <div v-for="item in observations" :key="item.id" class="observation-row">
        <div>
          <strong>{{ item.species }}</strong>
          <small>{{ item.location }} · {{ item.date }}</small>
        </div>
        <span>{{ item.type }}</span>
      </div>

      <p v-if="!observations.length" class="muted">
        No hay información registrada para generar reportes.
      </p>
    </section>
  </div>
</template>