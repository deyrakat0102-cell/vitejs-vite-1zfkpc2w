<script setup>
import { ref } from 'vue'
import { BookOpen, Clock, PlayCircle } from 'lucide-vue-next'

const activeTab = ref('Cursos')

const courses = [
  {
    title: 'La vida de las abejas',
    description: 'Conoce su ciclo de vida, su importancia y la función de las diferentes especies.',
    duration: '30 min',
    category: 'Básico',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700'
  },
  {
    title: 'Polinizadores y biodiversidad',
    description: 'Descubre cómo los polinizadores mantienen el equilibrio de los ecosistemas.',
    duration: '25 min',
    category: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=700'
  },
  {
    title: 'Jardines amigables con polinizadores',
    description: 'Aprende a crear espacios ecológicos con flores y plantas nativas.',
    duration: '20 min',
    category: 'Básico',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700'
  },
  {
    title: 'Conservación del medio ambiente',
    description: 'Participa en acciones para proteger nuestros recursos naturales.',
    duration: '15 min',
    category: 'Básico',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700'
  }
]

const resources = [
  { title: 'Guía de identificación de abejas', description: 'Material para reconocer especies y características.' },
  { title: 'Manual de jardines polinizadores', description: 'Recomendaciones para crear hábitats naturales.' }
]

const activities = [
  { title: 'Identifica cinco polinizadores', description: 'Observa tu jardín e identifica cinco tipos de visitantes.' },
  { title: 'Crea un espacio amigable', description: 'Investiga cuáles plantas nativas puedes cultivar.' }
]
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Educación ambiental 🌱</h1>
        <p>Aprende, inspira y sé parte del cambio.</p>
      </div>
    </header>

    <div class="tabs">
      <button
        v-for="tab in ['Cursos', 'Recursos', 'Videos', 'Actividades']"
        :key="tab"
        :class="{ selected: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <section v-if="activeTab === 'Cursos'" class="course-grid">
      <article v-for="course in courses" :key="course.title" class="course-card">
        <img :src="course.image" :alt="course.title" />
        <div class="course-body">
          <span class="eyebrow">{{ course.category }}</span>
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <div class="course-bottom">
            <span><Clock :size="15" /> {{ course.duration }}</span>
            <button class="btn-small" @click="activeTab = 'Videos'">
              <PlayCircle :size="15" /> Ver curso
            </button>
          </div>
        </div>
      </article>
    </section>

    <section v-else-if="activeTab === 'Recursos'" class="content-list">
      <article v-for="item in resources" :key="item.title" class="panel">
        <BookOpen color="#d5a800" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </section>

    <section v-else-if="activeTab === 'Actividades'" class="content-list">
      <article v-for="item in activities" :key="item.title" class="panel">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </section>

    <section v-else class="panel">
      <h3>Biblioteca de videos</h3>
      <p>Próximamente encontrarás videos educativos sobre abejas, polinización y biodiversidad.</p>
    </section>
  </div>
</template>