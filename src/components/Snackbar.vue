<template>
  <v-snackbar v-model="$store.state.snackbar.isOpen" :timeout="timeout" auto-height bottom>
    {{ text }}
    <v-btn v-if="action" flat @click.stop.prevent="onSnackbarActionClick">{{ action }}</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',

  props: {
    text: String,
    link: String,
    action: String,
    timeout: {
      type: Number,
      default: 4000,
    },
  },

  methods: {
    onSnackbarActionClick() {
      if (this.link) {
        this.$router.push(this.link);
      }
      this.$store.commit('closeSnackbar');
    },
  },
};
</script>
