import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LoginView from '../LoginView.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: {} }, { path: '/registro', name: 'registro', component: {} }]
})

describe('LoginView.vue', () => {
  it('calls login action on submit', async () => {
    const actions = {
      login: vi.fn()
    }
    const store = createStore({ actions })
    
    const wrapper = mount(LoginView, {
      global: {
        plugins: [store, router],
        stubs: ['router-link']
      }
    })

    await wrapper.find('input[type="email"]').setValue('user@test.com')
    await wrapper.find('input[type="password"]').setValue('1234')
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions.login).toHaveBeenCalled()
  })
})
