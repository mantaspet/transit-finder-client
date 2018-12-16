/* eslint-disable no-shadow,consistent-return,prefer-promise-reject-errors,no-param-reassign,
no-undef,function-paren-newline,arrow-parens,no-underscore-dangle */
import axios from 'axios';

const state = {
  comments: [],
  comment: {},
  dialog: false,
  index: -1,
  backendErrors: {
    text: [],
    date: [],
  },
};

const getters = {
  comments(state) {
    return state.comments;
  },
};

const mutations = {
  storeComments(state, payload) {
    payload.forEach((comment) => {
      comment.date = comment.date.slice(0, 10);
    });
    state.comments = payload;
  },

  storeCommentErrors(state, payload) {
    const errors = {};
    payload.forEach((error) => {
      state.backendErrors[error.param] = [error.msg];
    });
    return errors;
  },

  newComment(state) {
    state.comment = {};
    state.backendErrors = {
      text: [],
      date: [],
    };
    state.index = -1;
    state.dialog = true;
  },

  editComment(state, payload) {
    state.comment = JSON.parse(JSON.stringify(payload.comment));
    state.backendErrors = {
      text: [],
      date: [],
    };
    state.index = payload.index;
    state.dialog = true;
  },

  clearCommentError(state, field) {
    state.backendErrors[field] = [];
  },

  closeCommentForm(state) {
    state.dialog = false;
  },

  commentCreated(state, comment) {
    state.dialog = false;
    comment.date = comment.date.slice(0, 10);
    state.comments.push(comment);
  },

  commentUpdated(state, updatedComment) {
    state.dialog = false;
    updatedComment.date = updatedComment.date.slice(0, 10);
    const index = state.comments.findIndex(
      (comment) => comment._id === updatedComment._id,
    );
    state.comments.splice(index, 1, updatedComment);
  },

  commentDeleted(state, index) {
    state.comments.splice(index, 1);
  },
};

const actions = {
  createComment({ commit }, comment) {
    return new Promise((resolve, reject) => {
      axios
        .post('comments', comment)
        .then((res) => {
          commit('commentCreated', res.data);
          commit('openSnackbar', {
            text: 'Komentaras sukurtas',
          });
          resolve(res);
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            commit('storeCommentErrors', err.response.data.errors);
          }
          reject(err);
        });
    });
  },

  updateComment({ commit }, comment) {
    return new Promise((resolve, reject) => {
      axios
        .put(`comments/${comment._id}`, comment)
        .then((res) => {
          commit('commentUpdated', res.data);
          commit('openSnackbar', {
            text: 'Komentaras atnaujintas',
          });
          resolve(res);
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            commit('storeCommentErrors', err.response.data.errors);
          }
          reject(err);
        });
    });
  },

  deleteComment({ commit }, payload) {
    return new Promise((resolve) => {
      axios.delete(`comments/${payload.comment._id}`).then((res) => {
        commit('commentDeleted', payload.index);
        commit('openSnackbar', {
          text: 'Komentaras ištrintas',
        });
        resolve(res);
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
