<template>
  <aside class="sidebar">
    <div class="brand">
        <div class="logo-icon">P</div>
        <h1>PORTA<span class="highlight">Dash</span></h1>
    </div>

    <nav class="nav-menu">
        <router-link to="/" class="nav-item" exact-active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
        </router-link>
        <router-link to="/reportes" class="nav-item" exact-active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Reportes
        </router-link>
        <router-link to="/configuracion" class="nav-item" exact-active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                </path>
            </svg>
            Configuración
        </router-link>
    </nav>

    <div style="margin-top: auto; display: flex; flex-direction: column; gap: 15px;" v-if="currentUser">
        <div class="welcome-box" style="padding: 15px; background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%); border-radius: 12px; border-left: 3px solid #3498db;">
            <h3 style="font-size: 1rem; color: #fff; margin-bottom: 5px;">¡Bienvenido, {{ currentUser.name }}!</h3>
            <p style="font-size: 0.85rem; color: #ccc; margin: 0;">Has visitado este Dashboard <strong style="color: #3498db;">{{ currentUser.visits }}</strong> veces.</p>
        </div>

        <div class="user-profile" style="margin-top: 0;">
            <div class="avatar">{{ currentUser.name.charAt(0).toUpperCase() }}</div>
            <div class="user-info">
                <span class="user-name">{{ currentUser.name }}</span>
                <span class="user-role">{{ currentUser.email }}</span>
            </div>
            <button @click="logout" class="btn btn-outline" style="margin-top: 10px; width: 100%; border-color: #ff4757; color: #ff4757;">Salir</button>
        </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const currentUser = computed(() => store.getters.currentUser)

const logout = () => {
    store.dispatch('logout')
    router.push('/login')
}
</script>

 
