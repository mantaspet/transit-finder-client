<template>
  <v-card>
    <form @submit.prevent="createPost">
      <v-card-title class="title">{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-container grid-list-md class="pa-0">
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field
                v-if="dialog"
                v-model="item.from"
                v-validate="'required'"
                :error-messages="[
                  ...backendErrors['from'],
                  ...errors.collect('from')
                ]"
                label="Kelionės tikslas"
                name="from"
                autofocus
                @blur="clearErrors('from')"
              />
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.to"
                v-validate="'required'"
                :error-messages="[
                  ...backendErrors['to'],
                  ...errors.collect('to')
                ]"
                label="Kelionės pradžia"
                name="to"
                @blur="clearErrors('to')"
              />
            </v-flex>

            <v-flex xs12 sm6>
              <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                min-width="290"
                lazy
                offset-y
                full-width
              >
                <v-text-field
                  slot="activator"
                  v-validate="'required'"
                  :error-messages="[...backendErrors.date, ...errors.collect('date')]"
                  label="Data"
                  :value="item.date"
                  name="date"
                  append-icon="event"
                  @blur="item.date = formatDate($event.target.value); clearErrors('date')"
                />
                <v-date-picker
                  v-model="item.date"
                  locale="lt"
                  first-day-of-week="1"
                  no-title
                  scrollable
                  @input="validateField('date'); datePicker = false;"
                />
              </v-menu>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.price"
                v-validate="'required'"
                :error-messages="[
                  ...backendErrors['price'],
                  ...errors.collect('price')
                ]"
                label="Kaina"
                name="price"
                @blur="clearErrors('price')"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="item.description"
                :error-messages="backendErrors.description"
                name="description"
                label="Aprašymas"
                auto-grow
                @blur="clearErrors('description')"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="close">{{ $t('cancel') }}</v-btn>
        <v-btn :disabled="requestPending" flat color="primary" @click="createPost">{{ $t('save') }}</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import formMixin from '../mixins/form-mixin';

export default {
  name: 'PostForm',

  mixins: [formMixin],

  data() {
    return {
      datePicker: false,
    };
  },

  computed: {},

  computed: {
    formTitle() {
      return this.index === -1 ? 'Nauja kelionė' : 'Kelionės redagavimas';
    },

    ...mapState({
      backendErrors: (state) => state.posts.backendErrors,
    }),
  },

  methods: {
    createPost() {
      this.$validator.validate().then((passed) => {
        if (passed) {
          this.item.user = this.$store.getters.currentUser._id;
          if (this.index > -1) {
            this.$store.dispatch('updatePost', this.item);
          } else {
            this.$store.dispatch('createPost', this.item);
          }
        }
      });
    },

    close() {
      this.$store.commit('closePostForm');
    },

    formatDate(date) {
      if (date) {
        const d = new Date(date);
        if (d instanceof Date && !isNaN(d)) {
          let [year, month, day] = date.split('-');
          if (!year) {
            year = '2010';
          }
          if (!month) {
            month = '01';
          }
          if (!day) {
            day = '01';
          }
          return `${year}-${month}-${day}`;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },

    clearErrors(field) {
      this.$store.commit('clearPostError', field);
    },
  },
};
</script>
