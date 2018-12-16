<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex class="form-group-header" style="margin-top: 0" xs12>
              <h3 class="title">{{ $t('upload_file') }}</h3>
            </v-flex>

            <v-flex xs12>
              <FileSelect
                v-if="dialog"
                :multiple="false"
                :fileFormats="allowedFileFormats"
                :errorMessages="backendErrors.file"
                @fileSelected="setFile"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click.native="close">
        {{ $t('cancel') }}
      </v-btn>
      <v-btn
        color="primary"
        @click.native="uploadFile"
        :disabled="requestPending">
        {{ $t('upload') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FileSelect from './FileSelect.vue';
import formMixin from '../mixins/form-mixin';

export default {
  name: 'FileSelectForm',

  components: {
    FileSelect,
  },

  mixins: [formMixin],

  data() {
    return {
      apiRoute: '',
      selectedFile: null,
      allowedFileFormats: '.png, .jpeg, .gif, .jpg, .bmp',
      backendErrors: {
        file: [],
      },
    };
  },

  methods: {
    uploadFile() {
      // this.$validator.validate().then((passed) => {
      //   if (passed) {
      //     this.requestPending = true;
      //     const requestBody = new FormData();
      //     requestBody.append('file', this.selectedFile);
      //     this.$http.post(this.apiRoute, requestBody, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     }).then((res) => {
      //       this.$emit('fileUploaded', res.data);
      //     }).catch((error) => {
      //       this.handleBackendErrors(error);
      //     });
      //   }
      // });
      this.$emit('fileUploaded', {});
    },

    setFile(event) {
      [this.selectedFile] = event;
    },
  },
};
</script>
