<template>
  <div>
    <v-card height="1000" >
      <v-navigation-drawer
      >
        <template v-slot:prepend>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>CNote</v-list-item-title>
            </v-list-item-content>
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
                <v-icon v-if="!item.file">
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
import {findTree} from "@/api/file";

export default {
  name: "LeftMenu",
  created() {
    const _this = this
    findTree().then(function (resp) {
      _this.items = resp.data
    })
  },
  data() {
    return {
      dark:true,
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
      items: [
        {
          name: '.git',
        },
        {
          name: 'node_modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png',
              }],
            },
            {
              name: 'favicon.ico',
              file: 'png',
            },
            {
              name: 'index.html',
              file: 'html',
            },
          ],
        },
        {
          name: '.gitignore',
          file: 'txt',
        },
        {
          name: 'babel.config.js',
          file: 'js',
        },
        {
          name: 'package.json',
          file: 'json',
        },
        {
          name: 'README.md',
          file: 'md',
        },
        {
          name: 'vue.config.js',
          file: 'js',
        },
        {
          name: 'yarn.lock',
          file: 'txt',
        },
      ],
    }
  },
  methods: {
  }
}
</script>

<style>

</style>