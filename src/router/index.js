import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FileEditor from "@/components/File/FileEditor";

Vue.use(VueRouter)

const routes = [
  {
    path: '/file/:fileDetailId',
    name: 'file',
    component: FileEditor
  },
  {
    path: '/:path*',
    name: 'home',
    component: HomeView
  },


]

const router = new VueRouter({
  mode:'history',
  // mode:'hash',
  routes
})

export default router
