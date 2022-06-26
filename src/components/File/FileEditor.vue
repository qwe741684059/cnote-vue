<template>
  <div>
    <van-sticky>
      <van-nav-bar
          :title="fileName"
          left-text="返回"
          @click-left="goBack"
          left-arrow
      />
    </van-sticky>
    <markdown-pro
        @on-save="save"
        v-model="value"
        :style="markdownStyle"
        :toolbars="toolbars"
        :theme="theme"
    >
    </markdown-pro>
  </div>
</template>

<script>
import MarkdownPro from 'vue-meditor'
import {findByDetailId, updateDetail} from "@/api/fileDetail";
import {Toast} from "vant";
export default {
  name: "FileEditor",
  created() {
    const _this = this
    findByDetailId(this.$route.params.fileDetailId).then(function (resp) {
      _this.value = resp.data.mdContent
      _this.theme = resp.data.theme
    })
  },

  components:{
    MarkdownPro
  },
  data() {
    return {
      value:'',
      fileName:this.$route.query.fileName,
      theme:'light',
      markdownStyle:{'height':document.documentElement.clientHeight+'px'},
      object:null,
      toolbars:{
        strong:true,
        italic:true,
        overline:true,
        h1:true,
        h2:true,
        h3:true,
        hr:true,
        quote:true,
        ul:true,
        ol:true,
        code:true,
        link:true,
        image:true,
        table:true,
        preview:true,
        split:true,
        theme:true,
        exportmd:true,
        importmd:false,
        save:true,
        clear:true
      }
    }
  },
  methods: {
    save(value) {
      let fileDetail = {
        fileDetailId:this.$route.params.fileDetailId,
        fileId:this.$route.query.fileId,
        theme: value.theme,
        mdContent:value.value,
        htmlContent:value.html
      }
      updateDetail(fileDetail).then(function (resp) {
        if (resp.status === 200) {
          Toast.success("保存成功")
        } else {
          Toast.fail("保存失败")
        }
      })
    },
    ready(object) {
      console.log(object)
      this.object=object
    },
    goBack() {
      this.$router.go(-1)
    }


  }

}
</script>

<style scoped>

</style>