export default {
  filters: {
    currency(val) {
      const number = +val;
      return number || number === 0 ? parseFloat(number).toFixed(2) : '-';
    },

    percentage(val) {
      const number = +val;
      return number || number === 0 ? `${parseFloat(number).toFixed(2)}%` : '-';
    },

    truncate(val, length) {
      return val && val.length > length ? `${val.slice(0, length)}...` : val;
    },
  },

  registerFilters(Vue) {
    Object.keys(this.filters).forEach((filter) => {
      Vue.filter(filter, this.filters[filter]);
    });
  },
};
