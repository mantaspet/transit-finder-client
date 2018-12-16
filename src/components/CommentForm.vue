<template>
  <!-- eslint-disable max-len -->
  <v-card>
    <form @submit.prevent="createComment">
      <v-card-title class="title">{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-container grid-list-md class="pa-0">
          <v-layout wrap>
            <v-flex xs12>
              <v-textarea
                v-model="item.text"
                :error-messages="backendErrors.text"
                name="text"
                label="Tekstas"
                auto-grow
                @blur="clearErrors('text')"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="close">{{ $t('cancel') }}</v-btn>
        <v-btn
          :disabled="requestPending"
          flat
          color="primary"
          @click="createComment"
        >{{ $t('save') }}</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
/* eslint-disable no-underscore-dangle,no-restricted-globals */
import { mapState } from 'vuex';
import formMixin from '../mixins/form-mixin';

export default {
  name: 'CommentForm',

  mixins: [formMixin],

  props: {
    post: Object,
  },

  data() {
    return {};
  },

  computed: {
    formTitle() {
      return this.index === -1 ? 'Naujas komentaras' : 'Komentaro redagavimas';
    },

    ...mapState({
      backendErrors: (state) => state.comments.backendErrors,
    }),
  },

  methods: {
    createComment() {
      this.$validator.validate().then((passed) => {
        if (passed) {
          this.item.user = this.$store.getters.currentUser._id;
          this.item.post = this.post._id;
          if (this.index > -1) {
            this.$store.dispatch('updateComment', this.item);
          } else {
            this.item.date = new Date().toISOString().slice(0, 10);
            this.$store.dispatch('createComment', this.item);
          }
        }
      });
    },

    close() {
      this.$store.commit('closeCommentForm');
    },

    clearErrors(field) {
      this.$store.commit('clearCommentError', field);
    },
  },
};
</script>
