import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [{
  path: '/',
  name: 'home',
  component: () => import('@/components/HelloWorld.vue')
}]
const router = createRouter({
  history,
  routes
})
export default router