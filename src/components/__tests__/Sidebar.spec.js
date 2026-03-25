import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Sidebar from '../Sidebar.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: {} }, { path: '/login', name: 'login', component: {} }]
})

describe('Sidebar.vue', () => {
  it('renders user info from Vuex store', async () => {
    const store = createStore({
      getters: {
        currentUser: () => ({ name: 'Test User', email: 'test@example.com' })
      }
    })
    
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [store, router],
        stubs: ['router-link']
      }
    })

    expect(wrapper.text()).toContain('Test User')
    expect(wrapper.text()).toContain('test@example.com')
  })
})
