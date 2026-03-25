import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      users: JSON.parse(localStorage.getItem('users')) || [],
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    }
  },
  mutations: {
    REGISTER_USER(state, user) {
      // Add user to users list with generic visits count
      const newUser = { ...user, visits: 0 };
      state.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    INCREMENT_VISITS(state) {
      if (state.currentUser) {
        state.currentUser.visits++;
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        
        // Also update in users list
        const index = state.users.findIndex(u => u.email === state.currentUser.email);
        if (index !== -1) {
          state.users[index].visits = state.currentUser.visits;
          localStorage.setItem('users', JSON.stringify(state.users));
        }
      }
    },
    LOGOUT_USER(state) {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    }
  },
  actions: {
    register({ commit, state }, user) {
      const exists = state.users.find(u => u.email === user.email);
      if (exists) {
        throw new Error('El usuario ya está registrado');
      }
      commit('REGISTER_USER', user);
    },
    login({ commit, state }, credentials) {
      const user = state.users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (!user) {
        throw new Error('Credenciales incorrectas');
      }
      commit('SET_CURRENT_USER', user);
      commit('INCREMENT_VISITS');
    },
    logout({ commit }) {
      commit('LOGOUT_USER');
    }
  },
  getters: {
    isAuthenticated: state => !!state.currentUser,
    currentUser: state => state.currentUser
  }
})
