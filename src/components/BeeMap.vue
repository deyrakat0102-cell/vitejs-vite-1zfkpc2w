<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'

const props = defineProps({
  observations: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['map-click'])

const mapElement = ref(null)
let map
let markers

function renderMarkers() {
  if (!map || !markers) return

  markers.clearLayers()

  props.observations.forEach(item => {
    if (Number.isFinite(Number(item.lat)) &&
        Number.isFinite(Number(item.lng))) {
      L.marker([Number(item.lat), Number(item.lng)])
        .bindPopup(`
          <strong>${item.species}</strong><br>
          ${item.location || 'Ubicación registrada'}<br>
          ${item.date || ''}
        `)
        .addTo(markers)
    }
  })
}

onMounted(() => {
  map = L.map(mapElement.value).setView([9.93, -84.08], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  markers = L.layerGroup().addTo(map)

  map.on('click', event => {
    emit('map-click', {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    })
  })

  renderMarkers()
})

watch(() => props.observations, renderMarkers, { deep: true })

onBeforeUnmount(() => {
  map?.remove()
})
</script>

<template>
  <div ref="mapElement" class="bee-map"></div>
</template>