import axios from 'axios'
import { createStore } from 'vuex'
import dynamicJson from "@/assets/dynamic"

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      users: null,
      formBlocks: dynamicJson
    }
  },
  getters: {
    getUsers: (state) => state.users,
    getBlocks: (state) => state.formBlocks.blocks
  },
  mutations: {
    setUsers(state, data) {
      state.users = data
    },
    setDelete: (state, id) => {
      let itemIndex = state.users.findIndex((item) => item.id === id)
      state.users.splice(itemIndex, 1)
    },
    updateUser: (state, data) => {
      let itemIndex = state.users.findIndex((item) => item.id === data.id)
      state.users[itemIndex] = data
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        let data = await axios.get('https://jsonplaceholder.typicode.com/users')
        if (data.status === 200) {
          commit('setUsers', data.data)
        }
      } catch (error) {
        console.error('error:', error);
      }
    },
    deleteUser: ({ commit }, id) => {
      commit('setDelete', id)
    },
    editUser: ({ commit }, data) => {
      commit('updateUser', data)
    },
  }
})