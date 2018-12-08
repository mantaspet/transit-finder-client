<template>
<div>
  <button @click="loginWithFacebook">
    Prisijungti su Facebook
  </button>
  <button @click="getFbUser">
    Gauti FB useri
  </button>
</div>
</template>

<script>
/* eslint no-undef: 0 */
/* eslint consistent-return: 0 */
/* eslint prefer-promise-reject-errors: 0 */

export default {
  name: 'Login',

  created() {
    FB.init({
      appId: process.env.VUE_APP_FACEBOOK_APP_ID,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.2',
    });
  },

  methods: {
    loginWithFacebook() {
      this.$store.dispatch('loginWithFacebook').then(() => {
        console.log('User has been logged in');
        this.$router.replace({ name: 'home' });
      });
    },

    getFbUser() {
      FB.api(
        "/me?fields=link",
        function (response) {
          console.log(response);
          if (response && !response.error) {

          }
        }
      );
    },
  },
};
</script>
