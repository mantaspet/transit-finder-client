export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    items: Array,
  },

  methods: {
    editItem(item, index) {
      this.$emit('edit', {
        item,
        index,
      });
    },

    deleteItem(id, index) {
      this.$emit('delete', {
        id,
        index,
      });
    },

    downloadFile(url, item, nameField) {
      this.$http({
        url,
        method: 'GET',
        responseType: 'blob',
      }).then((res) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([res.data]));
        link.setAttribute('download', item[nameField]);
        document.body.appendChild(link);
        link.click();
      });
    },

    // toggleListCheckbox(item, index, field, route) {
    //   const editedItem = item;
    //   editedItem[field] = !editedItem[field];
    //   this.$http.put(`${route}${editedItem.id}`, editedItem).then((res) => {
    //     this.$set(editedItem, field, !editedItem[field]);
    //     if (this.updateAction) {
    //       this.$store.dispatch(this.updateAction, {
    //         index,
    //         item: res.data,
    //       });
    //     } else {
    //       this.items[index] = res.data;
    //     }
    //   }).catch(() => {
    //     this.$set(editedItem, field, !editedItem[field]);
    //   });
    // },
  },
};
