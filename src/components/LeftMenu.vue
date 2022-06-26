<template>
  <div>
    <v-card height="1000">
      <v-navigation-drawer
      >
        <template v-slot:prepend>
          <v-list-item>
            <v-list-item-icon>
              <v-btn icon @click="clickLeft">
                <v-icon>mdi-home-city</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>CNote</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{on, attrs}">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="blue darken-1">mdi-plus-circle</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">在当前路径新建文件</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-text-field label="文件名*" required v-model="file.fileName"></v-text-field>
                      </v-row>

                      <v-row>
                        <v-autocomplete
                            v-model="file.fileType"
                          :items="['文件夹','笔记']"
                          label="文件类型">
                        </v-autocomplete>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
                    <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-avatar>
          </v-list-item>
        </template>

          <v-divider></v-divider>

          <v-list-item>
            <v-treeview
                v-model="tree"
                :open="open"
                :items="items"
                activatable
                item-key="name"
                open-on-click
            >
              <template v-slot:prepend="{ item, open }">
                <v-icon v-if="!item.file" >
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  {{ files[item.file] }}
                </v-icon>
              </template>
            </v-treeview>
          </v-list-item>

      </v-navigation-drawer>


    </v-card>

  </div>

</template>

<script>
import {findTree, saveFile} from "@/api/file";
import {Toast} from "vant";

export default {
  name: "LeftMenu",
  created() {
    const _this = this
    findTree().then(function (resp) {
      _this.items = resp.data
      console.log(_this.items)
    })
  },
  data() {
    return {
      dialog:false,
      open: ['public'],
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
      tree: [],
      items: [],
      file:{fileName:'',fileType:'',filePath:''}
    }
  },
  inject:["reload"],
  methods: {
    save() {
      const _this = this

      if (this.$route.path === '/') {
        this.file.filePath = 'index.html'
      } else {
        this.file.filePath = decodeURI(this.$route.path.slice(1))
      }
      if (this.file.fileType === "文件夹"){
        this.file.fileType = null
      }
      if (this.file.fileType === "笔记") {
        this.file.fileType = "md"
      }
      console.log(this.file)
      saveFile(this.file).then(function (resp) {
        if (resp.status === 200){
          Toast.success("新建成功")
          _this.reload()
          _this.dialog=false
        }
        if (resp.status === 302) {
          Toast.fail("文件已存在")
        }
      })
    },
    clickLeft() {
      this.$router.push("/")
    }

  }
}
</script>

<style>

</style>