<template>
  <v-menu bottom lazy offset-y>
    <v-btn slot="activator" flat>
      <v-img :src="$store.getters.appSettings.localeIcon" height="20" contain/>
      {{ $store.getters.appSettings.locale.toUpperCase() }}
    </v-btn>

    <v-list class="pa-0">
      <v-list-tile v-for="lang in languages" :key="lang.locale" @click="updateLocale(lang)">
        <v-list-tile-action>
          <v-img :src="lang.localeIcon" height="20" contain/>
        </v-list-tile-action>
        <v-list-tile-title>{{ lang.locale.toUpperCase() }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
/* eslint-disable import/no-unresolved,global-require */
export default {
  name: 'LanguageSelector',

  data() {
    return {
      languages: [
        { locale: 'lt', localeIcon: require('@/assets/locale/lt-flag.png') }, // 'require' is used to make v-img work with dynamic src attributes
        { locale: 'en', localeIcon: require('@/assets/locale/en-flag.png') },
      ],
    };
  },

  methods: {
    updateLocale(lang) {
      this.$store.commit('updateLocale', lang);
      this.$i18n.locale = lang.locale;
    },
  },
};
</script>
