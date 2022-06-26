<template>
  <div>
    <el-container>
      <el-header>

      </el-header>
      <el-main>
        <markdown-pro
            @on-save="save"
            v-model="value"
            :style="markdownStyle"
            :toolbars="toolbars"

        >
        </markdown-pro>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import MarkdownPro from 'vue-meditor'
export default {
  name: "FileEditor",
  created() {
  },
  components:{
    MarkdownPro
  },
  data() {
    return {
      value:'',
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
      console.log(value)
    },
    ready(object) {
      console.log(object)
      this.object=object
    },
    goBack() {
      console.log("返回")
    }


  }

}
</script>

<style scoped>

</style>