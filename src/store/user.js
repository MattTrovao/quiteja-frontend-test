import api from '@/api/axios';

export default {
  namespaced: true,

  state: {
    users: [],
    loading: false,
    error: null,
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(u => u.id !== userId);
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const res = await api.get('/user');

        commit('SET_USERS', res.data.data);
        commit('SET_TOTAL', res.data.total);
        return res.data;
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchUserById({ commit }, userId) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await api.get(`/user/${userId}`);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createUser({ commit }, payload) {
      try {
        const { data } = await api.post('/user/create', payload);
        commit('ADD_USER', data);
        return data;
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },

    async updateUser({ commit }, { id, payload }) {
      try {
        const { data } = await api.put(`/user/${id}`, payload);
        commit('UPDATE_USER', data);
        return data;
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },

    async deleteUser({ commit }, id) {
      try {
        await api.delete(`/user/${id}`);
        commit('DELETE_USER', id);
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },
  },
};
