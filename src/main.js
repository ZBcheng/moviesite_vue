import Vue from 'vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';


import Index from './components/Index'
import Login from './components/Login'

// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Antd)
// Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  mode: "history",
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
