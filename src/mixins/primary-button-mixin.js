export default {
  data() {
    return {
      showPrimaryBtn: false,
    };
  },

  watch: {
    isLoading(val) {
      if (!val) {
        setTimeout(() => {
          this.showPrimaryBtn = true;
        }, 500);
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    this.showPrimaryBtn = false;
    setTimeout(() => {
      next();
    }, 100);
  },
};
