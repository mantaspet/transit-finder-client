export default {
  data() {
    return {
      dialog: false,
      isLoading: true,
      editedItem: {},
      defaultItem: {},
      editedIndex: -1,
      pageCount: 1,
      filterParams: '',
      items: [],
    };
  },

  created() {
    if (this.page) {
      this.getPaginatedItems(this.filterParams, this.page);
    } else {
      this.getItems(this.filterParams);
    }
  },

  methods: {
    getItems(filterParams) {
      this.$http.get(`${this.apiRoute}?${filterParams}`).then((res) => {
        this.items = res.data;
      }).finally(() => {
        this.isLoading = false;
      });
    },

    getPaginatedItems(filterParams, page) {
      this.$http.get(`${this.apiRoute}?page=${page}&${filterParams}`).then((res) => {
        this.pageCount = res.data.last_page;
        this.page = res.data.current_page;
        this.items = res.data.data;
        this.$vuetify.goTo(0, {
          duration: 900,
          easing: 'easeOutQuint',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },

    // filterUpdated(filterParams) {
    //   this.filterParams = filterParams;
    //   if (this.page) {
    //     this.getPaginatedItems(this.filterParams, 1);
    //   } else {
    //     this.getItems(this.filterParams);
    //   }
    // },

    createItem(newItem) {
      this.editedIndex = -1;
      this.editedItem = JSON.parse(JSON.stringify(newItem));
      this.dialog = true;
    },

    editItem(event) {
      this.editedIndex = event.index;
      this.editedItem = JSON.parse(JSON.stringify(event.item));
      this.defaultItem = JSON.parse(JSON.stringify(event.item));
      this.dialog = true;
    },

    deleteItem(event) {
      this.$store.commit('openConfirmDialog', {
        title: this.$t('confirm_entry_delete'),
      });
      this.$eventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
          this.$http.delete(`${this.apiRoute}/${event.id}`).then(() => {
            this.items.splice(event.index, 1);
            this.$store.commit('openSnackbar', {
              text: `${this.$t(this.model)} ${this.$t('deleted')}.`,
            });
          });
        }
        this.$eventBus.$off('confirmDialogClosed');
      });
    },

    itemCreated(item, bringToFront) {
      if (bringToFront) {
        this.items.unshift(item);
      } else {
        this.items.push(item);
      }
      this.$store.commit('openSnackbar', {
        text: `${this.$t(this.model)} ${this.$t('created')}.`,
      });
      this.dialog = false;
    },

    itemUpdated(item) {
      this.$set(this.items, this.editedIndex, item);
      this.$store.commit('openSnackbar', {
        text: `${this.$t(this.model)} ${this.$t('updated')}.`,
      });
      this.dialog = false;
    },
  },
};
