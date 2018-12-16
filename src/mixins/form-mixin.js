export default {
  props: {
    dialog: Boolean,
    index: Number,
    item: Object,
  },

  data() {
    return {
      requestPending: false,
    };
  },

  watch: {
    dialog(val) {
      this.$validator.reset();
      if (!val) {
        Object.keys(this.backendErrors).forEach((key) => {
          this.backendErrors[key] = [];
        });
      } else {
        this.requestPending = false;
      }
    },
  },

  methods: {
    save(apiRoute) {
      this.$validator.validate().then((passed) => {
        if (passed) {
          this.requestPending = true;
          if (this.index > -1) {
            this.$http
              .put(`${apiRoute}${this.item.id}`, this.item)
              .then((res) => {
                this.$emit('itemUpdated', res.data);
              })
              .catch((error) => {
                this.handleBackendErrors(error);
              });
          } else {
            this.$http
              .post(`${apiRoute}`, this.item)
              .then((res) => {
                this.$emit('itemCreated', res.data);
              })
              .catch((error) => {
                this.handleBackendErrors(error);
              });
          }
        }
      });
    },

    setAutocompleteValue(item, objectField, idField) {
      if (item) {
        this.item[objectField] = item;
        this.item[idField] = item.id;
      } else {
        this.item[objectField] = null;
        this.item[idField] = null;
      }
    },

    setMultiselectValue(items, arrayField) {
      this.item[arrayField] = items;
    },

    validateField(field) {
      setTimeout(() => {
        this.$validator.validate(field);
      }, 100);
    },

    clearErrors(field) {
      this.backendErrors[field] = [];
    },

    handleBackendErrors(error) {
      this.requestPending = false;
      if (error.response && error.response.status === 422) {
        Object.keys(error.response.data.errors).forEach((key) => {
          this.backendErrors[key] = error.response.data.errors[key];
        });
      }
    },

    close() {
      this.$emit('dialogClosed');
    },
  },
};
