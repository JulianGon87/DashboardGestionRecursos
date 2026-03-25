import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import RegisterView from '../RegisterView.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: {} }, { path: '/login', name: 'login', component: {} }]
})

describe('RegisterView.vue', () => {
  it('calls register action on submit', async () => {
    const actions = {
      register: vi.fn()
    }
    const store = createStore({ actions })
    
    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store, router],
        stubs: ['router-link']
      }
    })

    await wrapper.find('input[id="name"]').setValue('New User')
    await wrapper.find('input[type="email"]').setValue('user@test.com')
    await wrapper.find('input[type="password"]').setValue('1234')
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions.register).toHaveBeenCalled()
  })
})
