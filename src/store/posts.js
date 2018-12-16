/* eslint-disable no-shadow,consistent-return,prefer-promise-reject-errors,no-param-reassign,
no-undef,function-paren-newline,arrow-parens,no-underscore-dangle */
import axios from 'axios';

const state = {
  posts: [],
  post: {},
  dialog: false,
  index: -1,
  backendErrors: {
    from: [],
    to: [],
    date: [],
    price: [],
    description: [],
  },
};

const getters = {
  posts(state) {
    return state.posts;
  },
};

const mutations = {
  storePosts(state, payload) {
    state.posts = payload;
  },

  storePostErrors(state, payload) {
    const errors = {};
    payload.forEach((error) => {
      state.backendErrors[error.param] = [error.msg];
    });
    return errors;
  },

  storePost(state, payload) {
    state.post = payload;
  },

  postCreated(state, post) {
    state.dialog = false;
    state.posts.push(post);
  },

  postUpdated(state, updatedPost) {
    const index = state.posts.findIndex((post) => post._id === updatedPost._id);
    state.posts.splice(index, 1, updatedPost);
    state.dialog = false;
  },

  postDeleted(state, index) {
    state.posts.splice(index, 1);
  },

  newPost(state) {
    state.post = {};
    state.backendErrors = {
      from: [],
      to: [],
      date: [],
      price: [],
      description: [],
    };
    state.index = -1;
    state.dialog = true;
  },

  editPost(state, payload) {
    state.post = JSON.parse(JSON.stringify(payload.post));
    state.backendErrors = {
      from: [],
      to: [],
      date: [],
      price: [],
      description: [],
    };
    state.index = payload.index;
    state.dialog = true;
  },

  clearPostError(state, field) {
    state.backendErrors[field] = [];
  },

  closePostForm(state) {
    state.dialog = false;
  },
};

const actions = {
  getPosts({ commit }) {
    return new Promise((resolve, reject) =>
      axios
        .get('posts')
        .then((res) => {
          commit('storePosts', res.data);
          resolve(res);
        })
        .catch(() => reject()),
    );
  },

  createPost({ commit }, post) {
    return new Promise((resolve, reject) =>
      axios
        .post('posts', post)
        .then((res) => {
          commit('postCreated', res.data);
          commit('openSnackbar', {
            text: 'Skelbimas sukurtas',
          });
          resolve(res);
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            commit('storePostErrors', err.response.data.errors);
          }
          reject(err);
        }),
    );
  },

  updatePost({ commit }, post) {
    return new Promise((resolve, reject) =>
      axios
        .put(`posts/${post._id}`, post)
        .then((res) => {
          commit('postUpdated', res.data);
          commit('openSnackbar', {
            text: 'Skelbimas atnaujintas',
          });
          resolve(res);
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            commit('storePostErrors', err.response.data.errors);
          }
          reject(err);
        }),
    );
  },

  deletePost({ commit }, payload) {
    return new Promise((resolve) =>
      axios.delete(`posts/${payload.post._id}`).then((res) => {
        commit('postDeleted', payload.index);
        commit('openSnackbar', {
          text: 'Skelbimas ištrintas',
        });
        resolve(res);
      }),
    );
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
