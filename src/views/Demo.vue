<template>
  <div class="full-width">
    <v-layout justify-space-between align-center row wrap>
      <v-flex class="pa-3" xs12 lg6>
        <h2>
          {{ $t('demo') }}
          <v-tooltip bottom lazy>
            <v-btn slot="activator" icon class="mx-0" @click.stop="uploadFile">
              <v-icon>file_upload</v-icon>
            </v-btn>
            <span>{{ $t('upload_file' )}}</span>
          </v-tooltip>
          <v-btn slot="activator" icon class="mx-0" @click.stop>
            <v-icon>file_download</v-icon>
          </v-btn>
        </h2>
      </v-flex>
      <v-flex v-if="$isAdmin()" class="px-3" xs12 sm6 lg3>
        <Autocomplete
          :search-route="userSearchRoute"
          :item="selectedUser"
          :label-text="$t('user')"
          :prepended-icon="'person'"
          text-field="full_name"
          clearable
          @itemSelected="userSelected"
        />
      </v-flex>
      <v-flex class="px-3" xs12 sm6 lg3>
        <v-text-field
          v-model="searchText"
          :label="$t('search')"
          prepend-inner-icon="search"
          @input="searchTextChanged"
        />
      </v-flex>
    </v-layout>

    <UserList :items="items" :is-loading="isLoading" @edit="editItem" @delete="deleteItem"/>

    <div v-if="pageCount > 1" class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="pt-3"
        :total-visible="$vuetify.breakpoint.smAndDown ? 5 : 7"
        circle
        @input="getPaginatedItems(filterParams, $event)"
      />
    </div>

    <v-dialog
      v-model="fileUploadDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="800px"
      lazy
      scrollable
      persistent
    >
      <FileSelectForm
        :dialog="fileUploadDialog"
        @fileUploaded="fileUploaded"
        @dialogClosed="fileUploadDialog = false"
      />
    </v-dialog>

    <v-scale-transition origin="center">
      <v-btn v-if="showPrimaryBtn" fab bottom right color="primary" dark fixed @click.stop>
        <v-icon>add</v-icon>
      </v-btn>
    </v-scale-transition>
  </div>
</template>

<script>
// The purpose of this page is to display:
// 1. layout for extra actions above table
// 2. an example usage of file upload components
// 3. an example usage of filtering
// 4. an example usage of autocomplete
import Autocomplete from '../components/Autocomplete.vue';
import UserList from '../components/UserList.vue';
import primaryButtonMixin from '../mixins/primary-button-mixin';
import tableViewMixin from '../mixins/table-view-mixin';
import FileSelectForm from '../components/FileSelectForm.vue';

export default {
  name: 'Demo',

  components: {
    UserList,
    FileSelectForm,
    Autocomplete,
  },

  mixins: [primaryButtonMixin, tableViewMixin],

  data() {
    return {
      page: 1,
      apiRoute: 'api/users',
      userSearchRoute: 'api/users/find/',
      timer: null,
      searchText: '',
      selectedUser: null,
      fileUploadDialog: false,
      model: 'user',
    };
  },

  computed: {
    newItem() {
      const newItem = {
        tags: [],
      };
      if (this.$store.getters.auth.currentUser && !this.$isAdmin()) {
        newItem.user_id = this.$store.getters.auth.currentUser.id;
      }
      return newItem;
    },
  },

  methods: {
    fileUploaded() {
      this.$store.commit('openSnackbar', {
        text: this.$t('file_uploaded'),
      });
      this.getPaginatedItems(this.filterParams, this.page);
      this.fileUploadDialog = false;
    },

    searchClients() {
      let params = '';
      if (this.selectedUser) {
        params += `user_id=${this.selectedUser.id}&`;
      }
      if (this.searchText.length > 2) {
        params += `search=${this.searchText}`;
      }
      this.filterParams = params;
      this.getPaginatedItems(this.filterParams, 1);
      this.page = 1;
    },

    searchTextChanged() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.searchClients();
      }, 500);
    },

    userSelected(event) {
      this.selectedUser = event;
      this.searchClients();
    },

    uploadFile() {
      this.fileUploadDialog = true;
    },
  },
};
</script>
