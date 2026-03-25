<template>
  <div class="auth-container card glass-panel">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin" class="resource-form">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" required placeholder="tu@email.com">
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required placeholder="********">
      </div>
      <div class="error-msg" v-if="error">{{ error }}</div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Entrar</button>
      </div>
      <p style="margin-top: 15px; text-align: center;">¿No tienes cuenta? <router-link to="/registro">Regístrate</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    await store.dispatch('login', { email: email.value, password: password.value })
    router.push('/')
  } catch (e) {
    error.value = e.message
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
}
</style>
