import Vue from 'vue';
import VueI18n from 'vue-i18n';
import translations from './translations';

Vue.use(VueI18n);
export default new VueI18n({
  locale: 'lt',
  messages: translations,
});
