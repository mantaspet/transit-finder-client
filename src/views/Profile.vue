<template>
  <v-layout wrap>
    <v-flex :class="{'ma-3': $vuetify.breakpoint.smAndUp}" xs12 sm6 lg5>
      <v-card class="darker-card">
        <PasswordChangeForm/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PasswordChangeForm from '../components/PasswordChangeForm.vue';

export default {
  name: 'Profile',

  components: {
    PasswordChangeForm,
  },
};
</script>
