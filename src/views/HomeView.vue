<script setup>
import { RouterLink } from 'vue-router'
import { Leaf, BookOpen, ChartNoAxesCombined, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="landing">
    <header class="landing-nav">
      <RouterLink to="/" class="brand">
        🐝 Abeja<span class="yellow">Nexo</span>
      </RouterLink>

      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#nosotros">Sobre nosotros</a>
        <a href="#educacion">Educación</a>
        <a href="#monitoreo">Monitoreo</a>
        <RouterLink to="/dashboard" class="btn-small">Ingresar</RouterLink>
      </nav>
    </header>

    <section id="inicio" class="hero">
      <div class="hero-content">
        <span class="eyebrow">CONSERVACIÓN Y BIODIVERSIDAD</span>
        <h1>Abeja<span class="yellow">Nexo</span></h1>
        <h2>
          Plataforma inteligente para la conservación,
          educación y monitoreo de abejas y polinizadores.
        </h2>
        <p>
          Conecta, conoce y protege a quienes hacen florecer la vida.
        </p>

        <div class="hero-actions">
          <RouterLink to="/dashboard" class="btn-primary">
            Comenzar ahora <ArrowRight :size="17" />
          </RouterLink>
          <a href="#nosotros" class="btn-outline">Conoce más</a>
        </div>

        <div class="hero-features">
          <div><Leaf /><span>Conservación<br />Protegemos sus hábitats</span></div>
          <div><BookOpen /><span>Educación<br />Aprendemos juntos</span></div>
          <div><ChartNoAxesCombined /><span>Monitoreo<br />Datos para un mejor futuro</span></div>
        </div>
      </div>
    </section>

    <section id="nosotros" class="intro-section">
      <span class="eyebrow">NUESTRA MISIÓN</span>
      <h2>Un futuro donde los polinizadores estén protegidos</h2>
      <p>
        AbejaNexo integra información, herramientas educativas
        y monitoreo ambiental para promover la conservación
        de las abejas y otros polinizadores.
      </p>
    </section>

    <section id="monitoreo" class="landing-grid">
      <article>
        <span>🐝</span>
        <h3>Monitoreo</h3>
        <p>Registra observaciones y conoce la distribución de polinizadores.</p>
        <RouterLink to="/monitoreo">Explorar <ArrowRight :size="15" /></RouterLink>
      </article>
      <article id="educacion">
        <span>🌱</span>
        <h3>Educación ambiental</h3>
        <p>Aprende sobre biodiversidad, conservación y ecosistemas.</p>
        <RouterLink to="/educacion">Explorar <ArrowRight :size="15" /></RouterLink>
      </article>
      <article>
        <span>🌎</span>
        <h3>Conservación</h3>
        <p>Promueve espacios amigables para las especies polinizadoras.</p>
        <RouterLink to="/recursos">Explorar <ArrowRight :size="15" /></RouterLink>
      </article>
    </section>

    <footer class="landing-footer">
      <strong>AbejaNexo 🐝</strong>
      <p>Conecta, conoce y protege a quienes hacen florecer la vida.</p>
      <small>© 2026 AbejaNexo. Todos los derechos reservados.</small>
    </footer>
  </div>
</template>