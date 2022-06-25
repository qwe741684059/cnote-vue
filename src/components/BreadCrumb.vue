<template>
  <div>
    <v-breadcrumbs :items="items" large></v-breadcrumbs>
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
      if(this.path == null) {
        let item = {text:'Home', disabled: false, href:'http://localhost:8080/home'}
        items.push(item)
      } else {
        let pathList = this.path.split('/')

        for (let i = 0; i < pathList.length; i++) {
          let item = {text:'',disabled:false, href:'http://localhost:8080'}
          item.text = pathList[i]
          if (item.text === 'home') {
            item.text = 'Home'
          }
          for (let j = 0; j < i+1; j++) {
            item.href = item.href + '/' + pathList[j]
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

</style>