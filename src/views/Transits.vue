<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="(post, index) in posts" :key="post.id" xs12 sm6 md4 lg3>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="[`elevation-${hover ? 18 : 2}`, { 'clickable': hover }]"
              @click.native="viewPost(post, index)"
            >
              <v-card-title class="title" style="font-size: 18px !important">
                <v-icon class="mr-2">location_on</v-icon>
                {{ post.from }} - {{ post.to }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div style="display: flex; justify-content: space-between">
                  <v-subheader>Data:</v-subheader>
                  <span>{{ post.date.slice(0, 10) }}</span>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <v-subheader>Kaina:</v-subheader>
                  <span>{{ post.price }}</span>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text class="text-xs-left">
                <v-subheader>Aprašymas:</v-subheader>
                <span>{{ post.description }}</span>
              </v-card-text>
              <v-card-actions v-if="$isCurrentUser(post.user._id)">
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="editPost(post, index)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon @click.stop="deletePost(post, index)">
                  <v-icon color="teal">delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="800px"
      lazy
      scrollable
      persistent
    >
      <PostForm :dialog="dialog" :index="index" :item="post"/>
    </v-dialog>

    <v-scale-transition v-if="$store.getters.accessToken" origin="center">
      <v-btn
        v-if="showPrimaryBtn"
        fab
        bottom
        right
        color="primary"
        dark
        fixed
        @click.stop="newPost"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-scale-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostForm from '../components/PostForm.vue';

export default {
  name: 'Posts',

  components: {
    PostForm,
  },

  data() {
    return {
      showPrimaryBtn: false,
    };
  },

  computed: mapState({
    dialog: (state) => state.posts.dialog,
    index: (state) => state.posts.index,
    post: (state) => state.posts.editedPost,
    posts: (state) => state.posts.posts,
  }),

  created() {
    this.$store.dispatch('getPosts');
    this.$store.commit('storeComments', []);
  },

  mounted() {
    setTimeout(() => {
      this.showPrimaryBtn = true;
    }, 500);
  },

  beforeRouteLeave(to, from, next) {
    this.showPrimaryBtn = false;
    setTimeout(() => {
      next();
    }, 300);
  },

  methods: {
    newPost() {
      this.$store.commit('newPost');
    },

    viewPost(post, index) {
      this.$store.commit('viewPost', {
        post,
        index,
      });
    },

    editPost(post, index) {
      this.$store.commit('editPost', {
        post,
        index,
      });
    },

    deletePost(post, index) {
      this.$store.commit('openConfirmDialog', {
        title: 'Ar tikrai norite trinti šį skelbimą?',
      });
      this.$eventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
          this.$store.dispatch('deletePost', {
            post,
            index,
          });
        }
        this.$eventBus.$off('confirmDialogClosed');
      });
    },
  },
};
</script>
