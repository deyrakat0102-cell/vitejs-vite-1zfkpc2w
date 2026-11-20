<script setup>
defineProps({
  title: String,
  value: [String, Number],
  description: String,
  color: {
    type: String,
    default: 'yellow'
  },
  icon: Object
})
</script>

<template>
  <article class="stat-card" :class="color">
    <component v-if="icon" :is="icon" :size="25" />
    <p>{{ title }}</p>
    <h2>{{ value }}</h2>
    <small>{{ description }}</small>
  </article>
</template>