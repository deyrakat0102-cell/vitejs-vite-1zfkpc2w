<script setup>
import { RouterLink } from 'vue-router'
import {
  Home, User, MapPin, FileText,
  GraduationCap, BookOpen, Settings,
  LogOut, Hexagon
} from 'lucide-vue-next'

const links = [
  { name: 'Inicio', path: '/dashboard', icon: Home },
  { name: 'Mi perfil', path: '/dashboard', icon: User },
  { name: 'Mapa de monitoreo', path: '/monitoreo', icon: MapPin },
  { name: 'Reportes', path: '/reportes', icon: FileText },
  { name: 'Educación', path: '/educacion', icon: GraduationCap },
  { name: 'Recursos', path: '/recursos', icon: BookOpen }
]
</script>

<template>
  <aside class="sidebar">
    <RouterLink to="/" class="brand">
      <Hexagon :size="27" color="#f6c52d" />
      <span>Abeja<span class="yellow">Nexo</span></span>
    </RouterLink>

    <nav class="side-nav">
      <RouterLink
        v-for="item in links"
        :key="item.name"
        :to="item.path"
        class="side-link"
        active-class="active"
      >
        <component :is="item.icon" :size="18" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>

    <RouterLink to="/" class="logout">
      <LogOut :size="17" />
      Cerrar sesión
    </RouterLink>
  </aside>
</template>