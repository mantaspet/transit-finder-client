import VeeValidate, { Validator } from 'vee-validate';
import i18n from './i18n/i18n-config';

// Override default VeeValidate error messages with custom ones.
// They will update automatically based on selected locale.
const dictionary = {
  en: {
    messages: {
      required: () => i18n.t('required_field'),
      email: () => i18n.t('wrong_email'),
    },
  },
};
Validator.localize(dictionary);
const validator = new Validator({
  required: 'required',
  email: 'email',
});
validator.localize('en');

export default VeeValidate;
