<template>
  <div>
    <v-text-field
      v-model="filename"
      :errorMessages="displayedErrors"
      append-icon="attach_file"
      :label="label"
      name="file"
      @click.native="onFocus"/>
    <input
      ref="fileInput"
      :accept="fileFormats"
      type="file"
      :multiple="multiple"
      @change="onFileChange">
  </div>
</template>

<script>
import i18n from '../i18n/i18n-config';

export default {
  name: 'FileSelect',

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: i18n.t('choose_a_file'),
    },
    fileFormats: {
      type: String,
      default: '*',
    },
    errorMessages: Array,
    file: File,
  },

  data() {
    return {
      displayedErrors: [],
      filename: '',
    };
  },

  watch: {
    file(val) {
      this.onFileChange(val);
    },

    errorMessages(val) {
      this.displayedErrors = val;
    },
  },

  mounted() {
    this.filename = '';
  },

  methods: {
    onFocus() {
      if (!this.disabled) {
        this.$refs.fileInput.click();
      }
    },

    onFileChange(event) {
      let files;
      if (event && event.target) {
        files = event.target.files || event.dataTransfer.files;
      } else if (event) {
        files = [event];
      }
      if (files) {
        if (files.length > 0) {
          this.filename = [...files].map(file => file.name).join(', ');
        } else {
          this.filename = null;
        }
      } else if (event && event.target) {
        this.filename = event.target.value.split('\\').pop();
      } else {
        this.filename = null;
      }
      this.displayedErrors = [];
      this.$emit('fileSelected', files);
    },
  },
};
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
