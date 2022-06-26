<template>
  <div>
    <el-breadcrumb class="breadcrumb" >
      <el-breadcrumb-item v-for="(item,idx) in items" :to="{path: item.to}" :key="idx">
        <span style="font-size: 18px">
          {{item.text}}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    path:''
  },
  watch: {
    $route() {
      this.getItems()
    }
  },
  created() {
    this.getItems()
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    getItems() { //处理面包屑导航的路径
      let items = []
      if(this.path == null || this.path ==='index.html') {
        let item = {text:'Home', to:'index.html'}
        items.push(item)
      } else {
        let pathList = this.path.split('/')

        for (let i = 0; i < pathList.length; i++) {
          let item = {text:'', to:''}
          item.text = pathList[i]
          if (item.text === 'index.html') {
            item.text = 'Home'
          }
          for (let j = 0; j < i+1; j++) {
            item.to = item.to + '/' + pathList[j]
          }
          items.push(item)
        }
      }
      this.items = items
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  position: relative;
  top: 15px;
}
</style>
