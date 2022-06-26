<template>
  <v-row>

    <v-col cols="2" >
      <!-- 左边菜单栏 -->
      <left-menu></left-menu>
    </v-col>

    <v-col>
      <!-- 面包屑导航 -->
      <v-row>
        <v-container style="height: 68px">
          <bread-crumb :path="this.$route.params.path"></bread-crumb>
        </v-container>

      </v-row>

      <v-row><v-divider></v-divider></v-row>


      <!-- 分割线 -->


      <!-- 文件列表 -->
      <v-row v-for="(item,index) in itemList" :key="index" justify="start">
        <v-col v-for="(i,idx) in item" :key="idx" cols="2">
          <file-card :item="i"></file-card>
        </v-col>

      </v-row>
    </v-col>
  </v-row>

</template>

<script>
import LeftMenu from "@/components/LeftMenu";
import BreadCrumb from "@/components/BreadCrumb";
import FileCard from "@/components/File/FileCard";
import {findAllByPath} from "@/api/file";
  export default {
    name: 'Home',
    components: {
      LeftMenu,
      BreadCrumb,
      FileCard
    },
    watch: {
      $route() {
        const _this = this
        if(this.$route.params.path == null) {
          let path = 'index.html'
          findAllByPath(path).then(function (resp) {
            _this.itemList = resp.data
            _this.sliceArray()
          })
        } else {
          let path = this.$route.params.path
          findAllByPath(path).then(function (resp) {
            _this.itemList = resp.data
            _this.sliceArray()
          })
        }
      }
    },
    created() {
      const _this = this
      if(this.$route.params.path == null) {
        let path = "index.html"
        findAllByPath(path).then(function (resp) {
          _this.itemList = resp.data
          _this.sliceArray()
        })
      } else {
        let path = this.$route.params.path
        findAllByPath(path).then(function (resp) {
          _this.itemList = resp.data
          _this.sliceArray()
        })
      }

    },
    data() {
      return {
        itemList:[]
      }
    },
    methods: {
      sliceArray() {  // 将数组分割成每行6个
        let list = [];
        for (let i = 1; i < Math.ceil(this.itemList.length / 6) + 1; i++) {
          list.push(this.itemList.slice(6 * (i - 1), 6 * i))
        }
        this.itemList = list
      }
    }
  }
</script>
