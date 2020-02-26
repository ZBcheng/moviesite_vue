import Vue from 'vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';


import Index from './components/Index'

Vue.config.productionTip = false

Vue.use(Antd, VueRouter)
// Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
]

const router = new VueRouter({
  mode: "history",
  routes
})

new Vue({
  router,
  components: { Antd },
  render: h => h(App)
}).$mount('#app')
