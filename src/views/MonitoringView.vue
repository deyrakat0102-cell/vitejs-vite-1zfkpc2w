<script setup>
import { ref, computed, onMounted } from 'vue'
import BeeMap from '../components/BeeMap.vue'
import { Camera, MapPin, Save, Trash2 } from 'lucide-vue-next'

const STORAGE_KEY = 'abejanexo-observations'

const emptyForm = () => ({
  species: 'Apis mellifera',
  type: 'Abeja',
  date: new Date().toISOString().slice(0, 10),
  location: '',
  lat: 9.93,
  lng: -84.08,
  notes: '',
  photo: ''
})

const form = ref(emptyForm())
const observations = ref([])
const message = ref('')

const total = computed(() => observations.value.length)

onMounted(() => {
  observations.value = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  )
})

function selectLocation(coords) {
  form.value.lat = Number(coords.lat.toFixed(6))
  form.value.lng = Number(coords.lng.toFixed(6))
}

function saveObservation() {
  if (!form.value.species || !form.value.date || !form.value.location.trim()) {
    message.value = 'Completa la especie, fecha y ubicación.'
    return
  }

  const newObservation = {
    ...form.value,
    id: crypto.randomUUID()
  }

  observations.value.unshift(newObservation)

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(observations.value)
  )

  message.value = '¡Observación guardada correctamente!'
  form.value = emptyForm()
}

function removeObservation(id) {
  observations.value = observations.value.filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(observations.value))
}

function uploadPhoto(event) {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    message.value = 'Selecciona una imagen válida.'
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    message.value = 'La imagen debe pesar menos de 2 MB.'
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    form.value.photo = reader.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Monitoreo de polinizadores 🐝</h1>
        <p>Registra, observa y contribuye al cuidado de nuestras abejas.</p>
      </div>
      <span class="counter">{{ total }} observaciones</span>
    </header>

    <div class="monitor-grid">
      <section class="panel">
        <h3>Mapa de observaciones</h3>
        <p class="muted">Selecciona un punto para establecer sus coordenadas.</p>

        <BeeMap
          :observations="observations"
          @map-click="selectLocation"
        />

        <p class="coordinates">
          <MapPin :size="16" />
          {{ form.lat }}, {{ form.lng }}
        </p>

        <h3>Observaciones registradas</h3>
        <article
          v-for="item in observations"
          :key="item.id"
          class="observation-row"
        >
          <div>
            <strong>{{ item.species }}</strong>
            <small>{{ item.location }} · {{ item.date }}</small>
          </div>
          <button class="icon-button danger" @click="removeObservation(item.id)">
            <Trash2 :size="17" />
          </button>
        </article>

        <p v-if="!observations.length" class="muted">
          Todavía no existen observaciones.
        </p>
      </section>

      <section class="panel">
        <h3>Registrar observación</h3>

        <form class="observation-form" @submit.prevent="saveObservation">
          <label>Tipo de polinizador</label>
          <select v-model="form.type">
            <option>Abeja</option>
            <option>Mariposa</option>
            <option>Abejorro</option>
            <option>Otros polinizadores</option>
          </select>

          <label>Especie</label>
          <input v-model="form.species" required placeholder="Ej. Apis mellifera" />

          <label>Fecha</label>
          <input v-model="form.date" type="date" required />

          <label>Ubicación</label>
          <input v-model="form.location" required placeholder="Nombre del lugar" />

          <label>Latitud</label>
          <input v-model.number="form.lat" type="number" step="any" required />

          <label>Longitud</label>
          <input v-model.number="form.lng" type="number" step="any" required />

          <label>Observaciones</label>
          <textarea
            v-model="form.notes"
            rows="4"
            placeholder="Describe lo observado..."
          ></textarea>

          <label class="upload-box">
            <Camera :size="21" />
            <span>Agregar fotografía</span>
            <input type="file" accept="image/*" @change="uploadPhoto" hidden />
          </label>

          <img v-if="form.photo" :src="form.photo" class="photo-preview" />

          <p v-if="message" class="form-message" aria-live="polite">
            {{ message }}
          </p>

          <button type="submit" class="btn-primary full-btn">
            <Save :size="17" /> Guardar observación
          </button>
        </form>
      </section>
    </div>
  </div>
</template>