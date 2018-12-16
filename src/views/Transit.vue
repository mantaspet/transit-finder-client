<template>
  <v-card v-if="post._id" style="max-width: 900px; margin: 16px auto">
    <v-card-title class="title" style="font-size: 18px !important">
      <v-icon class="mr-2">location_on</v-icon>
      {{ post.from }} - {{ post.to }}
      <template v-if="$isCurrentUser(post.user._id) || $isCurrentUser(post.user)">
        <v-spacer></v-spacer>
        <v-btn icon @click="editPost(post)">
          <v-icon color="teal">edit</v-icon>
        </v-btn>
        <v-btn icon @click="deletePost(post)">
          <v-icon color="teal">delete</v-icon>
        </v-btn>
      </template>
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
    <v-divider></v-divider>
    <v-card-text class="text-xs-left">
      <v-subheader>Komentarai:</v-subheader>
      <v-list two-line>
        <template v-for="(comment, index) in comments">
          <v-list-tile :key="comment._id">
            <v-list-tile-content>
              <v-list-tile-title>{{ comment.text }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ comment.user.email }}, {{ comment.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <template v-if="$isCurrentUser(comment.user._id) || $isCurrentUser(comment.user)">
              <v-list-tile-action>
                <v-btn icon @click="editComment(comment, index)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon @click="deleteComment(comment, index)">
                  <v-icon color="teal">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </template>
          </v-list-tile>
          <v-divider v-if="index + 1 < comments.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card-text>

    <v-scale-transition v-if="$store.getters.accessToken" origin="center">
      <v-btn
        v-if="showPrimaryBtn"
        fab
        bottom
        right
        color="primary"
        dark
        fixed
        @click.stop="newComment"
      >
        <v-icon>comment</v-icon>
      </v-btn>
    </v-scale-transition>

    <v-dialog
      v-model="postDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="800px"
      lazy
      scrollable
      persistent
    >
      <PostForm :dialog="postDialog" :index="postIndex" :item="editedPost"/>
    </v-dialog>

    <v-dialog
      v-model="commentDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="800px"
      lazy
      scrollable
      persistent
    >
      <CommentForm :dialog="commentDialog" :index="commentIndex" :item="comment" :post="post"/>
    </v-dialog>
  </v-card>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import CommentForm from '../components/CommentForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'Transit',

  components: {
    PostForm,
    CommentForm,
  },

  data() {
    return {
      showPrimaryBtn: false,
    };
  },

  computed: mapState({
    postDialog: (state) => state.posts.dialog,
    commentDialog: (state) => state.comments.dialog,
    postIndex: (state) => state.posts.index,
    post: (state) => state.posts.post,
    editedPost: (state) => state.posts.editedPost,
    posts: (state) => state.posts.posts,
    comments: (state) => state.comments.comments,
    comment: (state) => state.comments.comment,
    commentIndex: (state) => state.comments.index,
  }),

  created() {
    this.$store.dispatch('getPost', this.$route.params.id);
  },

  beforeRouteLeave(to, from, next) {
    this.showPrimaryBtn = false;
    setTimeout(() => {
      next();
    }, 300);
  },

  mounted() {
    setTimeout(() => {
      this.showPrimaryBtn = true;
    }, 500);
  },

  methods: {
    newComment() {
      this.$store.commit('newComment');
    },

    editPost(post) {
      this.$store.commit('editPost', {
        post,
        index: this.postIndex,
      });
    },

    deletePost(post) {
      this.$store.commit('openConfirmDialog', {
        title: 'Ar tikrai norite trinti šį skelbimą?',
      });
      this.$eventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
          this.$store
            .dispatch('deletePost', {
              post,
              index: this.postIndex,
            })
            .then(() => {
              this.$router.push('/');
            });
        }
        this.$eventBus.$off('confirmDialogClosed');
      });
    },

    editComment(comment, index) {
      this.$store.commit('editComment', {
        comment,
        index,
      });
    },

    deleteComment(comment, index) {
      this.$store.commit('openConfirmDialog', {
        title: 'Ar tikrai norite trinti šį komentarą?',
      });
      this.$eventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
          this.$store.dispatch('deleteComment', {
            comment,
            index,
          });
        }
        this.$eventBus.$off('confirmDialogClosed');
      });
    },
  },
};
</script>
