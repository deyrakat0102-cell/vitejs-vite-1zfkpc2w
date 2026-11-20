<script setup>
import { ref } from 'vue'
import { BookOpen, Leaf, Search, ShieldCheck } from 'lucide-vue-next'

const search = ref('')

const resources = [
  {
    title: 'Conservación de abejas',
    description: 'Buenas prácticas para proteger las colonias y sus hábitats.',
    category: 'Conservación',
    icon: ShieldCheck
  },
  {
    title: 'Plantas para polinizadores',
    description: 'Información sobre plantas que proporcionan alimento a los polinizadores.',
    category: 'Biodiversidad',
    icon: Leaf
  },
  {
    title: 'Guía de identificación',
    description: 'Características para reconocer diferentes tipos de polinizadores.',
    category: 'Educación',
    icon: BookOpen
  }
]

const filtered = () => resources.filter(item =>
  (item.title + item.description + item.category)
    .toLowerCase()
    .includes(search.value.toLowerCase())
)
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Recursos ambientales 🌎</h1>
        <p>Información para aprender y contribuir a la conservación.</p>
      </div>
    </header>

    <div class="search-box">
      <Search />
      <input v-model="search" placeholder="Buscar recursos..." />
    </div>

    <section class="content-list">
      <article v-for="item in filtered()" :key="item.title" class="panel resource-card">
        <component :is="item.icon" :size="30" color="#d5a800" />
        <span class="eyebrow">{{ item.category }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </section>
  </div>
</template>