<template>
  <!-- eslint-disable max-len -->
  <v-data-table
    :headers="headers"
    :loading="isLoading"
    :items="items"
    disable-initial-sort
    hide-actions
  >
    <template slot="headers" slot-scope="props">
      <th class="text-xs-left">{{ headers[0].text }}</th>
      <template v-if="$vuetify.breakpoint.smAndUp">
        <th class="text-xs-right">{{ headers[1].text }}</th>
        <th class="text-xs-right">{{ headers[2].text }}</th>
      </template>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <th class="text-xs-right">{{ headers[3].text }}</th>
        <th class="text-xs-right">{{ headers[4].text }}</th>
        <th class="text-xs-right">{{ headers[5].text }}</th>
      </template>
      <th v-if="$store.getters.isTouchDevice"></th>
    </template>

    <template slot="items" slot-scope="props">
      <tr
        class="table-row clickable"
        :style="{'background': props.item.status !== 'active' ? 'lightgray' : ''}"
        @click="editItem(props.item, props.index)"
      >
        <td>
          <v-layout align-center>
            <v-flex v-if="$vuetify.breakpoint.smAndDown" xs1>
              <v-btn
                icon
                class="mx-0"
                style="right: 14px"
                @click.stop="props.expanded = !props.expanded"
              >
                <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }}</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>{{ props.item.person.full_name }}</v-flex>
          </v-layout>
        </td>
        <template v-if="$vuetify.breakpoint.smAndUp">
          <td class="text-xs-right">{{ props.item.person.phone }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
        </template>
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <td class="text-xs-right">{{ props.item.person.address }}</td>
          <td class="text-xs-right">
            <v-chip
              :color="props.item.role === 'admin' ? 'primary' : 'grey lighten-1'"
              text-color="white"
              label
              small
            >{{ $t(`roles.${props.item.role}`) }}</v-chip>
          </td>
          <td class="text-xs-right">
            <v-chip
              :color="props.item.status === 'suspended' ? 'red' : 'primary'"
              text-color="white"
              label
              small
            >{{ $t(`statuses.${props.item.status}`) }}</v-chip>
          </td>
        </template>
        <td v-if="$store.getters.isTouchDevice" class="text-xs-right" style="padding: 0 14px">
          <v-menu slot="activator" bottom lazy offset-y @click.native.stop>
            <v-btn slot="activator" icon class="mx-0">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="impersonateUser(props.item.id)">
                <v-list-tile-action>
                  <v-icon>people</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{ $t('impersonate') }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="resetPassword(props.item.id)">
                <v-list-tile-action>
                  <v-icon>refresh</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{ $t('reset_password') }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
        <div v-else class="row-actions">
          <v-tooltip bottom lazy>
            <v-btn slot="activator" icon class="mx-0" @click.stop="impersonateUser(props.item.id)">
              <v-icon>people</v-icon>
            </v-btn>
            <span>{{ $t('impersonate') }}</span>
          </v-tooltip>
          <v-tooltip bottom lazy>
            <v-btn slot="activator" icon class="mx-0" @click.stop="resetPassword(props.item.id)">
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>{{ $t('reset_password' )}}</span>
          </v-tooltip>
        </div>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <div
        :style="{'background-color': props.index % 2 === 0 ? '#E0E0E0' : 'inherit'}"
        class="pa-3 clickable"
        @click="editItem(props.item, props.index)"
      >
        <template v-if="$vuetify.breakpoint.xsOnly">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[1].text }}:</strong>
            <span class="text-xs-right">{{ props.item.person.phone }}</span>
          </v-layout>
          <v-divider/>
          <v-layout justify-space-between align-center>
            <strong>{{ headers[2].text }}:</strong>
            <span class="text-xs-right">{{ props.item.email }}</span>
          </v-layout>
          <v-divider/>
        </template>
        <template v-if="$vuetify.breakpoint.smAndDown">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[3].text }}:</strong>
            <span class="text-xs-right">{{ props.item.person.address }}</span>
          </v-layout>
          <v-divider/>
          <v-layout justify-space-between align-center>
            <strong>{{ headers[4].text }}:</strong>
            <span class="text-xs-right">
              <v-chip
                :color="props.item.role === 'admin' ? 'primary' : 'grey lighten-1'"
                text-color="white"
                label
                small
              >{{ $t(`roles.${props.item.role}`) }}</v-chip>
            </span>
          </v-layout>
          <v-divider/>
          <v-layout justify-space-between align-center>
            <strong>{{ headers[5].text }}:</strong>
            <span class="text-xs-right">
              <v-chip
                :color="props.item.status === 'suspended' ? 'red' : 'primary'"
                text-color="white"
                label
                small
              >{{ $t(`statuses.${props.item.status}`) }}</v-chip>
            </span>
          </v-layout>
        </template>
      </div>
    </template>

    <template slot="no-data">
      <div class="pa-3 text-xs-center">
        <span v-if="!isLoading">{{ $t('no_entries') }}</span>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import listMixin from '../mixins/list-mixin';

export default {
  name: 'UsersList',

  mixins: [listMixin],

  computed: {
    headers() {
      return [
        { text: this.$t('full_name') },
        { text: this.$t('phone') },
        { text: this.$t('email') },
        { text: this.$t('address') },
        { text: this.$t('role') },
        { text: this.$t('status') },
      ];
    },
  },

  methods: {
    resetPassword(id) {
      this.$store.commit('openConfirmDialog', {
        title: this.$t('confirm_password_reset'),
      });
      this.$eventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
          this.$http.post(`api/users/${id}/reset-password`).then(() => {
            this.$store.commit('openSnackbar', {
              text: this.$t('password_was_reset'),
            });
          });
        }
        this.$eventBus.$off('confirmDialogClosed');
      });
    },

    impersonateUser(id) {
      this.$store.dispatch('impersonateUser', id).then(() => {
        this.$router.replace('/');
      });
    },
  },
};
</script>
