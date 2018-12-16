<template>
  <v-dialog v-model="isOpen" max-width="350" lazy persistent>
    <v-card>
      <div class="pa-2">
        <v-card-title class="title">{{ title }}</v-card-title>
        <v-card-text>{{ body }}</v-card-text>
      </div>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" flat @click.native="onCancel">{{ cancelText }}</v-btn>
        <v-btn color="primary" autofocus @click.native="onConfirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: String,
    body: String,
    cancelText: String,
    confirmText: String,
  },

  methods: {
    onConfirm() {
      this.$store.commit('closeConfirmDialog', true);
      this.$eventBus.$emit('confirmDialogClosed', true);
    },

    onCancel() {
      this.$store.commit('closeConfirmDialog', false);
      this.$eventBus.$emit('confirmDialogClosed', false);
    },
  },
};
</script>
