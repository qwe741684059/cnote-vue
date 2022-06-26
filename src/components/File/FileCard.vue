<template>
  <div>
    <div v-if="!item.file">
      <v-row>
        <v-col align="center" >
          <v-btn  icon large @click="clickFolder" >
            <v-icon large>mdi-folder</v-icon>
          </v-btn >
          <p>{{item.name}}</p>
        </v-col>
      </v-row>

    </div>

    <div v-if="item.file">
      <v-row>
        <v-col align="center" >
          <v-btn icon large value="recent" @click="clickFile">
            <v-icon  large>
              {{ files[item.file] }}
            </v-icon>
          </v-btn>
          <p>{{item.name}}</p>
        </v-col>
      </v-row>

    </div>

  </div>
</template>

<script>
import {saveDetail} from "@/api/fileDetail";
export default {
  name: "FileCard",
  props: {
    item: {
    }
  },
  created() {

  },
  data() {
    return {
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
    }
  },
  methods: {
    clickFile() {
      const _this = this
      let fileDetail = {fileId:this.item.fileId}
      saveDetail(fileDetail).then(function (resp) {
        _this.$router.push({
          path:`/file/${resp.data}`,
          query:{
            fileId:_this.item.fileId,
            fileName: _this.item.name
          }
        })
      })
    },
    clickFolder() {
      if (this.$route.path === '/') {
        let path = '/index.html/' + this.item.name
        this.$router.push(path)
      } else {
        let path = this.$route.path + '/' + this.item.name
        this.$router.push(path)
      }
    }
  }
}
</script>

<style>

</style>