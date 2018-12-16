<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex class="form-group-header" style="margin-top: 0" xs12>
              <h3 class="title">{{formTitle}}</h3>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-if="dialog"
                v-model="item.person.first_name"
                v-validate="'required'"
                :error-messages="[
                  ...backendErrors['person.first_name'],
                  ...errors.collect('first_name')
                ]"
                :label="$t('first_name')"
                name="first_name"
                autofocus
                @blur="clearErrors('first_name')"/>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.person.last_name"
                v-validate="'required'"
                :error-messages="[
                  ...backendErrors['person.last_name'],
                  ...errors.collect('last_name')
                ]"
                :label="$t('last_name')"
                name="last_name"
                @blur="clearErrors('last_name')"/>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.person.email"
                v-validate="'required|email'"
                :error-messages="[...backendErrors['person.email'], ...errors.collect('email')]"
                :label="$t('email')"
                name="email"
                @blur="clearErrors('email')"/>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.person.phone"
                :error-messages="backendErrors['person.phone']"
                :label="$t('phone')"
                name="phone"
                @blur="clearErrors('phone')"/>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.person.address"
                :error-messages="backendErrors['person.address']"
                :label="$t('address')"
                name="address"
                @blur="clearErrors('address')"/>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="item.role"
                v-validate="'required'"
                :items="roles"
                :disabled="$isCurrentUser(item.id)"
                :error-messages="[...backendErrors['role'], ...errors.collect('role')]"
                :label="$t('role')"
                name="role"
                @blur="clearErrors('role')"/>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="item.status"
                :items="statuses"
                :disabled="$isCurrentUser(item.id)"
                :error-messages="[...backendErrors['status'], ...errors.collect('status')]"
                :label="$t('status')"
                name="status"
                @blur="clearErrors('status')"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="primary"
        @click.native="close">
        {{ $t('cancel') }}
      </v-btn>
      <v-btn
        :disabled="requestPending"
        color="primary"
        @click.native="save(apiRoute)">
        {{ $t('save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import formMixin from '../mixins/form-mixin';

export default {
  name: 'UserForm',

  mixins: [formMixin],

  data() {
    return {
      apiRoute: 'api/users/',
      editingPassword: false,
      hidePassword: true,
      backendErrors: {
        'person.first_name': [],
        'person.last_name': [],
        'person.email': [],
        'person.phone': [],
        'person.address': [],
        role: [],
        status: [],
      },
      roles: [
        { value: 'admin', text: this.$t('roles.admin') },
        { value: 'user', text: this.$t('roles.user') },
      ],
      statuses: [
        { value: 'active', text: this.$t('statuses.active') },
        { value: 'suspended', text: this.$t('statuses.suspended') },
      ],
    };
  },

  computed: {
    formTitle() {
      return this.index === -1 ? this.$t('new_user') : this.$t('edit_user');
    },
  },

  created() {
    this.item.person = {};
  },
};
</script>
