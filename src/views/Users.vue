<template>
  <div class="full-width">
    <h2 class="pa-3">{{ $t('users') }}</h2>

    <UserList
      :items="items"
      :is-loading="isLoading"
      @edit="editItem"
      @delete="deleteItem"/>

    <div v-if="pageCount > 1" class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="pt-3"
        :total-visible="$vuetify.breakpoint.smAndDown ? 5 : 7"
        circle
        @input="getPaginatedItems(filterParams, $event)"/>
    </div>

    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="800px"
      lazy
      scrollable
      persistent>
      <UserForm
        :dialog="dialog"
        :index="editedIndex"
        :item="editedItem"
        @itemCreated="itemCreated"
        @itemUpdated="itemUpdated"
        @dialogClosed="dialog = false"/>
    </v-dialog>

    <v-scale-transition origin="center">
      <v-btn
        v-if="showPrimaryBtn"
        fab
        bottom
        right
        color="primary"
        dark
        fixed
        @click.stop="createItem(newItem)">
        <v-icon>add</v-icon>
      </v-btn>
    </v-scale-transition>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';
import primaryButtonMixin from '../mixins/primary-button-mixin';
import tableViewMixin from '../mixins/table-view-mixin';

export default {
  name: 'Users',

  components: {
    UserList,
    UserForm,
  },

  mixins: [primaryButtonMixin, tableViewMixin],

  data() {
    return {
      newItem: {
        person: {},
        mail_account: {
          mail_driver: 'smtp',
          mail_encryption: 'tls',
          mail_host: 'smtp.gmail.com',
          mail_port: 587,
        },
        email_day_limit: 490,
        role: 'user',
        status: 'active',
      },
      page: 1,
      apiRoute: 'api/users',
      model: 'user',
    };
  },
};
</script>
